import { Component, effect, input, InputSignal, output } from '@angular/core';

@Component({
    selector: 'app-button',
    imports: [],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss'
})
export class ButtonComponent {
  constructor () {
    effect(() => {
      console.log("disabled status in effect is:", this.isDisabled())
    });
  }

  label: InputSignal<string | undefined> = input.required();

  isDisabled = input(false);
  buttonType = input('submit');
    
  onClick = output<any>()

  onButtonClick(event: any) {
    this.onClick.emit(event);
    console.log("disabled status in onButtonClick is:", this.isDisabled())
    console.log("buttonType is:", this.buttonType())
  }
}
