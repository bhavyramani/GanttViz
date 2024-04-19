'use client'
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [numberOfActivities, setNumberOfActivities] = useState(0);
  const [activities, setActivities] = useState([]);
  const [algorithm, setAlgorithm] = useState('fcfs');
  const [chart, setChart] = useState([]);
  const [processes, setProcesses] = useState([]);
  const [creatingChart, setCreatingChart] = useState(false);

  const handleAlgoChange = (e) => {
    setAlgorithm(e.target.value);
  };

  const handleNumInputChange = (event) => {
    const num = parseInt(event.target.value);
    if (num >= 0) {
      setNumberOfActivities(num);
      if (num > activities.length) {
        setActivities([...activities, ...Array.from({ length: num - activities.length }, () => { })]);
      } else {
        setActivities([...activities].slice(0, num));
      }
    }
  };

  const validateInput = (e) => {
    const name = e.target.id.split('-')[0];
    if (e.target.value == '')
      e.target.value = 0;
    if ((name == 'bt' || name == 'quanta') && e.target.value <= 0)
      e.target.value = 1;
    else if (e.target.value < 0)
      e.target.value = 0;

    if (typeof e.target.value != 'number')
      e.target.value = parseInt(e.target.value);
  };

  const handleChartApi = async () => {
    setCreatingChart(true);
    let names = [];
    let arrival_times = [];
    let burst_times = [];
    let priorities = [];

    for (let i = 1; i <= numberOfActivities; i++) {
      let name = document.getElementById(`activity_name-${i}`).value;
      names.push(name);

      let at = parseInt(document.getElementById(`at-${i}`).value);
      arrival_times.push(at);

      let bt = parseInt(document.getElementById(`bt-${i}`).value);
      burst_times.push(bt);

      if (algorithm == "ps") {
        let ps = parseInt(document.getElementById(`bt-${i}`).value);
        priorities.push(ps);
      }
    }

    let req = {
      algo: algorithm,
      nm: names,
      at: arrival_times,
      bt: burst_times
    };

    if (algorithm == "ps")
      req['ps'] = priorities;
    else if (algorithm == "rrs") {
      let quanta = parseInt(document.getElementById('quanta'));
      req['qt'] = quanta;
    }


    let response = await fetch('http://localhost:3000/api/createchart', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req)
    });

    try{
      let json = await response.json();
      console.log(json);
    }catch(error){
      alert("Something went Wrong! Try Again");
      return;
    }finally{
      setCreatingChart(false);
    }

  };
  return (
    <div className="w-full">

      <h1 className="w-full flex justify-center bg-blue-600 text-white pt-2 pb-2" style={{ "fontSize": "30px" }}>
        GanttViz
      </h1>

      <div className="header h-20 w-full flex items-center px-20 bg-blue-300">

        <div className="left flex gap-2 justify-center items-center">
          <label htmlFor="algorithms">Algorithm: </label>
          <select name="algorithms" className="border-black border-2 rounded-md" onChange={handleAlgoChange}>
            <option value="fcfs">First Come First Serve (FCFS)</option>
            <option value="sjf">Shortest Job First (SJF)</option>
            <option value="srtf">Shortest Remaining Time First  (SRTF)</option>
            <option value="lrtf">Longest Remaining Time First  (LRTF)</option>
            <option value="rrs">Round Robin Scheduling (RRS)</option>
            <option value="ps">Priority Scheduling</option>
          </select>
        </div>

        <div className="right flex justify-center items-center">
          <label htmlFor="activitycount">
            Number of Processes:
          </label>
          <input type="number" name="activitycount" className="ml-2 w-10 text-center border-black border-2 rounded-md" value={numberOfActivities} onChange={handleNumInputChange} />
        </div>

      </div>

      {
        activities.length ?
          <table className="wt-full flex flex-col items-center m-2">
            {
              algorithm == "ps" ?
                <caption>Small number has higher Priority (Max priority 0)</caption> :
                <caption >&nbsp;</caption>
            }
            <thead>
              <tr className="flex justify-evenly text-white bg-blue-500">
                <th>Id</th>
                <th>Name (Optional)</th>
                <th>Arrival Time</th>
                <th>Burst Time</th>
                {
                  algorithm == "ps" ?
                    <th>Priority</th> : ""
                }
              </tr>
            </thead>
            <tbody>

              {
                activities.map((activity, index) => {
                  return (
                    <tr className="flex justify-evenly" key={`row-no-${index + 1}`}>
                      <td>
                        P{index + 1}
                      </td>
                      <td>
                        <input id={`activity_name-${index + 1}`} type="text" />
                      </td>
                      <td>
                        <input defaultValue={0} onChange={validateInput} id={`at-${index + 1}`} type="number" />
                      </td>
                      <td>
                        <input defaultValue={1} onChange={validateInput} id={`bt-${index + 1}`} type="number" />
                      </td>
                      {
                        algorithm == "ps" ?
                          <td>
                            <input defaultValue={0} onChange={validateInput} id={`ps-${index + 1}`} type="number" />
                          </td> : ""
                      }
                    </tr>
                  )
                })
              }
            </tbody>

          </table>
          : ""
      }
      <div className="submit w-full flex flex-col items-center gap-3 mt-3">
        {
          (algorithm == "rrs" && activities.length) ?
            <div>
              <label htmlFor="quanta">Time Quanta: </label>
              <input defaultValue={1} onChange={validateInput} type="number" name="quanta" id="quanta" className="border-black rounded-md text-center border-2 w-14" />
            </div>
            : ""
        }
        {
          activities.length ?
            <div className="">
              <button className=" bg-black text-white py-1 px-3 text-center rounded-md" onClick={() => {
                handleChartApi();
              }}>
                {
                  creatingChart ?
                    "Creating..." :
                    "Create Gantt Chart"
                }
              </button>
            </div> : ""
        }
      </div>
    </div>
  );
}
