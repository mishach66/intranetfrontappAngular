import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NewsService } from '../../services/news/news.service';
import { ButtonComponent } from '../button/button.component';
import { LoadingSpinnerComponent } from "../../components/loading-spinner/loading-spinner.component";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-news-details',
  imports: [DatePipe, ButtonComponent, LoadingSpinnerComponent, ],
  templateUrl: './news-details.component.html',
  styleUrl: './news-details.component.scss',
})

export class NewsDetailsComponent implements OnInit {
  id!: string;
  author!: string;
  title!: string;
  content!: string;
  date!: string;

  editLabel = 'რედაქტირება';
  deleteLabel = 'წაშლა';

  constructor(private route: ActivatedRoute, private titleService: Title) { 
    
  }

  newsServece = inject(NewsService);
  newsDetails: any;
  isLoading: WritableSignal<boolean> = signal(false);
  creationDate: string | undefined;

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      console.log('queryParams ARE: ', params)
      this.titleService.setTitle(params['title'])
    })
    
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.author = this.route.snapshot.paramMap.get('author')!;
    this.title = this.route.snapshot.paramMap.get('title')!;
    this.content = this.route.snapshot.paramMap.get('content')!;
    this.date = this.route.snapshot.paramMap.get('date')!;

    // this.titleService.setTitle(`${this.title}`)

    //this.getNewsById();
  }

  getNewsById = () => {
    this.isLoading.set(true);

    // // სატესტო ვერსია setTimeout-ით დაყოვნებით
    setTimeout(() => {
      this.newsServece.newsById(this.id).subscribe((val) => {
        console.log('val არის:::', val);
        this.newsDetails = val;
        this.isLoading.set(false);
      });
    }, 1000);

    // // პროდაქშენის ვერსია
    // this.newsServece.newsById(this.id).subscribe((val) => {
    //   this.newsDetails = val;
    //   this.isLoading.set(false);
    // });
  };

  editFunctioncall(event: any) {
    console.log('editFunctioncall', event);
    console.log('ეს არის ოპერაცია', event.target.innerText);
  }
  deleteFunctioncall(event: any) {
    console.log('deleteFunctioncall', event);
    console.log('ეს არის ოპერაცია', event.target.innerText);
  }
}
