import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, defaultUrlMatcher, Params, Router } from '@angular/router';
import { NewsService } from '../../services/news/news.service';
import { News } from '../../models/news/news';

@Component({
  selector: 'app-news-edit',
  imports: [
    ButtonComponent,
    LoadingSpinnerComponent,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './news-edit.component.html',
  styleUrl: './news-edit.component.scss',
})
export class NewsEditComponent {
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.initiateForm();
  }

  newsServece = inject(NewsService);
  isLoading: WritableSignal<boolean> = signal(false);

  idParam!: string;
  titleParam!: string;
  authorParam!: string;
  contentParam!: string;
  dateParam!: string;
  //currentDate: string = new Date().toISOString().split('T')[0].replace(/-/g, ' ');
  currentDate: Date = new Date();
  hyperlinkParam!: string;

  newsForm!: FormGroup;
  buttonType: string = 'submit';

  initiateForm() {
    this.route.params.subscribe((params: Params) => {
      (this.idParam = params['id']),
        (this.titleParam = params['title']),
        (this.authorParam = params['author']),
        (this.contentParam = params['content']),
        (this.dateParam = params['date']);
        (this.hyperlinkParam = 'unnecessary hyperlink (Angular)');
    });
    console.log('this.titleParam', this.titleParam);
    this.newsForm = this.fb.group({
      id: [this.idParam],
      title: [
        this.titleParam,
        [Validators.required, Validators.maxLength(500)],
      ],
      author: [this.authorParam, Validators.required],
      content: [this.contentParam, Validators.required],
      date: [this.currentDate],
      hyperlink: [this.hyperlinkParam],
    });
  }

  saveLabel = 'შენახვა';
  saveFunctionCall(event: any) {
    console.log('saveFunctioncall', event);
    console.log('ეს არის ოპერაცია', event.target.innerText);
    if (this.newsForm.valid) {
      console.log('ვალიდურია )))');
    } else {
      console.log('არ არის ვალიდური (((');
    }
  }

  onSubmit() {
    console.log('დასაბმიტდა!');
    // debugger;
    const newsObj: News = this.newsForm.value;
    console.log('newsForm.value', newsObj);
    
    this.isLoading.set(true);
    this.newsServece.editNews(newsObj).subscribe((val: any) => {
      console.log(val)
      this.isLoading.set(false);
    });
    this.router.navigate(['newslist']);
  }
}
