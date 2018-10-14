import { Department } from "./Department";

export interface Patient{
    id: number, 
    reg_id: string, 
    first_name: string, 
    father_name: string, 
    grand_father_name: string, 
    phone: string, 
    gender: string, 
    birth_date: string, 
    dorm_block: number, 
    dorm_room_number: number, 
    accadamic_year: number, 
    departement_id: number, 
    departement: Department, 
    college_id: number, 
    clurk_id: number, 
    registerd_at: string
}