import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-change-password-route',
  templateUrl: './change-password-route.component.html',
  styleUrls: ['./change-password-route.component.scss']
})
export class ChangePasswordRouteComponent implements OnInit {

  constructor(public _route: Router) { }

  ngOnInit() {
  }
  onStatusChange(status){
    if(status){
      this._route.navigate(['/settings']);
    } 
  }
}
