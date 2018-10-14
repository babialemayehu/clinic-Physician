import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-step-progress',
  templateUrl: './step-progress.component.html',
  styleUrls: ['./step-progress.component.scss']
})
export class StepProgressComponent implements OnInit {

  public liWidth: string;
  public _numberOfStaps: number;
  public _steps: string[];

  @Input() activeStep: number ;
  @Input()
  set numberOfStaps(numberOfStaps: number) {
    numberOfStaps  = numberOfStaps + 1;
    for ( let i = 0; i < numberOfStaps; i++) {
      // this._steps[i] = '';
    }
    this.liWidth = (100 / numberOfStaps) + '%';
    this._numberOfStaps = numberOfStaps;
  }

  @Input()
  set steps(steps: string[]) {
    this.liWidth = ( 100 / steps.length) + '%';
    this._steps = steps;
  }
  constructor() { }

  ngOnInit() {
  }

}
