import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Prescription } from '../model/Prescription';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { PharmacyService } from '../service/pharmacy.service';
import { Drug } from '../model/Drug';
import { Drug_frequency } from '../model/Drug_frequency';
import { Drug_root } from '../model/Drug_root';
import { CookieService } from 'ngx-cookie-service';
import { AlertComponent } from '../alert/alert.component';

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
  private loading = false;
  private frequencies: Drug_frequency[];
  private roots: Drug_root[];

  displayedColumns: string[] = ['no', 'name', 'frequency', 'root', 'icon'];

  private add: FormGroup;
  private filter: FormControl = new FormControl();

  constructor(
    private _pharmacy: PharmacyService,
    private _route: Router,
    private _form: FormBuilder,
    private _cookies: CookieService,
    private _dialog: MatDialog) { }

  ngOnInit() {

    this.add = this._form.group({
      id: [''],
      name: ['', Validators.required],
      dosage: ['', Validators.required ],
      root_id: ['', Validators.required ],
      frequency_id: ['', Validators.required ],
    });
    this._pharmacy.drugAutoComplet('').subscribe(
      tests => { this.drugAuto = tests; }
    );
    this.add.controls.name.valueChanges.subscribe(
      value => {
          this._pharmacy.drugAutoComplet(value).subscribe(
          tests => { this.drugAuto = tests; this.fullDrug = tests;  }
      ); }
    );

    this._pharmacy.getFrequencies().subscribe(frequencies => {this.frequencies = frequencies; });
    this._pharmacy.getRoots().subscribe( roots => { this.roots = roots; });
  }

  $add() {
    const $drug = this.add.controls.name.value;
    const _drug = this.prescriptions.filter((e) => {
      return (e.drug.name === $drug);
    });

    if (_drug.length === 0) {
      const $data = this.add.value;

      $data.frequency = (this.frequencies.find(x => x.id === $data.frequency_id));
      $data.root = (this.roots.find(x => x.id === $data.root_id));
      $data.drug = (this.fullDrug.find(x => x.name === $data.name));
      this.prescriptions.push($data);
      this.drugDataSource.data = this.prescriptions;
    }

    this.drugAuto = this.fullDrug;
    this.add.reset();
  }

  onFocus(val) {

    if (val === '') {
      this.drugAuto = this.fullDrug;
    }
  }
  onDrugFocusOut(val){
    let drug =  (this.fullDrug.find(x => x.name === this.add.value.name));
    if(drug != null){
      this._pharmacy.isDrugAvalilable(drug.id).subscribe(
        (response) =>{
          console.log(response); 
          if(!response){
            console.log(this.add.controls.name.getError); 
            this.add.controls.name.setErrors({'avalible': true}); 
          }
        }
      )
    }  
  }

  remove(drug) {
    this.prescriptions.splice(this.prescriptions.indexOf(drug), 1);
    this.drugDataSource.data = this.prescriptions;
  }

  send_request() {
    this.loading = true;
    this._pharmacy.prescribe(this.queue.hisstory.id, this.prescriptions).subscribe(
      value => {
        this.loading = false;
        this.prescriptions = [];
        this.drugDataSource.data = this.prescriptions;
        this.status.emit(1);
        this._route.navigate(['prescription/prescribed/' + this.queue.id]);
      }
    );
  }
  send() {
    const that = this;
    if (that._cookies.get('prescription confrimation') != 'true') {
      this._dialog.open(AlertComponent, {
        width: '400px',
        disableClose: true,
        data: {
          dialog: 'confirm',
          color: 'yellow',
          title: 'Confirm',
          message: 'Do you really want to send this prescription for <b>' + this.queue.patient.father_name + ' ' + this.queue.patient.father_name + '.</b><br>',
          checkbox: 'Don\'t show this dialog again',
          checkboxStatus: (that._cookies.get('prescription confrimation') == 'true'),
          onCheck: (e) => {
            that._cookies.set('prescription confrimation', e.checked);
          }
        }
      }).afterClosed().subscribe(
        ok => {
          if (ok.responce === true) {
            this.send_request();
          }
        },
        no => {

        }
      );
    } else {
      this.send_request();
    }
  }

  get name() { return this.add.get('name'); }
  get dosage() { return this.add.get('dosage'); }
  get root_id() { return this.add.get('root_id'); }
  get frequency_id() { return this.add.get('frequency_id'); }
}
