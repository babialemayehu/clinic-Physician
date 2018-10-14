import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserService } from '../service/user.service'; 
import { User } from '../model/User'; 

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  providers: [UserService]
})
export class SidenavComponent implements OnInit {
  
  @ViewChild('profileImageContainer') profileImageContainer; 
  @Input() $auth: User; 
  @Input() profilePic: string; 

  constructor(public _user: UserService) {
     
  }

  ngOnInit() {
   
  }
}
