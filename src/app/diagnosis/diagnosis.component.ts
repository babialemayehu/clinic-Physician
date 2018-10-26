import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { Diagnosis } from '../model/Diagnosis';
import { FormControl } from '@angular/forms';
import { Hisstory } from '../model/Hisstory';
import { HisstoryService } from '../service/hisstory.service';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.scss']
})
export class DiagnosisComponent implements OnInit {

  private autoDiagnosis: Diagnosis[] = []; 
  private fullDiagnosis: Diagnosis[] = []; 
  private input: FormControl = new FormControl(); 
  private selected: Diagnosis[]; 

  constructor(
    private thisDialog: MatDialogRef<DiagnosisComponent>, 
    @Inject(MAT_DIALOG_DATA) public data,
    private _hisstory: HisstoryService
  ) {
      this._hisstory.getDiagnosises("all").subscribe(
        (diagnosises) => {
          this.autoDiagnosis = diagnosises; 
          this.fullDiagnosis = diagnosises; 
        }
      )
   }

  ngOnInit() {
    this.input.valueChanges.subscribe(
      (key) => {
        console.log(key); 
        if(key == "") this.autoDiagnosis = this.fullDiagnosis; 
        else
          this._hisstory.getDiagnosises(key).subscribe(
            (diagnosises) => {
              this.autoDiagnosis = diagnosises; 
            }
          )
      }
    )
  }

  select(diagnosis: Diagnosis){
    this.selected.push(diagnosis); 
  }

}
