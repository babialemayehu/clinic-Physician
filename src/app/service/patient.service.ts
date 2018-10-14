import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Patient } from '../model/Patient'; 
import { Department } from '../model/Department';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(public _http: HttpClient) { }

  private root = "http://clinic"; 

  create(patient:Patient): Observable<Patient>{
    const URL = this.root+"/ajax/post/patient/new"; 
    return this._http.post<Patient>(URL, patient); 
  }

  update(id: number, patient: Patient): Observable<Patient>{
    const URL = this.root+"/ajax/update/patient/"+id; 
    return this._http.put<Patient>(URL, patient); 
  }

  delete(id: number){
    const URL = this.root+"/ajax/delete/patient/"+id; 
    return this._http.delete(URL); 
  }

  autoComplete(key:string): Observable<Patient[]>{
    const URL = this.root+"/ajax/get/search/auto complete/"+key;
    return this._http.get<Patient[]>(URL); 
  }

  search(key:string): Observable<Patient>{
    const URL = this.root+"/ajax/get/search/"+key;
    return this._http.get<Patient>(URL); 
  }

  departments(): Observable<Department[]>{
    const URL = this.root+"/ajax/get/departments"; 
    return this._http.get<Department[]>(URL); 
  }
}
