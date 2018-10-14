import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms'; 

import { Patient } from '../model/Patient';
import { PatientService } from '../service/patient.service'; 
@Component({
  selector: 'app-patient-search',
  templateUrl: './patient-search.component.html',
  styleUrls: ['./patient-search.component.scss']
})
export class PatientSearchComponent implements OnInit {

  @Output() patient = new EventEmitter(); 

  @Input()
  set search(key: string){
    this.searchControl.patchValue(key); 
    this.$search(); 
  }

  private autocomplets: Patient[]; 
  private searchControl: FormControl;  

  constructor(private _patinet: PatientService) { }

  ngOnInit() {
    this.searchControl = new FormControl(); 
    this.searchControl.valueChanges.subscribe(
      (val) => {
        if(val != ""){
          this._patinet.autoComplete(val).subscribe(
            (patients: Patient[]) => {
              this.autocomplets = patients; 
            }
          )
        }else{
          this.autocomplets = []; 
        }
      }
    )
  }

  $search(patient: Patient = null) {
    if(patient){
      this.patient.emit(patient); 
    }else{
      this._patinet.search(this.searchControl.value).subscribe(
        (result) => {
          this.patient.emit(result);
        }
      )
    }
    
  }
}
