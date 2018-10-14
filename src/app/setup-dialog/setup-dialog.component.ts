import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material'; 
import { MatDialogRef } from '@angular/material'; 

@Component({
  selector: 'app-setup-dialog',
  templateUrl: './setup-dialog.component.html',
  styleUrls: ['./setup-dialog.component.scss']
})
export class SetupDialogComponent implements OnInit {

  private step: number; 
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public dialogRef: MatDialogRef<SetupDialogComponent>
  ) { }

  ngOnInit() {
    this.step = this.data.step; 
  }

  updateStatus(status){
    if(status){
      this.step++; 
    }
  }

}
