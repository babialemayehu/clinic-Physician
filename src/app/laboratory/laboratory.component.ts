import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms'; 
import { Laboratory_test } from '../model/Laboratory_test';
import { LaboratoryService } from '../service/laboratory.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

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
  @Input() queue; 
  
  private testDatasource = new MatTableDataSource<Laboratory_test>(); 
  private tests: Laboratory_test[] = [];
  private testAuto: Laboratory_test[] = []; 
  private fullTest: Laboratory_test[] = []; 
  private loading: boolean = false; 
  displayedColumns: string[] = ['no', 'name','icon'];

  private add: FormControl = new FormControl(); 
  private filter: FormControl = new FormControl(); 

  constructor(private _lab: LaboratoryService, private _route:Router) { }

  ngOnInit() {
    this._lab.autoComplet("all").subscribe(
      tests => { this.testAuto = tests; }
    )
    this.add.valueChanges.subscribe(
      value => {  
          this._lab.autoComplet(value).subscribe(
          tests => { this.testAuto = tests;this.fullTest = tests;  }
      )}
    )
  }

  $add(test){
    let _test = this.tests.filter((e)=>{
      return (e.name == test.name); 
    });

    this.add.setValue("");
    if(_test.length == 0){
      this.tests.push(test); 
        
      this.testDatasource.data = this.tests; 
    }
    
    this.testAuto = this.fullTest; 
  }

  remove(test){
    this.tests.splice(this.tests.indexOf(test),1);
    this.testDatasource.data = this.tests; 
  }

  send(){
    this.loading = true; 
    this._lab.request(this.tests,this.queue.id).subscribe(
      value => {
        this.loading = false; 
        this.tests = []; 
        this.testDatasource.data = this.tests; 
        this._route.navigate(['/lab/result/'+this.queue.id]); 
      }
    )
  }
}
