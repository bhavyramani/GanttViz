import React from 'react'

const Header = ({ handleAlgoChange, handleNumInputChange, numberOfActivities }) => {
    return (
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
    )
}

export default Header
