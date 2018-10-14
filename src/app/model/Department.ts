import { College } from './College'; 

export interface Department{
    id: number, 
    name: string, 
    college_id: string, 
    college: College
}