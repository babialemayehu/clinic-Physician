import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service'; 

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  private pic: string =  "http://clinic/storage/avatar.jpg"; 
  constructor(private _user: UserService) { }

  ngOnInit() {
    this._user.authUser().subscribe(
      result => {
        this.pic = result.profile_pic; 
      }
    ); 
    
  }

}
