import { Component, OnInit, Input } from '@angular/core';
import { Patient } from '../model/Patient'; 
import { PatientService } from '../service/patient.service';
import { Patient_queue } from '../model/Patient_queue'; 
import { PatientQueueService } from '../service/patient-queue.service'; 
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-recent-visits',
  templateUrl: './recent-visits.component.html',
  styleUrls: ['./recent-visits.component.scss']
})
export class RecentVisitsComponent implements OnInit {

  private visits: Patient_queue[]; 
  private reg_id: string; 
  private isThereVisit: boolean = false; 
  private isEmpty: boolean = true; 

  @Input()
  set patient(value: Patient){
    if(value){
      this.reg_id = value.reg_id; 
      this._queue.visits(value.reg_id, 5).subscribe(
        (responce) => { 
          this.visits = responce; 
          this.isThereVisit = true; 
          if(responce.length > 0){
            this.isEmpty = false; 
          }
        }
      )
    }
  }

  constructor(private _queue: PatientQueueService, private _router: Router) { }

  ngOnInit() {

  }

  open(){
    if(this.reg_id)
      this._router.navigate(['/visits/'+this.reg_id]); 
  }
}
