import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../model/User';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent implements OnInit {

  private loading = false; 
  constructor() { }

  ngOnInit() {
  }

  onUpload(observ: string){
    this.loading = ('waiting' == observ); 
  }
}
