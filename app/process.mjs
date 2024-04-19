export default class Process{
    constructor(id, at, bt, name, prio = 0){
        this.id = id;       // Process Id
        this.at = at;       // Arrival Time
        this.bt = bt;       // Burst Time
        this.name = name;   // Process Name
        this.prio = prio;   // Priority
        this.rt = bt;       // Remaining time to complete process, initlly same as burst time
        this.ct = -1;       // Completion Time
        this.wt = -1;       // Waiting Time
        this.tat = -1;      // Turn Around Time
        this.calc = ()=>{
            this.tat = this.ct - this.at;
            this.wt = this.tat - this.bt;
        }
    }
}