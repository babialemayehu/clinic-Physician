import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-history-form',
  templateUrl: './history-form.component.html',
  styleUrls: ['./history-form.component.scss']
})
export class HistoryFormComponent implements OnInit {

  private form: FormGroup; 

  constructor(private _form: FormBuilder) { }

  ngOnInit() {
    this.form = this._form.group({
      chief_complaint: ["", Validators.required], 
      temprature: [""], 
      BP: [""], 
      puls_rate: [""], 
      respiratory_rate: [""]
    }); 
  }
  get chief_complaint(){ return this.form.get('chief_complaint');}
  get temprature(){ return this.form.get('temprature');}
  get BP(){ return this.form.get('BP');}
  get puls_rate(){ return this.form.get('puls_rate');}
  get respiratory_rate(){ return this.form.get('respiratory_rate');}
}
