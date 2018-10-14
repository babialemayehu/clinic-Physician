import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../service/user.service"; 
import { User } from "../model/User";

@Component({
  selector: 'app-user-profile-route',
  templateUrl: './user-profile-route.component.html',
  styleUrls: ['./user-profile-route.component.scss']
})
export class UserProfileRouteComponent implements OnInit {
  public user: User; 
  public param;
  
  constructor(
    private route: ActivatedRoute, 
    private _user: UserService) { 
      this.route.params.subscribe( param => {
        this._user.userProfile(param.worker_id).subscribe(
          (responce: User) => {
            this.user = responce;
          }
        ) 
      })
    }

  ngOnInit() {
  }

}
