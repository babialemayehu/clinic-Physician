import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../model/User'; 
import { Hisstory } from '../model/Hisstory';

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
    console.log(matrix); 
    const URL = this.$root+"ajax/update/hisstory/metrics/"+hisstory_id; 
    return this._http.put(URL, matrix); 
  }
}
