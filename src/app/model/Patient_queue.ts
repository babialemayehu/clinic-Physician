import { Patient } from "./Patient"; 
import { User } from "./User";

export interface Patient_queue{
    id:number, 
    clurk_id: number, 
    physician_id: number, 
    physician: User, 
    patient_id: number,
    patient: Patient,  
    is_served: boolean, 
    queue_number: number, 
    humanWaitingTime: string,
    date: string,
}