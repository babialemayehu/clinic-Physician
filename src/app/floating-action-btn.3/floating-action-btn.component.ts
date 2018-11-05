import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material'; 
import { RegisterationFormComponent } from '../registeration-form/registeration-form.component'; 
import { RoleService } from '../service/role.service'; 

@Component({
  selector: 'app-floating-action-btn',
  templateUrl: './floating-action-btn.component.html',
  styleUrls: ['./floating-action-btn.component.scss'],
  providers: [RoleService],
})
export class FloatingActionBtnComponent implements OnInit {

  @Output() action = new EventEmitter(); 

  constructor(public registrationDialog: MatDialog,  public _roles: RoleService) { }
  public roles: object; 
  ngOnInit() {
    this._roles.getRoles().subscribe(
      result => {
        this.roles = result; 
      }
    )
  }
  openRagistrationFrom(){
    let dialog = this.registrationDialog.open(RegisterationFormComponent,{
      width: '600px', 
      data: {
        roles: this.roles,
      }, 
    });
    
    dialog.afterClosed().subscribe(
      responce => {
        console.log(responce); 
      }
    );
  }

}
