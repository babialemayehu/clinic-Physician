import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'; 
import { FormGroup, FormBuilder , Validators} from '@angular/forms';
import { Router } from '@angular/router'; 

import { RoleService } from '../service/role.service'; 
import { PatientService } from '../service/patient.service'; 
import { CommonMessageService as Message }  from '../service/common-message.service'; 

import { User } from '../model/User'; 
import { Department } from '../model/Department'; 

declare var M; 
declare var S; 

@Component({
  selector: 'app-registeration-form',
  templateUrl: './registeration-form.component.html',
  styleUrls: ['./registeration-form.component.scss'],
  providers: [RoleService,PatientService], 
})
export class RegisterationFormComponent implements OnInit {

  public loading = false; 
  public regForm: FormGroup; 
  public roles: object; 
  public regOprationMode = 'new'; 
  private departments: Department[] = []; 
  private autoDepartments: Department[] = []; 
  @Input()
  set value(user: User) {
    this.regForm.setValue(user); 
  }

  constructor(
    public thisDialog: MatDialogRef<RegisterationFormComponent>, 
    @Inject(MAT_DIALOG_DATA) public data:any, 
    public formBuilder: FormBuilder, 
    public _route: Router, 
    public _patient: PatientService, 
    public _message: Message
  ) { }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      id:[''],
      reg_id: ['', [Validators.required]], 
      department: ['', [Validators.required]], 
      accadamic_year: ['', [Validators.required]], 
      first_name: ['', [Validators.required]], 
      father_name: ['', [ Validators.required]], 
      grand_father_name: ['', [Validators.required]], 
      gender: ['', [Validators.required]],
      dorm_block: ['', [Validators.required]], 
      dorm_room_number: ['', [Validators.required]], 
      birth_date: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    }); 
    if(typeof this.data.patient !== 'undefined'){
      this.regForm.patchValue(this.data.patient);
      this.regForm.controls.department.patchValue(this.data.patient.department.name); 
      this.regOprationMode = 'update'; 
    } 

    this._patient.departments().subscribe(
      responce => {
        this.departments = responce;
        this.autoDepartments = responce;  
      }
    )

    this.regForm.controls.department.valueChanges.subscribe(
      (value) => {
        this.filter(value); 
      }
    )
    // this.regForm.valueChanges.subscribe(
    //   (value) => { console.log(value); }
    // ); 
  }

  filter(input: string){
    console.log(input); 
    if(input == ""){
      this.autoDepartments = this.departments; 
      return; 
    }
    let start = this.departments.filter((val)=>{ 
      return S(val.name.toLocaleLowerCase()).startsWith(input.toLocaleLowerCase()); 
    }); 
    const notStart = this.departments.filter((val)=>{ 
      return !S(val.name.toLocaleLowerCase()).startsWith(input.toLocaleLowerCase()); 
    }); 
    let contain = notStart.filter((val) => {
      return S(val.name.toLocaleLowerCase()).include(input.toLocaleLowerCase()); 
    }) 
    this.autoDepartments = start.concat(contain); 
  }

  validateDepartemet(){
    const inputValue = this.regForm.controls.department.value;
    const count = this.departments.filter((val)=>{
        return val.name.toLowerCase() == inputValue.toLocaleLowerCase(); 
    }).length; 
    if(length < 1 && inputValue != ""){
      this.regForm.controls.department.setErrors({'invalidDep': true}); 
    } 
    
  }
  onSubmit(){
    this.loading = true; 
    if(this.regOprationMode != 'update'){
      this._new(); 
    }else{
      this.update(); 
    } 
     
  }
  _new(){
    this._patient.create(this.regForm.value).subscribe(
      responce => {
        // this._route.navigate(['/'+responce.reg_id]);
        this.thisDialog.close({responce:true,opration:'create', data: responce});
        this._message.httpSuccess('created account for <b> '+responce.first_name);
      }, 
      error => {
        this.loading = false;
        this._message.httpError({responce:false, operation:'create',data: error}); 
      }
    ) 
  }
  update(){
    this._patient.update(this.regForm.value.id, this.regForm.value).subscribe(
      responce => {
        this.thisDialog.close({responce:true,opration:'update', data: responce});
        this._message.httpSuccess('Edited profile of <b> '+responce.first_name);
      }, 
      error => {
        this.loading = false;
        this._message.httpError({responce:false, operation:'update',data: error}); 
      }
    )  
  }
  get reg_id(){return this.regForm.get("reg_id"); }
  get department(){return this.regForm.get("department"); }
  get accadamic_year(){return this.regForm.get("accadamic_year"); }
  get first_name(){return this.regForm.get("first_name"); }
  get father_name(){return this.regForm.get("father_name"); }
  get grand_father_name(){return this.regForm.get("grand_father_name"); }
  get gender(){return this.regForm.get("gender"); }
  get dorm_room_number(){return this.regForm.get("dorm_room_number"); }
  get dorm_block(){return this.regForm.get("dorm_block"); }
  get birth_date(){return this.regForm.get("birth_date"); }
  get phone(){return this.regForm.get("phone"); }
}
