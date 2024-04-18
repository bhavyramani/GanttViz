import { NextResponse } from "next/server";
import fcfs from "@/app/algorithms/fcfs";
export async function POST(request){
    try{
        let req = await request.json();
        let algo = req['algo'];
        let chart = [], processes = [];
        switch (algo) {
            case 'fcfs':
                [chart, processes] = fcfs(req['nm'], req['at'], req['bt']);
                break;
            default:
                break;
        }        
        return NextResponse.json({chart:chart, processes:processes});
    }catch(error){
        return NextResponse.json({message : error.message || error})
    }
};