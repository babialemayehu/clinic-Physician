import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Patient } from '../model/Patient'; 
import { PatientQueueService } from '../service/patient-queue.service'; 
import { Patient_queue } from '../model/Patient_queue'; 
import { RegisterationFormComponent } from '../registeration-form/registeration-form.component'; 
import { MatDialog, throwMatDuplicatedDrawerError } from '@angular/material'; 
import { PatientService } from '../service/patient.service'; 
import { AlertComponent } from '../alert/alert.component'; 
import { Router, ActivatedRoute} from '@angular/router'; 
import { User } from '../model/User';
import { Hisstory } from '../model/Hisstory'; 
import { UserService } from '../service/user.service';
import { DiagnosisComponent } from '../diagnosis/diagnosis.component';
import { HisstoryService } from '../service/hisstory.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private state: number = 0; 
  private patient: Patient; 
  private $queue: Patient_queue; 
  private isQueued: boolean; 
  private load: number = 0; 
  private $auth: User; 
  private loading: boolean = false; 
  private hisstory: Hisstory; 
  private queueChecker;

  private update = {
    state: 0, 
    queue: 0, 
    stateNext: 0
  }; 
  constructor(
    private _queue: PatientQueueService,
    private _patient: PatientService, 
    private _user: UserService, 
    private _router: Router, 
    private _activeRoute: ActivatedRoute,
    private _dialog: MatDialog, 
    private _hisstory: HisstoryService
  ) { }

  ngOnInit() {
    this._user.authUser().subscribe(
      (user) => {
        this.$auth = user; 
      }
    ); 

    this._activeRoute.params.subscribe(
      (param) =>{
        if(typeof param.hisstory_id !== 'undefined'){
          this._queue.getQueue(param.hisstory_id).subscribe(
            (responce)=> {
              this.loading = false; 
              this.open(responce); 
            }
          ); 
        }
      }
    )
  }

  next(){
    this.loading  = true; 
    this._queue.next().subscribe(
      (queue) => {
        this.loading = false;
        this._router.navigate(['/hisstory/'+queue.hisstory.id]); 
        //this.open(queue); 
      }, 
      (error) => {
        this.loading = false; 
        this.state = 5; 
        this.queueChecker = setInterval(()=>{
          this._queue.isEmpty().subscribe(
            (isEmpty) => {
              this.state = (isEmpty == true)?5:6; 
            }
          )
        }, 10000); 
      }
    )
    this.update.state++;
    this.update.queue++;  
  }

  open(queue: Patient_queue){
    if(this.queueChecker != undefined) 
      clearInterval(this.queueChecker); 
    if(queue){
      this.patient = queue.patient; 
      this.$queue = queue; 
      this.hisstory = queue.hisstory; 
      this.state = 1; 
    }else{
      this.state = 7; 
    }
    
  }

  call(){
    this._queue.call(this.$queue.id).subscribe(
      (Response) => {}
    )
  }
  $state(num: number){ 
    console.log(num); 
    switch(num){
      case 1: 
        this.next(); 
      break; 
      case 2:
        this._router.navigate(['/lab/request/'+this.$queue.id]); 
      break; 
      case 3: 
        this._router.navigate(['/prescription/prescribe/'+this.$queue.id]); 
      break; 
      case 4: 
        this.call(); 
      break; 
      default: 
      this.state = num; 
    }
   }

  finish(){
    let dialogRef = this._dialog.open(DiagnosisComponent, {
      width: "600px",
      disableClose: true, 
      data: {
        queue: this.$queue
      }
    }); 

    dialogRef.afterClosed().subscribe(
      (response) => {
        switch(response){
          case 'next': 
            this.next(); 
            break; 
          case 'finish': 
            this._hisstory.close(this.$queue.id).subscribe(
              response => {
                this.update.stateNext++;
              }
            )
            break; 
        } 
      }
    )
  }
  $back(){ this.state = 1; }

  onSearch(patient) {
    this.patient = patient; 
    this._queue.isQueued(patient.id).subscribe(
      (responce) => { 
          this.isQueued =(responce > 0);
          this.load++; 
      }
    )
  }

  queue(){
    this._queue.queue(this.patient.id).subscribe(
      (patient) => {
        this.isQueued = true; 
        this.load++; 
      }
    )
  }

  dequeue(){
    this._queue.remove(this.patient.id).subscribe(
      (responce) => {
        this.isQueued = false; 
        this.load++; 
      }
    ); 
  }

  edit(){
  
    let patinetDialog = this._dialog.open(RegisterationFormComponent, {
      width: "600px", 
      data:{
        patient: this.patient
      } 
    }); 

    patinetDialog.afterClosed().subscribe(
      (responce) => {
        this.patient = responce.data;  
      }
    ); 
  }

  delete(){
    let message = "Are you sure u want to delete <b> " + this.patient.first_name + "</b>"; 
    let alert = this._dialog.open(AlertComponent, {
      width: '400px', 
      data: {
        title: "Confirm",
        color: "yellow",
        message:  message, 
        dialog: 'confirm',
      }
    })
    alert.afterClosed().subscribe(
      (responce) => {
        if(responce.responce){
          this._patient.delete(this.patient.id).subscribe(); 
        }
      }
    )
    
  }
}
