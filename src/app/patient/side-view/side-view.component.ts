import { Component, OnInit, Input } from '@angular/core';
import { Patient } from '../../model/Patient';

@Component({
  selector: 'app-patient-side-view',
  templateUrl: './side-view.component.html',
  styleUrls: ['./side-view.component.scss']
})
export class SideViewComponent implements OnInit {

  @Input() patient: Patient; 
  constructor() { }

  ngOnInit() {
  }

}
