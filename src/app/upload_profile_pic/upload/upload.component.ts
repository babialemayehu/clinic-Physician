import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { UserService } from '../../service/user.service'; 
import { Observable } from 'rxjs';
import { User } from '../../model/User';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  private pic: string =  "/storage/avatar.jpg"; 
  @Output() status = new EventEmitter(); 

  constructor(private _user: UserService) { }

  ngOnInit() {
    this._user.authUser().subscribe(
      result => {
        this.pic = result.profile_pic; 
      }
    );
  }

  selected(img){
    const obs = this._user.uploadPic(img.target.files[0]);
    this.status.emit('waiting');
    obs.subscribe(
      (user) => {
        this.pic = user.profile_pic; 
        this.status.emit(true);
      }
    )
  }
}
