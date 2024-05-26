'use client'
import React, { useEffect } from 'react'

const Chart = ({ processes, chart }) => {
    useEffect(() => {
        console.log(chart);
        if (processes.length === 0 || chart.length === 0) return;
        let grid = document.getElementsByClassName('chart')[0];
        grid.innerHTML = '';

        let corner_cell = document.createElement('div');
        corner_cell.textContent = 'Processes';

        grid.appendChild(corner_cell);

        for (let i = 0; i < chart.length; i++) {
            let header = document.createElement('div');
            header.textContent = chart[i][0] + '-' + chart[i][1];
            header.style.textAlign = 'center';
            grid.appendChild(header);
        }

        let check_cpu_idle = false;
        for (let i = 0; i < chart.length; i++) {
            if (chart[i][2] === 0) {
                check_cpu_idle = true;
                break;
            }
        }

        if (check_cpu_idle) {
            let cpu_idle = document.createElement('div');
            cpu_idle.textContent = 'CPU Idle';
            grid.appendChild(cpu_idle);

            for (let i = 0; i < chart.length; i++) {
                let cell = document.createElement('div');
                cell.textContent = ' ';
                if (chart[i][2] === 0) {
                    cell.textContent = chart[i][1] - chart[i][0] + 1;
                    cell.style.backgroundColor = 'grey';
                    cell.style.borderRadius = '5px';
                    cell.style.textAlign = 'center';
                }
                grid.appendChild(cell);
            }
        }

        for (let i = 1; i <= processes.length; i++) {
            let process = document.createElement('div');
            process.textContent = processes[i - 1].name;
            process.style.textAlign = 'right';
            process.style.paddingRight = '15px';
            grid.appendChild(process);
            for (let j = 0; j < chart.length; j++) {
                let cell = document.createElement('div');
                if (chart[j][2] === i) {
                    cell.textContent = chart[j][1] - chart[j][0] + 1;
                    cell.style.backgroundColor = 'grey';
                    cell.style.borderRadius = '5px';
                    cell.style.textAlign = 'center';
                }
                grid.appendChild(cell);
            }
        }

        let col_scaling = `1fr `;
        for (let i = 0; i < chart.length; i++) {
            if (chart[i][2] === 0)
                col_scaling += `1fr `;
            else
                col_scaling += `${chart[i][1] - chart[i][0] + 1}fr `;
        }

        grid.style.gridTemplateRows = `repeat(${processes.length + 1 + (check_cpu_idle ? 1 : 0)}, 1fr)`;
        console.log("Here", col_scaling);
        grid.style.gridTemplateColumns = col_scaling;


    }, [processes, chart]);

    return (
        <div className='chart grid mt-10'>

        </div>
    )
}

export default Chart
