import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { VisitsDataSource } from './visits-datasource';
import { PatientQueueService } from '../service/patient-queue.service'; 
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css']
})
export class VisitsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: VisitsDataSource;

  displayedColumns = ['date', 'physician'];
  private loaded = false; 
  private error = false; 

  constructor(private _queue: PatientQueueService, private _activeRoute:ActivatedRoute){}
  ngOnInit() {
    this.dataSource = new VisitsDataSource(this.paginator, this.sort , []);
    this._activeRoute.params.subscribe(
      (param) => {
        this._queue.visits(param.reg_id).subscribe(
          responce => {
            this.dataSource = new VisitsDataSource(this.paginator, this.sort, responce); 
            this.loaded = true; 
            this.error = false; 
          }, 
          error => {
            this.loaded = true; 
            this.error = true; 
          }
        )
      }
    )
  }
}
