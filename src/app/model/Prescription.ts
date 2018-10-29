import { Hisstory } from "./Hisstory";
import { Drug } from "./Drug";
import { Drug_root } from "./Drug_root";
import { Drug_frequency } from "./Drug_frequency";

export interface Prescription{
    id:number, 
    drug_id: number, 
    drug: Drug, 
    hisstory_id: number, 
    hisstory: Hisstory, 
    root_id: number, 
    root: Drug_root, 
    frequency_id: number, 
    frequency: Drug_frequency, 
    dose: number,
    name: string, 
    created_at: string, 
    deleted_at: string, 
    updated_at: string
}