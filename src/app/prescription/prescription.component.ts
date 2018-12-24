import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Prescription } from '../model/Prescription';
import { ActivatedRoute } from '@angular/router';
import { PharmacyService } from '../service/pharmacy.service';
import { HisstoryService } from '../service/hisstory.service';
import { PatientQueueService } from '../service/patient-queue.service';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss']
})
export class PrescriptionComponent implements OnInit {
  private $prescriptions: Prescription[] = []; 
  private queue_id: number; 

  ngOnChanges(){
  }
  constructor(private _activeRoute: ActivatedRoute,private _queue:PatientQueueService, private _hisstory:HisstoryService) { }

  ngOnInit() {
    this._activeRoute.params.subscribe(
      (param) => {
        this.$prescriptions = param.queue_id; 
        this._queue.getQueue(param.queue_id).subscribe(
          (queue)=>{
            this.queue_id = queue.id; 
            this._hisstory.viewHisstroy(queue.hisstory.id).subscribe(
              (hisstory)=>{
                this.$prescriptions = hisstory.prescriptions; 
              }
            ); 
          }); 
      }
    ); 
  }

}
