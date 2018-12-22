import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../model/User'; 
import { Laboratory } from '../model/Laboratory';
import { Laboratory_test } from '../model/Laboratory_test';
import { RootURL } from '../model/RootURL';

@Injectable({
  providedIn: 'root'
})
export class LaboratoryService {

  constructor(private _http: HttpClient) { }
  private root = RootURL;  

  $new(hisstory_id: number, request: Laboratory[]){
    const URL = this.root+"/ajax/post/lab/request"; 
    return this._http.post(URL , request); 
  }

  autoComplet(key: string): Observable<Laboratory_test[]>{
    const URL = this.root+"/ajax/get/lab/search/auto/"+key; 
    return this._http.get<Laboratory_test[]>(URL); 
  }

  search(key: string): Observable<Laboratory>{
    const URL = this.root+"/ajax/get/lab/search/"+key; 
    return this._http.get<Laboratory>(URL); 
  }

  request(test: Laboratory_test[], id: number){
    const URL = this.root+"/ajax/post/lab/request";
    return this._http.post(URL, {requests: test,hisstory_id: id} );  
  }

  getRequests(queue_id: number): Observable<Laboratory[]>{
    const URL  = this.root+"/ajax/get/lab/requests/"+queue_id; 
    return this._http.get<Laboratory[]>(URL); 
  }
}
