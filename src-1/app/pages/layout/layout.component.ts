import {
  Component,
  effect,
  signal,
  WritableSignal,
  inject,
  resource,
  OnInit,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NewsComponent } from '../../components/news/news.component';
import { GreetingCardComponent } from '../../components/greeting-card/greeting-card.component';
import { NewsService } from '../../services/news/news.service';
import { LoadingSpinnerComponent } from "../../components/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-layout',
  imports: [
    HeaderComponent,
    FooterComponent,
    NewsComponent,
    GreetingCardComponent,
    JsonPipe,
    LoadingSpinnerComponent
],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  constructor() {
    this.getAllNews();

    effect(() => {
      console.log('Value: ', this.newsResource.value());
      console.log('Status: ', this.newsResource.status());
      console.log('Error: ', this.newsResource.error());
    });
  }

  isLoading: WritableSignal<boolean> = signal(false);

  newsResource = resource({
    loader: async () => {
      const res = await fetch(`https://localhost:7071/api/News/allNews`);
      return await (res.json() as Promise<any>);
    },
  });

  getAllNews = () => {
    this.isLoading.set(true);

    setTimeout(() => {
      this.newsServece.allNews().subscribe((val) => {
        this.newsList = val;
        this.isLoading.set(false);
      });
    }, 500);

    // this.newsServece.allNews().subscribe((val) => {
    //   this.newsList = val;
    //   this.isLoading.set(false);
    // });
  };

  ngOnInit(): void {
    // this.getAllNews(); აქაც შეიძლება
  }

  newsServece = inject(NewsService);
  newsList: any = [];
}
