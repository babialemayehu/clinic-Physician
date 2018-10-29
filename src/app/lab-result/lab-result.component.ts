import { Component, OnInit, Input } from '@angular/core';
import { Laboratory } from '../model/Laboratory';
import { MatTable, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-lab-result',
  templateUrl: './lab-result.component.html',
  styleUrls: ['./lab-result.component.scss']
})
export class LabResultComponent implements OnInit {

  private testDataSource: MatTableDataSource<Laboratory> = new MatTableDataSource<Laboratory>(); 
  private displayedColumns = ["no", "name","normality", "value", "note"]; 

  constructor() { }

  @Input() tests: Laboratory[] = [];

  ngOnChanges(){
    this.testDataSource.data = this.tests; 
  }
  ngOnInit() {
  }

}
