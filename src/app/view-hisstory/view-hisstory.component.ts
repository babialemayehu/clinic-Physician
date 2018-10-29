import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Hisstory } from '../model/Hisstory';
import { HisstoryService } from '../service/hisstory.service';
import { ActivatedRoute } from '@angular/router';
import { Prescription } from '../model/Prescription';

@Component({
  selector: 'app-view-hisstory',
  templateUrl: './view-hisstory.component.html',
  styleUrls: ['./view-hisstory.component.scss']
})
export class ViewHisstoryComponent implements OnInit {

 
  private displayedColumns = ['name', 'dose', 'root', 'frequency']; 
  private hisstory: Hisstory; 

  constructor(private _hisstory: HisstoryService, 
    private _activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this._activeRoute.params.subscribe(
      param => {
        this._hisstory.viewHisstroy(param.queue_id).subscribe(
          (hisstory) => {
            this.hisstory = hisstory; 
          }
        ); 
      }
    )
  }

}
