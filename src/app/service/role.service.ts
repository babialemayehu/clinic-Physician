import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  public root = 'http://clinic'; 
  constructor(public http:HttpClient) { }
  getRoles(){
    let $url = this.root+"/ajax/get/roles except admin"; 
    return this.http.get($url); 
  }
}
