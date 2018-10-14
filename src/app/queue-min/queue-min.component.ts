import { Component, OnInit, Input } from '@angular/core';
import { Patient_queue } from '../model/Patient_queue'; 
import { PatientQueueService } from '../service/patient-queue.service'; 
import { Options } from '../model/Options';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-queue-min',
  templateUrl: './queue-min.component.html',
  styleUrls: ['./queue-min.component.scss']
})
export class QueueMinComponent implements OnInit {

  private queues: Patient_queue[] = []; 

  private options: Options[] = [
    {icon: "", text: "one", value: 1, data: ""}, 
    {icon: "", text: "two", value: 2, data: ""}, 
    {icon: "", text: "three", value: 3, data: ""}, 
    {icon: "", text: "for", value: 4, data: ""}, 
  ];
  @Input()
  set loadTriggr(value){
    this.load(); 
  }
  constructor(private _queue: PatientQueueService, private _router: Router) { }

  ngOnInit() {
    this.load(); 
    setInterval(() => {
      this.load()
    }, 10000); 

    //console.log(this.options); 
  }
  
  load(){
    this._queue.queue_list(7).subscribe(
      (responce) => {
        this.queues = responce; 
      }
    )
  }

  maximaize(){
    this._router.navigate(['/queue']); 
  }
}
