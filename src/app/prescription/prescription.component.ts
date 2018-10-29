import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Prescription } from '../model/Prescription';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss']
})
export class PrescriptionComponent implements OnInit {
  @Input() prescriptions: Prescription[] = []; 
  private prescriptionDatasource: MatTableDataSource<Prescription> = new MatTableDataSource(); 
  private displayedColumns = ["no", "name", "frequency", "root", "dose"]; 

  ngOnChanges(){
    this.prescriptionDatasource.data = this.prescriptions;
  }
  constructor() { }

  ngOnInit() {
  }

}
