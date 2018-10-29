import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PatientQueueService } from '../service/patient-queue.service';
import { Patient_queue } from '../model/Patient_queue';

enum Operation{
    NEXT, THIS, PREVIOUS, CHOOSE_SIDE
}
@Component({
  selector: 'app-saved-states',
  templateUrl: './saved-states.component.html',
  styleUrls: ['./saved-states.component.scss']
})

export class SavedStatesComponent implements OnInit {

  private active: number; 


  @Output() open: EventEmitter<Patient_queue> = new EventEmitter<Patient_queue>(); 
  @Input() activeQueueId: number;
  @Input() update: number; 
  @Input() 
  set next(value: number){
    if(value > 0)
      this.getSaved(Operation.CHOOSE_SIDE); 
  }
  
  
  private savedQueues: Patient_queue[] = []; 
  constructor(private _queue: PatientQueueService) { }

  ngOnChanges(){
    if(typeof this.activeQueueId === 'undefined'){
      this.active = -1; 
    }else{
      this.active = this.activeQueueId; 
    }
    this.getSaved();
  }
  ngOnInit() {
    this.getSaved(); 
    setInterval(()=>{
        this.getSaved(); 
      }, 10000);
  }
  
  $next(){
   
    let $found = this.savedQueues.find((e)=>{return (e.id == this.active); }); 
    let index = this.savedQueues.indexOf($found); 
    let _next: Patient_queue; 
   
    if(this.savedQueues.length >= 1){
      
       if(index < this.savedQueues.length){
        index++; 
        _next = this.savedQueues[index]; 
      }else if(index >= 0){
        index--; 
        _next = this.savedQueues[index]; 
      }else{
        _next = null; 
      }
    }else{  _next = null; }
   
    this.$open(_next);

  }
  getSaved( operation = Operation.THIS){
    this._queue.saved().subscribe(
        queues => {
          this.savedQueues = queues; 
          if(operation == Operation.CHOOSE_SIDE){
            this.$next(); 
          }
        });    
  }

  $open(queue: Patient_queue){
    this.open.emit(queue); 
  }
}
