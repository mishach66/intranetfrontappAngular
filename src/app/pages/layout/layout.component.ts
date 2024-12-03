import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { NewsComponent } from "../../components/news/news.component";
import { GreetingCardComponent } from "../../components/greeting-card/greeting-card.component";
import { NewsService } from '../../services/news/news.service'



@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, NewsComponent, GreetingCardComponent, JsonPipe],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})



export class LayoutComponent {
  constructor() {
    this.newsServece.allNews()
    .subscribe(val => {
      this.newsList = val
    })
  }

  newsServece = inject(NewsService)
  newsList: any = []
}
