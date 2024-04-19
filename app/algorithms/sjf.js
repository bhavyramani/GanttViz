import Process from "../process.mjs";

export default function SJF(nm, at, bt){
    let pro = [];
    let chart = [];
    let processes = [];
    let n = at.length;
    for(let i = 0; i < n; i++){
        let process = new Process(i+1, at[i], bt[i], nm[i]);
        pro.push(process);
    }

    pro.sort(function(pa, pb){
        if(pa.at == pb.at)
            return pa.bt - pb.bt;
        return pa.at - pb.at;
    });

    let pt = 0;
    
    while(pt < n){
        let queue = [];
        queue.push(pro[pt]);
        
        let curr = pro[pt].at;
        pt++;
        while(queue.length){
            let top = queue[0];
            top.ct = curr + top.bt;
            chart.push([curr, top.ct-1, top.id]);
            curr = top.ct;
            top.calc();
            while(pt < n && pro[pt].at <= top.ct){
                queue.push(pro[pt]);
                pt++;
            }
            processes.push(top);
            queue.splice(0, 1);
            queue.sort(function(pa, pb){
                return pa.bt - pb.bt;
            });
        }
        if(pt < n)
            chart.push([curr, pro[pt].at-1, 0]);
    }  

    processes.sort(function(pa, pb){
        return pa.id - pb.id;
    });

    return [chart, processes];
}