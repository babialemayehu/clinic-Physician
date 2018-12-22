import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RootURL } from '../model/RootURL';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private root = RootURL;  
  constructor(public http:HttpClient) { }
  getRoles(){
    let $url = this.root+"/ajax/get/roles except admin"; 
    return this.http.get($url); 
  }
}
