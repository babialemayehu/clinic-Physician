import { Diagnosis } from "./Diagnosis";
import { Prescription } from "./Prescription";
import { Patient_queue } from "./Patient_queue";
import { Laboratory } from "./Laboratory";

export interface Hisstory{
    id: number,
    patient_queue_id: number,
    chief_complaint: string,
    temprature: number,
    BP: number,
    puls_rate: number,
    repiratory_rate: number, 
    disagnosis: Diagnosis[], 
    prescriptions: Prescription[], 
    queue: Patient_queue, 
    labResults: Laboratory[]
}