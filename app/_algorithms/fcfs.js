import Process from "../process.mjs";
export default function FCFS(nm, at, bt) {
    let pro = [];
    let chart = [];
    let n = at.length;
    for (let i = 0; i < n; i++) {
        let process = new Process(i + 1, at[i], bt[i], nm[i]);
        pro.push(process);
    }

    pro.sort(function (pa, pb) {
        return pa.at - pb.at;
    });

    pro[0].ct = pro[0].at + pro[0].bt;
    pro[0].calc();

    chart.push([pro[0].at, pro[0].ct - 1, pro[0].id]);

    for (let i = 1; i < n; i++) {
        if (pro[i].at > pro[i - 1].ct) {
            chart.push([pro[i - 1].ct, pro[i].at - 1, 0]);
            pro[i].ct = pro[i].at + pro[i].bt;
            chart.push([pro[i].at, pro[i].ct - 1, pro[i].id]);
        } else {
            pro[i].ct = pro[i - 1].ct + pro[i].bt;
            chart.push([pro[i - 1].ct, pro[i].ct - 1, pro[i].id]);
        }
        pro[i].calc();
    }

    pro.sort(function (pa, pb) {
        return pa.id - pb.id;
    });


    return [chart, pro];
}