import {
  Component,
  inject,
  signal,
  effect,
  WritableSignal,
  resource,
  OnInit,
} from '@angular/core';
import { NewsService } from '../../services/news/news.service';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { NewsComponent } from '../../components/news/news.component';
import { News } from '../../models/news/news';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-list',
  imports: [LoadingSpinnerComponent, NewsComponent],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss',
})
export class NewsListComponent implements OnInit {
  constructor(
    private titleService: Title, private activatedRoute: ActivatedRoute
  ) {
  titleService.setTitle('უნივერსიტეტის სიახლეები')
  //this.getAllNews();

    effect(() => {
      console.log('Value: ', this.newsResource.value());
      console.log('Status: ', this.newsResource.status());
      console.log('Error: ', this.newsResource.error());
    });
  }

  newsList: any = [];
  isLoading: WritableSignal<boolean> = signal(false);
  ngOnInit(): void {
    console.log(
      'Activated route data in Component:::',
      this.activatedRoute.data
    );
    this.isLoading.set(true);
    setTimeout(() => {
      this.activatedRoute.data.subscribe((response: any) => {
        console.log('NEWS LIST FETCHING', response);
        this.newsList = response.newslist;
        console.log('NEWS LIST FETCHED');
        this.isLoading.set(false);
      });
    }, 2000)

  }

  // newsServece = inject(NewsService);
  // // newsList: any = [];
  // newsList: Array<News> = [];
  // isLoading: WritableSignal<boolean> = signal(false);

  // getAllNews = () => {
  //   this.isLoading.set(true);

  //   // // სატესტო ვერსია setTimeout-ით დაყოვნებით
  //   setTimeout(() => {
  //     this.newsServece.allNews().subscribe((val) => {
  //       // console.log('val is:', val)
  //       this.newsList = val as Array<News>;
  //       this.isLoading.set(false);
  //     });
  //   }, 1000);

  //   // // პროდაქშენის ვერსია
  //   // this.newsServece.allNews().subscribe((val) => {
  //   // // this.newsList = val;
  //   // this.newsList = val as Array<News>;
  //   // this.isLoading.set(false);
  //   // });
  // };

  newsResource = resource({
    loader: async () => {
      const res = await fetch(`https://localhost:7071/api/News/allNews`);
      return await (res.json() as Promise<any>);
    },
  });
}
