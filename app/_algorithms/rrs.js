import Process from "../process.mjs";

export default function RRS(nm, at, bt, qt) {
    console.log(nm);
    console.log(at);
    console.log(bt);
    console.log(qt);
    let pro = [];
    let chart = [];
    let processes = [];
    let n = at.length;
    for (let i = 0; i < n; i++) {
        let process = new Process(i + 1, at[i], bt[i], nm[i]);
        pro.push(process);
    }

    pro.sort(function (pa, pb) {
        return pa.at - pb.at;
    });

    let q = [];
    let pt = 0;

    while (pt < n) {
        q.push(pro[pt]);
        let cur = pro[pt].at;
        pt++;
        while (q.length) {
            let top = q[0];
            q.splice(0, 1);
            let mn = Math.min(qt, top.rt);
            chart.push([cur, cur + mn - 1, top.id]);
            top.rt -= mn;
            cur += mn;
            while (pt < n && pro[pt].at <= cur) {
                q.push(pro[pt]);
                pt++;
            }
            if (top.rt == 0) {
                top.ct = cur;
                top.calc();
                processes.push(top);
            } else
                q.push(top);
        }
        if (pt < n)
            chart.push([cur, pro[pt].at - 1, 0]);
    }

    let final_chart = [];
    final_chart.push(chart[0]);
    for (let i = 1; i < chart.length; i++) {
        if (chart[i][1] < chart[i][0])
            continue;
        if (final_chart[final_chart.length - 1][2] == chart[i][2])
            final_chart[final_chart.length - 1][1] = chart[i][1];
        else
            final_chart.push(chart[i]);
    }

    chart = final_chart;

    processes.sort(function (pa, pb) {
        return pa.id - pb.id;
    });

    return [chart, processes];
}