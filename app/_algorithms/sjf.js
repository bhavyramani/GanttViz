import Process from "../process.mjs";
import { PriorityQueue } from "@datastructures-js/priority-queue";

export default function SJF(nm, at, bt) {
    let pro = [];
    let chart = [];
    let processes = [];
    let n = at.length;
    for (let i = 0; i < n; i++) {
        let process = new Process(i + 1, at[i], bt[i], nm[i]);
        pro.push(process);
    }

    pro.sort(function (pa, pb) {
        if (pa.at == pb.at)
            return pa.bt - pb.bt;
        return pa.at - pb.at;
    });

    let pt = 0;
    const pq = new PriorityQueue((pa, pb) => {
        if (pa.rt == pb.rt)
            return pa.id - pb.id;
        return pa.rt - pb.rt;
    });

    while (pt < n) {
        pq.push(pro[pt]);
        let curr = pro[pt].at;
        pt++;
        while (pq.size()) {
            let top = pq.front();
            pq.pop();
            top.ct = curr + top.bt;
            chart.push([curr, top.ct - 1, top.id]);
            curr = top.ct;
            top.calc();
            while (pt < n && pro[pt].at <= top.ct) {
                pq.push(pro[pt]);
                pt++;
            }
            processes.push(top);
        }
        if (pt < n)
            chart.push([curr, pro[pt].at - 1, 0]);
    }

    processes.sort(function (pa, pb) {
        return pa.id - pb.id;
    });

    return [chart, processes];
}