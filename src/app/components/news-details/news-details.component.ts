import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NewsService } from '../../services/news/news.service';
import { ButtonComponent } from '../button/button.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-news-details',
  imports: [DatePipe, ButtonComponent, LoadingSpinnerComponent],
  templateUrl: './news-details.component.html',
  styleUrl: './news-details.component.scss',
})
export class NewsDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private router: Router,
    private toastr: ToastrService
  ) {}

  id: WritableSignal<string> = signal('');
  author: WritableSignal<string> = signal('');
  title: WritableSignal<string> = signal('');
  content: WritableSignal<string> = signal('');
  date: WritableSignal<string> = signal('');

  edit = 'რედაქტირება';
  delete = 'წაშლა';

  buttonType: string = 'button';

  newsServece = inject(NewsService);
  newsDetails: any;
  isLoading: WritableSignal<boolean> = signal(false);
  creationDate: string | undefined;

  ngOnInit(): void {
    this.id.set(this.route.snapshot.paramMap.get('id')!);
    this.author.set(this.route.snapshot.paramMap.get('author')!);
    this.title.set(this.route.snapshot.paramMap.get('title')!);
    this.content.set(this.route.snapshot.paramMap.get('content')!);
    this.date.set(this.route.snapshot.paramMap.get('date')!);

    this.titleService.setTitle(`${this.title()}`);
  }

  // deleteNews = () => {
  //   this.isLoading.set(true);
  //   // // სატესტო ვერსია setTimeout-ით დაყოვნებით
  //   setTimeout(() => {
  //     this.newsServece.deleteNews(this.id()).subscribe((val) => {
  //       console.log('NewsDetailsComponent news delete response is:', val)
  //       this.isLoading.set(false)
  //       this.router.navigate([''])
  //       this.toastr.success('სიახლე წარმატებით წაიშალა!')
  //     }
  //     // , () => {
  //     //   this.toastr.error('სიახლის წაშლისას მოხდა შეცდომა!');
  //     // }
  //   );
  //   }, 1500);
  // };

  deleteNews = () => {
    this.isLoading.set(true);
    // // სატესტო ვერსია setTimeout-ით დაყოვნებით
    setTimeout(() => {
      this.newsServece.deleteNews(this.id()).subscribe({
        next: (val) => {
          console.log('NewsDetailsComponent news delete response is:', val);
          if(!val.includes('შეცდომა')) {
            this.isLoading.set(false);
            this.router.navigate(['']);
            this.toastr.success('სიახლე წარმატებით წაიშალა!');
          }
          else {
            this.toastr.error('სიახლის წაშლისას მოხდა შეცდომა!');
            this.isLoading.set(false);
            this.router.navigate(['']);
          }
        },
        error: () => {
          console.log('შეცდომა')
          this.toastr.error('შეცდომა');
        },
      });
    }, 1500);
  };

  editFunctionCall(event: any) {
    console.log('editFunctioncall', event);
    console.log('ეს არის ოპერაცია', event.target.innerText);
    console.log('ID არის ', this.id());
    this.router.navigate(['editnews', this.id(), this.title(), this.author(), this.content(), this.date()]);
  }
  deleteFunctionCall(event: any) {
    console.log('deleteFunctioncall', event);
    console.log('ეს არის ოპერაცია', event.target.innerText);
    console.log('ID არის ', this.id());
    this.deleteNews();
  }
}
