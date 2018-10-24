import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LaboratoryService } from '../service/laboratory.service';
import { Laboratory_test } from '../model/Laboratory_test';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.scss']
})
export class PharmacyComponent implements OnInit {
  @Input() queue; 
  
  private drugDataSource = new MatTableDataSource<Laboratory_test>(); 
  private drugs: Laboratory_test[] = [];
  private drugAuto: Laboratory_test[] = []; 
  private fullDrug: Laboratory_test[] = []; 
  private loading: boolean = false; 
  displayedColumns: string[] = ['no', 'name','icon'];

  private add: FormGroup; 
  private filter: FormControl = new FormControl(); 

  constructor(
    private _lab: LaboratoryService, 
    private _route:Router, 
    private _form: FormBuilder) { }

  ngOnInit() {

    this.add = this._form.group({
      id: [""], 
      name: ["", Validators.required], 
      dosage: ["", Validators.required ], 
      root: ["", Validators.required ],
      frequency: ["", Validators.required ],
    })
    this._lab.autoComplet("all").subscribe(
      tests => { this.drugAuto = tests; }
    )
    this.add.valueChanges.subscribe(
      value => {  
          this._lab.autoComplet(value).subscribe(
          tests => { this.drugAuto = tests;this.fullDrug = tests;  }
      )}
    )
  }

  $add(test){
    let _test = this.drugs.filter((e)=>{
      return (e.name == test.name); 
    });

    this.add.reset(); 
    if(_test.length == 0){
      this.drugs.push(test); 
        
      this.drugDataSource.data = this.drugs; 
    }
    
    this.drugAuto = this.fullDrug; 
  }

  remove(test){
    this.drugs.splice(this.drugs.indexOf(test),1);
    this.drugDataSource.data = this.drugs; 
  }

  send(){
    this.loading = true; 
    this._lab.request(this.drugs,this.queue.id).subscribe(
      value => {
        this.loading = false; 
        this.drugs = []; 
        this.drugDataSource.data = this.drugs; 
        this._route.navigate(['/lab/requests/'+this.queue.id]); 
      }
    )
  }

  get name() { return this.add.get('name'); }
  get dosage() { return this.add.get('dosage'); }
  get root() { return this.add.get('root'); }
  get frequency() { return this.add.get('frequency'); }
} 
