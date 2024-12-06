import { Component, input, InputSignal } from '@angular/core';
import { ButtonComponent } from "../button/button.component";

@Component({
    selector: 'app-news',
    imports: [ButtonComponent],
    templateUrl: './news.component.html',
    styleUrl: './news.component.scss'
})
export class NewsComponent {
  editLabel = "რედაქტირება"
  deleteLabel = "წაშლა"

  title: InputSignal<string | undefined> = input.required();
  author: InputSignal<string | undefined> = input.required();
  content: InputSignal<string | undefined> = input.required();
  
  editFunctioncall(event: any) {
    console.log('editFunctioncall', event);
    console.log('ეს არის ოპერაცია', event.target.innerText);
  }
  deleteFunctioncall(event: any) {
    console.log('deleteFunctioncall', event);
    console.log('ეს არის ოპერაცია', event.target.innerText);
  }
}
