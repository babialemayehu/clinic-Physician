import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Laboratory } from '../model/Laboratory';
import { LaboratoryService } from '../service/laboratory.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-lab-responce',
  templateUrl: './lab-responce.component.html',
  styleUrls: ['./lab-responce.component.scss']
})
export class LabResponceComponent implements OnInit {

  private requestDatasource = new MatTableDataSource<Laboratory>(); 
  private requests: Laboratory[] = []; 
  private displayedColumns = ["no", "name","normality", "value", "note"]; 
  private queue_id: number; 
  constructor(private _lab: LaboratoryService, private _route:ActivatedRoute) { }

  ngOnInit() {
    this._route.params.subscribe(
      params =>{
        this._lab.getRequests(params.queue_id).subscribe(
          (requests) => {
            this.queue_id = params.queue_id; 
            this.requests = requests; 
            this.requestDatasource.data = this.requests; 
          }
        )
      }
    )
    
  }

}
