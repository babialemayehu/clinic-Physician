import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { Diagnosis } from '../model/Diagnosis';
import { FormControl } from '@angular/forms';
import { Hisstory } from '../model/Hisstory';
import { HisstoryService } from '../service/hisstory.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete} from '@angular/material';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.scss']
})
export class DiagnosisComponent implements OnInit {

  private autoDiagnosis: Diagnosis[] = []; 
  private fullDiagnosis: Diagnosis[] = []; 
  private input: FormControl = new FormControl(); 
  private selected: Diagnosis[] = []; 
  private visible = true;
  private selectable = true;
  private removable = true;
  private addOnBlur = false;
  private separatorKeysCodes: number[] = [ENTER, COMMA];

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
    if(this.selected.find((e)=> { return e.name == diagnosis.name }) === undefined)
      this.selected.push(diagnosis);
    this.autoDiagnosis = this.fullDiagnosis;  
    this.input.reset(); 
  }

  remove(diagnosis: Diagnosis){
    this.selected.splice(this.selected.indexOf(diagnosis),1); 
  }

  onFocus(){
    if(this.input.value == ''){
      this.autoDiagnosis = this.fullDiagnosis; 
    }
  }

  close(message){
    this.submit(); 
    this.thisDialog.close(message); 
  }

  submit(){
    this._hisstory.diagnosises(this.data.queue.hisstory_id, this.selected).subscribe(
      (responce) => {
        console.log(responce); 
      }
    )
  }
}
