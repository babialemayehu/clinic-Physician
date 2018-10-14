import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public menuItems = [
    {href: 'users', text: 'Users'}
  ]; 
  constructor() { }

  ngOnInit() {
   
  }

}
