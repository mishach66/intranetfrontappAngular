import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of, filter } from 'rxjs';
import { catchError } from 'rxjs/operators';
 
import { NewsService } from '../news.service';
 
@Injectable({
  providedIn: 'root'
})
export class NewsResolverService implements Resolve<any> {
  constructor(private newsService: NewsService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    console.log('Called Get All News in resolver...', route);
    let r = this.newsService.allNews()
    // .pipe(
    //   catchError(error => {
    //     return of('No data');
    //   })
    // )
    ;
    return r;
  }
}
