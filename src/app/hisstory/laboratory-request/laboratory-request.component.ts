import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient_queue } from '../../model/Patient_queue';
import { PatientQueueService } from '../../service/patient-queue.service';

@Component({
  selector: 'app-laboratory-request',
  templateUrl: './laboratory-request.component.html',
  styleUrls: ['./laboratory-request.component.scss']
})
export class LaboratoryRequestComponent implements OnInit {
  private $queue:Patient_queue; 
  private $queue_id: number; 
  private update: any = {
    queue: 0
  }; 
  constructor(private _activeRoute: ActivatedRoute, private _route: Router, private _queue: PatientQueueService) { }

  ngOnInit() {
    this._activeRoute.params.subscribe(
      (param) => {
        this.$queue_id = param.queue_id; 
        this._queue.getQueue(param.queue_id).subscribe(
          (queue)=>{

            this.$queue = param.queue
            console.log(this.$queue); 
          }
        ); 
      }
    ); 
  }


}
