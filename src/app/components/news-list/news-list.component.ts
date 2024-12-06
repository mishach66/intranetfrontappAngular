import { Component, inject, signal, effect, WritableSignal, resource, } from '@angular/core';
import { NewsService } from '../../services/news/news.service';
import { LoadingSpinnerComponent } from "../../components/loading-spinner/loading-spinner.component";
import { NewsComponent } from '../../components/news/news.component';

@Component({
  selector: 'app-news-list',
  imports: [LoadingSpinnerComponent, NewsComponent, ],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss',
})
export class NewsListComponent {
  constructor() {
    this.getAllNews();

    effect(() => {
      console.log('Value: ', this.newsResource.value());
      console.log('Status: ', this.newsResource.status());
      console.log('Error: ', this.newsResource.error());
    });
  }

  newsServece = inject(NewsService);
  newsList: any = [];
  isLoading: WritableSignal<boolean> = signal(false);

  getAllNews = () => {
    this.isLoading.set(true);

    // სატესტო ვერსია setTimeout-ით დაყოვნებით
    setTimeout(() => {
      this.newsServece.allNews().subscribe((val) => {
        this.newsList = val;
        this.isLoading.set(false);
      });
    }, 1500);

    // პროდაქშენის ვერსია
    // this.newsServece.allNews().subscribe((val) => {
    //   this.newsList = val;
    //   this.isLoading.set(false);
    // });
  };

  newsResource = resource({
    loader: async () => {
      const res = await fetch(`https://localhost:7071/api/News/allNews`);
      return await (res.json() as Promise<any>);
    },
  });
}
