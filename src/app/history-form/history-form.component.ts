import { Component, OnInit, Input} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { HisstoryService } from '../service/hisstory.service'; 
import { Hisstory } from '../model/Hisstory';

@Component({
  selector: 'app-history-form',
  templateUrl: './history-form.component.html',
  styleUrls: ['./history-form.component.scss']
})
export class HistoryFormComponent implements OnInit {

  private form: FormGroup; 
  @Input() hisstory: Hisstory; 
  
  constructor(private _form: FormBuilder,private _hisstory: HisstoryService) { 
    this.form = this._form.group({
      id: [""],
      patient_queue_id: [""],
      created_at: [""], 
      updated_at: [""], 
      deleted_at: [""], 
      chief_complaint: [""], 
      temprature: ["1"], 
      BP: [""], 
      puls_rate: [""], 
      respiratory_rate: [""]
    }); 
  }

  ngOnChanges(){

    this.form.patchValue(this.hisstory); 
  }
  ngOnInit() { 
    this.form.valueChanges.subscribe(
      (value)=> {}
    )
  }

  $chief_complaint() {
    this._hisstory.chif_complient(this.hisstory.id, this.form.controls.chief_complaint.value)
    .subscribe(); 
  }

  $metrix(){
    this._hisstory.metrix(this.hisstory.id, this.form.value)
    .subscribe(); 
  }
  get chief_complaint(){ return this.form.get('chief_complaint');}
  get temprature(){ return this.form.get('temprature');}
  get BP(){ return this.form.get('BP');}
  get puls_rate(){ return this.form.get('puls_rate');}
  get respiratory_rate(){ return this.form.get('respiratory_rate');}
}
