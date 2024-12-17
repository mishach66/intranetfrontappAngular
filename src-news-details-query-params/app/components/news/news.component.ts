import { Component, input, InputSignal, } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-news',
    imports: [ButtonComponent, RouterLink, MatTooltipModule, DatePipe, ],
    templateUrl: './news.component.html',
    styleUrl: './news.component.scss',
})
export class NewsComponent {
  editLabel = "რედაქტირება"
  deleteLabel = "წაშლა"

  id: InputSignal<string | undefined> = input.required();
  title: InputSignal<string | undefined> = input.required();
  author: InputSignal<string | undefined> = input.required();
  content: InputSignal<string | undefined> = input.required();
  date: InputSignal<string | undefined> = input.required();
  
  editFunctioncall(event: any) {
    console.log('editFunctioncall', event);
    console.log('ეს არის ოპერაცია', event.target.innerText);
  }
  deleteFunctioncall(event: any) {
    console.log('deleteFunctioncall', event);
    console.log('ეს არის ოპერაცია', event.target.innerText);
  }
}
