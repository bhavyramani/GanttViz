import Process from "./process";
export default function FCFS(nm, at, bt){
    let pro = [];
    let n = at.length;
    for(let i = 0; i < n; i++){
        let process = new Process(i+1, at[i], bt[i], nm[i]);
        pro.push(process);
    }

    pro.sort(function(a, b){
        return a.at - b.at;
    });

    pro[0].ct = pro[0].bt;
    pro[0].calc();

    for(let i = 1; i < n; i++){
        pro[i].ct = pro[i-1].ct + pro[i].bt;
        pro[i].calc();
    }

    pro.sort(function(a, b){
        return a.pid - b.pid;
    });


    return [[], pro];
}