import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Prescription } from '../model/Prescription';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { PharmacyService } from '../service/pharmacy.service';
import { Drug } from '../model/Drug'; 
import { Drug_frequency } from '../model/Drug_frequency';
import { Drug_root } from '../model/Drug_root';

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.scss']
})
export class PharmacyComponent implements OnInit {
  @Input() queue;   
  @Output() status: EventEmitter<number> = new EventEmitter<number>(); 
  
  private drugDataSource = new MatTableDataSource<Prescription>(); 
  private prescriptions: Prescription[] = [];
  private drugAuto: Drug[] = []; 
  private fullDrug: Drug[] = []; 
  private loading: boolean = false; 
  private frequencies: Drug_frequency[]; 
  private roots: Drug_root[]; 

  displayedColumns: string[] = ['no', 'name','frequency', 'root', 'icon'];

  private add: FormGroup; 
  private filter: FormControl = new FormControl(); 

  constructor(
    private _lab: PharmacyService, 
    private _route:Router, 
    private _form: FormBuilder) { }

  ngOnInit() {

    this.add = this._form.group({
      id: [""], 
      name: ["", Validators.required], 
      dosage: ["", Validators.required ], 
      root_id: ["", Validators.required ],
      frequency_id: ["", Validators.required ],
    })
    this._lab.drugAutoComplet("").subscribe(
      tests => { this.drugAuto = tests; }
    )
    this.add.controls.name.valueChanges.subscribe(
      value => {  
          this._lab.drugAutoComplet(value).subscribe(
          tests => { this.drugAuto = tests;this.fullDrug = tests;  }
      )}
    )
    
    this._lab.getFrequencies().subscribe(frequencies => {this.frequencies = frequencies;}); 
    this._lab.getRoots().subscribe( roots => { this.roots = roots }); 
  }

  $add(){
    let $drug = this.add.controls.name.value; 
    let _drug = this.prescriptions.filter((e)=>{
      return (e.drug.name == $drug); 
    });

    if(_drug.length == 0){
      let $data = this.add.value; 
    
      $data.frequency = (this.frequencies.find(x => x.id == $data.frequency_id)); 
      $data.root = (this.roots.find(x => x.id == $data.root_id)); 
      $data.drug = (this.fullDrug.find(x => x.name == $data.name)); 
      this.prescriptions.push($data); 
      this.drugDataSource.data = this.prescriptions; 
    }
    
    this.drugAuto = this.fullDrug; 
    this.add.reset();
  }

  onFocus(val){
   
    if(val == ""){ 
      this.drugAuto = this.fullDrug; 
    }
  }
  remove(drug){
    this.prescriptions.splice(this.prescriptions.indexOf(drug),1);
    this.drugDataSource.data = this.prescriptions; 
  }

  send(){
    this.loading = true; 
    this._lab.prescribe(this.queue.hisstory.id, this.prescriptions).subscribe(
      value => {
        this.loading = false; 
        this.prescriptions = []; 
        this.drugDataSource.data = this.prescriptions; 
        this.status.emit(1); 
      }
    )
  }

  get name() { return this.add.get('name'); }
  get dosage() { return this.add.get('dosage'); }
  get root_id() { return this.add.get('root_id'); }
  get frequency_id() { return this.add.get('frequency_id'); }
} 
