import { Component, effect, input, InputSignal, output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  constructor () {
    effect(() => {
    });
  }

  label: InputSignal<string | undefined> = input.required();

  onClick = output<any>()

  onButtonClick(event: any) {
    this.onClick.emit(event);
  }
}
