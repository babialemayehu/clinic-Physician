import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators }  from '@angular/forms';
import { confirmValidator } from './validation'; 
import { UserService } from '../service/user.service'; 
import { CommonMessageService } from '../service/common-message.service'; 

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  hideCurrentP = false; 
  loading = false;
  @Output() stauts = new EventEmitter<boolean>()

  @Input() set setOnly(i){
    this.hideCurrentP = i; 
    if(i === true){
      this.changePasswordForm = this.formBuilder.group({
        new_password: ['', [Validators.min(6),Validators.required]], 
        confirm_password: ['',[confirmValidator, Validators.required]],
      });
    } 
  }
  constructor(
    public formBuilder: FormBuilder, 
    public _user: UserService, 
    public _message: CommonMessageService) { }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      current_password: ['', [Validators.min(6),Validators.required]], 
      new_password: ['', [Validators.min(6),Validators.required]], 
      confirm_password: ['',[confirmValidator, Validators.required]],
    });

    this.changePasswordForm.controls.new_password.valueChanges
    .subscribe(
      x => { this.changePasswordForm.controls.confirm_password.updateValueAndValidity(); }
    )
  } 
  checkPassword(){
    this._user.currentPassword(this.changePasswordForm.controls.current_password.value)
    .subscribe(
      responce => {}, 
      error => {
        if(error.status == 406)
          this.changePasswordForm.controls.current_password.setErrors({invalidPassword: true}); 
      },
    ); 
  }
  confirm(confirm: FormControl){
    
    const newPass = this.changePasswordForm.value.new_password; 
    if(newPass == confirm.value){
      return ({validConfirm_password: true});
    } else {
      return (null);
    }
  }
  onSubmit(){
    this.loading = true; 
    let form = this.changePasswordForm.controls; 
    this._user.changePassword(form.current_password.value, form.new_password.value)
    .subscribe(
      restponce=> {
        this.loading = false; 
        this._message.httpSuccess('Changed your password'); 
        this.stauts.emit(true); 
      },
      error => {
        this.loading = false; 
        this._message.httpError(error);
        if(error.status == 406){
          this.changePasswordForm.controls.current_password.setErrors({invalidPassword: true});
        } 
        this.stauts.emit(false); 
      }
    ); 
  }
  get current_password(){ return this.changePasswordForm.get('current_password')}
  get new_password(){ return this.changePasswordForm.get('new_password')}
  get confirm_password(){ return this.changePasswordForm.get('confirm_password')}
}
