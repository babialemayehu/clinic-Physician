import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../service/user.service"; 
import { User } from "../model/User";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public param; 

  @Input() user: User; 

  constructor(
    private route: ActivatedRoute, 
    private _user: UserService) { 

  }

  ngOnInit() {
    
  }

}
