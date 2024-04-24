import { NextResponse } from "next/server";
import fcfs from "@/app/_algorithms/fcfs";
import sjf from "@/app/_algorithms/sjf";
import priority from "@/app/_algorithms/priority";
import srtf from "@/app/_algorithms/srtf";
import lrtf from "@/app/_algorithms/lrtf";
import rrs from "@/app/_algorithms/rrs";
export async function POST(request){
    try{
        let req = await request.json();
        
        let algo = req['algo'];
        let chart = [], processes = [];
        let nm = req['nm'], at = req['at'], bt = req['bt'];
        
        switch (algo) {
            case 'fcfs':
                [chart, processes] = fcfs(nm, at, bt);
                break;
            case 'sjf':
                [chart, processes] = sjf(nm, at, bt);
                break;
            case 'srtf':
                [chart, processes] = srtf(nm, at, bt);
                break;
            case 'lrtf':
                [chart, processes] = lrtf(nm, at, bt);
                break;
            case 'rrs':
                [chart, processes] = rrs(nm, at, bt, req['qt']);
                break;
            case 'ps':
                [chart, processes] = priority(nm, at, bt, req['ps']);
                break;
            default:
                break;
        }        
        return NextResponse.json({chart:chart, processes:processes});
    }catch(error){
        return NextResponse.json({message : error.message || error})
    }
};