import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms'; 
import { Laboratory_test } from '../model/Laboratory_test';
import { LaboratoryService } from '../service/laboratory.service';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-laboratory',
  templateUrl: './laboratory.component.html',
  styleUrls: ['./laboratory.component.scss']
})
export class LaboratoryComponent implements OnInit {
  @Input() hisstory; 
  
  private testDatasource = new MatTableDataSource<Laboratory_test>(); 
  private tests: Laboratory_test[] = [];
  private testAuto: Laboratory_test[] = []; 
  displayedColumns: string[] = ['no', 'name','icon'];

  private add: FormControl = new FormControl(); 
  private filter: FormControl = new FormControl(); 

  constructor(private _lab: LaboratoryService) { }

  ngOnInit() {
    this._lab.autoComplet("all").subscribe(
      tests => { this.testAuto = tests; }
    )
    this.add.valueChanges.subscribe(
      value => {  
          this._lab.autoComplet(value).subscribe(
          tests => { this.testAuto = tests; }
      )}
    )
  }

  $add(tests){
    this.tests.push(tests); 
    this.add.setValue("");  
    this.testDatasource.data = this.tests; 
    this._lab.autoComplet("all").subscribe(
      tests => { this.testAuto = tests; }
    )
  }

  remove(test){
    this.tests.splice(this.tests.indexOf(test),1);
    this.testDatasource.data = this.tests; 
  }

  send(){
    this._lab.request(this.tests,this.hisstory.id).subscribe(
      value => {
        console.log(value); 
      }
    )
  }
}
