import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  constructor(
    public thisDialog: MatDialogRef<AlertComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  close(){
    this.thisDialog.close(
      {
      responce: false, 
      data: null
    }); 
  }
  confirm(){
    this.thisDialog.close(
      {
        responce: true, 
        data: this.data.data
      }
    ); 
  }
}
