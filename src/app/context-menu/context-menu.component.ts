import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';

import { ContextMenuService } from '../../lib/context-menu.service';
import { MenuPackage } from '../../lib/context-menu-injector';
import { MenuComponent } from '../../lib/menu.component';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
  animations: [
    trigger('menu', [
      state(
        'enter',
        style({ opacity: 1, marginTop: '0px', visibility: 'visible' }),
      ),
      state('exit, void', style({ opacity: 0, marginTop: '-15px' })),
      transition('* => *', animate('120ms ease-in')),
    ]),
  ],
  host: {
    '[@menu]': '_state',
    '(@menu.done)': '_onAnimationDone($event)',
  }
})
export class ContextMenuComponent extends MenuComponent {
  public items; 
  constructor(
    public menuPackage: MenuPackage,
    public contextMenuService: ContextMenuService,
  ) {
    super(menuPackage, contextMenuService);
    this.items = menuPackage.context;
  }

  onClick(e) {
    // console.log(e); 
    this.contextMenuService.closeAll(e);  
  }

}
