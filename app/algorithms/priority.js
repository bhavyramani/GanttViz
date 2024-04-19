import Process from "../process.mjs";
import { PriorityQueue } from "@datastructures-js/priority-queue";

export default function Priority(nm, at, bt, ps) {
    let pro = [];
    let chart = [];
    let processes = [];
    let n = at.length;
    for (let i = 0; i < n; i++) {
        let process = new Process(i + 1, at[i], bt[i], nm[i], ps[i]);
        pro.push(process);
    }

    pro.sort(function (pa, pb) {
        if (pa.at == pb.at)
            return pa.prio - pb.prio;
        return pa.at - pb.at;
    });

    const pq = new PriorityQueue((pa, pb) => {
        if (pa.prio == pb.prio)
            return pa.at - pb.at;
        return pa.prio - pb.prio;
    });

    let pt = 0;

    while (pt < n) {
        let cur = pro[pt].at;
        pq.push(pro[pt]);
        pt++;

        while (pq.size()) {
            let top = pq.front();
            pq.pop();

            if (pt < n && cur < pro[pt].at && pro[pt].at < cur + top.rt) {
                chart.push([cur, pro[pt].at - 1, top.id]);
                top.rt -= pro[pt].at - cur;
                cur = pro[pt].at;
                pq.push(pro[pt]);
                pt++;
                if (top.rt == 0) {
                    top.ct = cur;
                    top.calc();
                    processes.push(top);
                } else {
                    pq.push(top);
                }
            } else {
                chart.push([cur, cur + top.rt - 1, top.id]);
                cur += top.rt;
                top.rt = 0;
                top.ct = cur;
                top.calc();
                processes.push(top);
            }
        }
        if(pt < n)
            chart.push([cur, pro[pt].at-1, 0]);
    }

    let final_chart = [];
    final_chart.push(chart[0]);
    for(let i = 1; i < chart.length; i++){
        if(final_chart[final_chart.length-1][2] == chart[i][2])
            final_chart[final_chart.length-1][1] = chart[i][1];
        else
            final_chart.push(chart[i]);
    }

    chart = final_chart;

    processes.sort(function(pa, pb){
        return pa.id - pb.id;
    });

    return [chart, processes];
}

const names = [1,2,3,4,5];
const at = [0,1,2,3,5];
const bt = [3,4,6,4,2];
const ps = [3,2,4,6,10];
const [chart, processes] = Priority(names, at, bt, ps);
console.log(chart);
console.log(processes);