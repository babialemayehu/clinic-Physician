import { Component, OnInit } from '@angular/core';
import { ContextMenuComponent } from '../context-menu/context-menu.component'; 

@Component({
  selector: 'app-context',
  templateUrl: './context.component.html',
  styleUrls: ['./context.component.scss']
})
export class ContextComponent implements OnInit {

  menu = ContextMenuComponent; 
  items: [
    {icon:'', text: 'baseline' },
    {icon:'build', text: 'build' },
    {icon:'backup', text: 'backup' },
    {icon:'adb', text: 'backup' },
    {icon:'add', text: 'backup' }
  ];
  constructor() { }
  ngOnInit() {
    
  }
  handleClose(e) {
    console.log('laskdfjlasdkf'); 
  }
}
