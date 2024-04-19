import Process from "../process.mjs";
import { PriorityQueue } from "@datastructures-js/priority-queue";

export default function LRTF(nm, at, bt) {
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
            return pb.bt - pa.bt;
        return pa.at - pb.at;
    });

    const pq = new PriorityQueue((pa, pb) => {
        if (pa.rt == pb.rt)
            return pa.id - pb.id;
        return pb.rt - pa.rt;
    });

    let pt = 0;

    while (pt < n) {
        let cur = pro[pt].at;
        pq.push(pro[pt]);
        pt++;

        while (pq.size()) {
            let top = pq.front();
            pq.pop();

            if (pt < n && pro[pt].at < cur + top.rt) {
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
                if (pq.size() == 0) {
                    chart.push([cur, cur + top.rt - 1, top.id]);
                    cur += top.rt;
                    top.rt = 0;
                    top.ct = cur;
                    top.calc();
                    processes.push(top);
                } else {
                    let t2 = pq.front();
                    let dif = top.rt - t2.rt + 1;
                    chart.push([cur, cur + dif - 1, top.id]);
                    cur += dif;
                    top.rt -= dif;
                    if (top.rt == 0) {
                        top.ct = cur;
                        top.calc();
                        processes.push(top);
                    } else {
                        pq.push(top);
                    }
                }
            }
        }
        if (pt < n)
            chart.push([cur, pro[pt].at - 1, 0]);
    }

    let final_chart = [];
    final_chart.push(chart[0]);
    for (let i = 1; i < chart.length; i++) {
        if (final_chart[final_chart.length - 1][2] == chart[i][2])
            final_chart[final_chart.length - 1][1] = chart[i][1];
        else
            final_chart.push(chart[i]);
    }
    console.log(chart);
    chart = final_chart;

    processes.sort(function (pa, pb) {
        return pa.id - pb.id;
    });

    return [chart, processes];
}
