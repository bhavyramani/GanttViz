import React, { useEffect, useState } from 'react'

const Table = ({ processes, algorithm }) => {
  
  let ct = 0;
  let tat = 0;
  let n = processes.length;

  for(let i = 0; i < n; i++){
    ct += processes[i].ct;
    tat += processes[i].tat;
  }

  if(n > 0){
    ct /= n;
    tat /= n;
  }

  
  return (
    <div className='mt-10 output'>
      {
        processes.length ?
          <div className='w-full flex flex-col items-center'>
            <h1 style={{ "fontSize": "30px" }}>Output Table</h1>
            <table className="w-full flex flex-col items-center m-2">
              <thead>
                <tr className="flex justify-evenly text-white bg-blue-500">
                  <th>Id</th>
                  <th>Name</th>
                  <th>AT</th>
                  <th>BT</th>
                  <th>CT</th>
                  <th>TAT</th>
                  <th>WT</th>
                  {
                    algorithm == "ps" ?
                      <th>Priority</th> : ""
                  }
                </tr>
              </thead>
              <tbody>
                {
                  processes.map((process, index) => {
                    return (
                      <tr className="flex justify-evenly" key={`table-row-no-${index + 1}`}>
                        <td>
                          P{process.id}
                        </td>
                        <td>
                          {process.name}
                        </td>
                        <td>
                          {process.at}
                        </td>
                        <td>
                          {process.bt}
                        </td>
                        <td>
                          {process.ct}
                        </td>
                        <td>
                          {process.tat}
                        </td>
                        <td>
                          {process.wt}
                        </td>
                        {
                          algorithm == 'ps' ?
                            <td>
                              {process.prio}
                            </td>
                            : ""
                        }
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
            <div className='avg-time w-full flex justify-evenly mt-5'>
              <div className='avg-ct'>
                Avg. Completion Time: {ct}
              </div>
              <div className='avg-tat'>
                Avg. Turn Aroung Time: {tat}
              </div>
            </div>
          </div>
          : ""
      }
    </div>
  )
}

export default Table
