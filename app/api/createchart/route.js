import { NextResponse } from "next/server";
import fcfs from "@/app/algorithms/fcfs";
import sjf from "@/app/algorithms/sjf";
import priority from "@/app/algorithms/priority";
import srtf from "@/app/algorithms/srtf";
import lrtf from "@/app/algorithms/lrtf";
export async function POST(request){
    try{
        let req = await request.json();
        let algo = req['algo'];
        let chart = [], processes = [];
        switch (algo) {
            case 'fcfs':
                [chart, processes] = fcfs(req['nm'], req['at'], req['bt']);
                break;
            case 'sjf':
                [chart, processes] = sjf(req['nm'], req['at'], req['bt']);
                break;
            case 'srtf':
                [chart, processes] = srtf(req['nm'], req['at'], req['bt']);
                break;
            case 'lrtf':
                [chart, processes] = lrtf(req['nm'], req['at'], req['bt']);
                break;
            case 'ps':
                [chart, processes] = priority(req['nm'], req['at'], req['bt'], req['ps']);
                break;
            default:
                break;
        }        
        return NextResponse.json({chart:chart, processes:processes});
    }catch(error){
        return NextResponse.json({message : error.message || error})
    }
};