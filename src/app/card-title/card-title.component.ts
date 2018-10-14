import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ICON_REGISTRY_PROVIDER } from '@angular/material';
import { Options } from '../model/Options'; 

@Component({
  selector: 'app-card-title',
  templateUrl: './card-title.component.html',
  styleUrls: ['./card-title.component.scss']
})

export class CardTitleComponent implements OnInit {

  private _titel: string; 
  private _icon = "more_vert"; 

  @Input() 
  set titel(val){
    this._titel = val; 
  }

  @Input() 
  set icon(val){
    this._icon = val; 
  }

  @Input() options: Options[]; 
  @Output() onClick = new EventEmitter(); 
  @Output() onSelect = new EventEmitter(); 

  constructor() { }

  ngOnInit() {
  }

  action(){
    this.onClick.emit(); 
  }

  select(value){
    this.onSelect.emit(value); 
  }
}
