'use client'
import Header from "./_components/Header";
import Input from "./_components/Input";
import Chart from "./_components/Chart";
import Table from "./_components/Table";
import { useState } from "react";

export default function Home() {
  const [numberOfActivities, setNumberOfActivities] = useState(0);
  const [activities, setActivities] = useState([]);
  const [algorithm, setAlgorithm] = useState('fcfs');
  const [outalgo, setoutalgo] = useState('fcfs');
  const [chart, setChart] = useState([]);
  const [processes, setProcesses] = useState([]);

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
  return (
    <div className="w-full pb-10">

      <h1 className="w-full flex justify-center bg-blue-600 text-white pt-2 pb-2" style={{ "fontSize": "30px" }}>
        GanttViz
      </h1>
      <Header
        handleAlgoChange={handleAlgoChange}
        handleNumInputChange={handleNumInputChange}
        numberOfActivities={numberOfActivities}
      />

      <Input
        activities={activities}
        algorithm={algorithm}
        numberOfActivities={numberOfActivities}
        setChart={setChart}
        setProcesses={setProcesses}
        setoutalgo={setoutalgo}
      />

      <Chart
        processes={processes}
        chart={chart}
      />

      <Table
        processes={processes}
        outalgo={outalgo}
      />

    </div>
  );
}
