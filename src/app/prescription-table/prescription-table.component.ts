import { Component, OnInit, Input } from '@angular/core';
import { Prescription } from '../model/Prescription';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-prescription-table',
  templateUrl: './prescription-table.component.html',
  styleUrls: ['./prescription-table.component.scss']
})
export class PrescriptionTableComponent implements OnInit {
  @Input() prescriptions: Prescription[] = [];
  private prescriptionDatasource: MatTableDataSource<Prescription> = new MatTableDataSource();
  private displayedColumns = ['no', 'name', 'frequency', 'root', 'dose'];

  ngOnChanges() {
    console.log(this.prescriptions);
    this.prescriptionDatasource.data = this.prescriptions;
  }
  constructor() { }

  ngOnInit() {
  }

}
