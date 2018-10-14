import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(public _route: Router) { }

  ngOnInit() {
  }
  goto(loc){
    this._route.navigate(['/settings/'+loc]);
  }
}
