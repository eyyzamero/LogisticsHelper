import { Directive, HostBinding, Input } from '@angular/core';
import { ProgressBarColor } from '../../enums';

@Directive({
  selector: '[ionProgressBarColor]'
})
export class IonProgressBarColorDirective {

  @HostBinding('style.--progress-background') backgroundColor: ProgressBarColor = ProgressBarColor.NONE;

  @Input() set value(value: number) {
    this._assignBackgroundColor(value);
  }

  private _assignBackgroundColor(value: number) {
    const number = Number(value);
    let color: ProgressBarColor = ProgressBarColor.NONE;

    if (!isNaN(number)) {
      if (number <= 0.33)
        color = ProgressBarColor.LOW;
      else if (number <= 0.66)
        color = ProgressBarColor.MEDIUM;
      else if (number <= 0.99)
        color = ProgressBarColor.HIGH;
      else
        color = ProgressBarColor.COMPLETE;

      this.backgroundColor = color;
    }
  }
}
