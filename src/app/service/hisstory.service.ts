import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../model/User'; 
import { Hisstory } from '../model/Hisstory';
import { Diagnosis } from '../model/Diagnosis';

@Injectable({
  providedIn: 'root'
})
export class HisstoryService {

  constructor(public _http: HttpClient) { }

  public $root: string = "http://clinic/"; 

  chif_complient(hisstory_id: number, complient: string){
    const URL = this.$root+"ajax/update/hisstory/chief_complient/"+hisstory_id; 
    return this._http.put(URL, {chief_complient: complient}); 
  }

  metrix(hisstory_id: number, matrix: Hisstory){
    const URL = this.$root+"ajax/update/hisstory/metrics/"+hisstory_id; 
    return this._http.put(URL, matrix); 
  }

  getDiagnosises(key: string): Observable<Diagnosis[]>{
    const URL = this.$root+"ajax/get/diagnosises/search/auto/"+key; 
    return this._http.get<Diagnosis[]>(URL); 
  }

  diagnosises(hisstory_id: number, diagnosises: Diagnosis[]): Observable<Diagnosis[]>{
    const URL = this.$root + "ajax/post/diagnosises/new/"+hisstory_id; 
    return this._http.post<Diagnosis[]>(URL, {diagnosises: diagnosises}); 
  }

  viewHisstroy(queue_id: number): Observable<Hisstory>{
    const URL  = this.$root + "ajax/get/hisstory/view/"+queue_id; 
    return this._http.get<Hisstory>(URL); 
  }
}
