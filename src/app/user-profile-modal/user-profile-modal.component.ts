import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-user-profile-modal',
  templateUrl: './user-profile-modal.component.html',
  styleUrls: ['./user-profile-modal.component.scss']
})
export class UserProfileModalComponent implements OnInit {

  constructor(
    public thisDialog: MatDialogRef<UserProfileModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data:any, 
  ) { }

  ngOnInit() {
  }

}
