import { Laboratory_test } from "./Laboratory_test";

export interface Laboratory{
    id: number,
    laboratory_test_id: number, 
    laboratory_test: Laboratory_test, 
    normality: boolean, 
    note: string,
    value: number, 
    hisstory_id: number, 
}