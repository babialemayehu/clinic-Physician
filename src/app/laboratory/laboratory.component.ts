import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms'; 
import { Laboratory_test } from '../model/Laboratory_test';
import { LaboratoryService } from '../service/laboratory.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Patient_queue } from '../model/Patient_queue';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../alert/alert.component'; 
import { CookieService } from 'ngx-cookie-service'; 

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
  @Input() queue: Patient_queue; 
  
  private testDatasource = new MatTableDataSource<Laboratory_test>(); 
  private tests: Laboratory_test[] = [];
  private testAuto: Laboratory_test[] = []; 
  private fullTest: Laboratory_test[] = []; 
  private loading: boolean = false; 
  displayedColumns: string[] = ['no', 'name','icon'];

  private add: FormControl = new FormControl(); 
  private filter: FormControl = new FormControl(); 

  constructor(private _lab: LaboratoryService,
     private _route:Router, 
     private _dialog: MatDialog,
     private _cookies: CookieService) { }

  ngOnChanges(){
    console.log(this.queue); 
  }
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

  send_request(){
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
  send(){
    let that = this;
    if(that._cookies.get('lab confrimation') != 'true'){
      this._dialog.open(AlertComponent, {
        width: "400px", 
        disableClose: true, 
        data: {
          dialog: 'confirm', 
          color: "yellow", 
          title: 'Confirm', 
          message: 'Do you really want to send this Laboratory request for <b>'+this.queue.patient.father_name+" "+ this.queue.patient.father_name+".</b><br>",
          checkbox: 'Don\'t show this dialog again', 
          checkboxStatus: (that._cookies.get('lab confrimation') == 'true'),
          onCheck: (e)=>{
            that._cookies.set('lab confrimation', e.checked); 
          }
        }
      }).afterClosed().subscribe(
        ok => {
          if(ok.responce == true)
            this.send_request(); 
        }, 
        no => {
  
        }
      ); 
    }else{
      this.send_request(); 
    }
    
    
  }
}
