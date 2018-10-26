import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PatientQueueService } from '../service/patient-queue.service';
import { Patient_queue } from '../model/Patient_queue';

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

  getSaved(){
    this._queue.saved().subscribe(
        queues => {
          this.savedQueues = queues; 
        });
  }

  $open(queue: Patient_queue){
    this.open.emit(queue); 
  }
}
