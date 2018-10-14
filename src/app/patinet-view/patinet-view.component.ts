import { Component, OnInit, Input } from '@angular/core';
import { Patient } from '../model/Patient'; 

@Component({
  selector: 'app-patinet-view',
  templateUrl: './patinet-view.component.html',
  styleUrls: ['./patinet-view.component.scss']
})
export class PatinetViewComponent implements OnInit {

  @Input() patient: Patient;

  constructor() { }

  ngOnInit() {
  }

}
