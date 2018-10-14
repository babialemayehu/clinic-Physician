import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../model/User'; 
import { Pagination } from '../model/Pagination'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  public root = "http://clinic"; 
  constructor(public http:HttpClient) { }

  postCreateUser(data): Observable<User>{
    let $url = this.root+"/ajax/post/create user"; 
    return this.http.post<User>($url,data); 
  }
  
  updateUser(data): Observable<User>{
    let $url = this.root+"/ajax/update/user"; 
    return this.http.put<User>($url, data); 
  }
  
  authUser(): Observable<User>{
    let $url = this.root+"/ajax/get/auth user"
    return this.http.get<User>($url); 
  }

  getUsers(pagination = 25, from = 1): Observable<User[]>{
    let $url = this.root+"/ajax/get/users"; 
    return this.http.get<User[]>($url); 
  }

  totalUsers(): Observable<number>{
    let $url = this.root+ "/ajax/get/total users"; 
    return this.http.get<number>($url); 
  }

  userProfile(workerId): Observable<User>{
    let $url = this.root+"/ajax/get/user profile/"+workerId; 
    return this.http.get<User>($url);
  }
  
  deleteUser(id): Observable<number>{
    let $url = this.root+"/ajax/delete/user/"+id; 
    return this.http.delete<number>($url); 
  }

  currentPassword(password): Observable<boolean>{
    let $url = this.root+"/ajax/post/isCurrentPassword";
    return this.http.post<boolean>($url, {currentPassword: password});
  }
  
  changePassword(current: string, newPassword: string): Observable<boolean> {
    let $url = this.root+"/ajax/update/password"; 
    return this.http.put<boolean>($url , {currentPassword:current, newPassword: newPassword}); 
  }

  roomNumber(number: number): Observable<User>{
    let $url = this.root+"/ajax/update/room number/"+number; 
    return this.http.put<User>($url, {});
  }
}
