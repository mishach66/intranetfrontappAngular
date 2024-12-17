import {
  Component,
  inject,
  input,
  InputSignal,
  output,
  signal,
  WritableSignal,
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { RouterLink, Router, Route } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DatePipe } from '@angular/common';
import { NewsService } from '../../services/news/news.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-news',
  imports: [ButtonComponent, RouterLink, MatTooltipModule, DatePipe],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
})
export class NewsComponent {
  constructor(private router: Router, private toastr: ToastrService) {}

  newsServece = inject(NewsService);
  editLabel = 'რედაქტირება';
  deleteLabel = 'წაშლა';

  id: InputSignal<string | undefined> = input.required();
  title: InputSignal<string | undefined> = input.required();
  author: InputSignal<string | undefined> = input.required();
  content: InputSignal<string | undefined> = input.required();
  date: InputSignal<string | undefined> = input.required();

  isLoading: WritableSignal<boolean> = signal(false);

  deleteNewsEvent = output()

  // deleteNews = () => {
  //   this.isLoading.set(true);
  //   // // სატესტო ვერსია setTimeout-ით დაყოვნებით
  //   setTimeout(() => {
  //     this.newsServece.deleteNews(this.id()!).subscribe((val) => {
  //       console.log('NewsComponent news delete response is:', val);
  //       this.isLoading.set(false);
  //       this.router.navigate([''])
  //       this.toastr.success('სიახლე წარმატებით წაიშალა!');
  //       //this.reloadPage()
  //     });
  //   }, 1500);
  // };

  deleteNews = () => {
    this.isLoading.set(true);
    // // სატესტო ვერსია setTimeout-ით დაყოვნებით
    // setTimeout(() => {
    //   this.newsServece.deleteNews(this.id()!).subscribe({
    //     next: (val) => {
    //       console.log('NewsDetailsComponent news delete response is:', val);
    //       if (!val.includes('შეცდომა')) {
    //         this.isLoading.set(false);
    //         this.deleteNewsEvent.emit()
    //         this.toastr.success('სიახლე წარმატებით წაიშალა!');
    //       } else {
    //         this.toastr.error('სიახლის წაშლისას მოხდა შეცდომა!');
    //       }
    //     },
    //     error: () => {
    //       console.log('შეცდომა');
    //       this.toastr.error('შეცდომა');
    //     },
    //   });
    // }, 1500);

    this.newsServece.deleteNews(this.id()!).subscribe({
      next: (val) => {
        console.log('NewsDetailsComponent news delete response is:', val);
        if (!val.includes('შეცდომა')) {
          this.isLoading.set(false);
          this.deleteNewsEvent.emit()
          this.toastr.success('სიახლე წარმატებით წაიშალა!');
        } else {
          this.toastr.error('სიახლის წაშლისას მოხდა შეცდომა!');
        }
      },
      error: () => {
        console.log('შეცდომა');
        this.toastr.error('შეცდომა');
      },
    });
  };

  editFunctioncall(event: any) {
    console.log('editFunctioncall', event);
    console.log('ეს არის ოპერაცია', event.target.innerText);
  }
  deleteFunctioncall(event: any) {
    console.log('deleteFunctioncall', event);
    console.log('ეს არის ოპერაცია', event.target.innerText);
    console.log('ID არის ', this.id());
    this.deleteNews();
  }

  reloadPage() {
    window.location.reload();
  }
}
