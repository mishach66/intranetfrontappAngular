import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of, filter } from 'rxjs';
import { catchError } from 'rxjs/operators';
 
import { NewsService } from '../news.service';
 
@Injectable({
  providedIn: 'root'
})
export class NewsDetailsResolverService implements Resolve<any> {
  constructor() {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    console.log('Called Get All News in resolver...', route);
    let r = route.params
    
    // .pipe(
    //   catchError(error => {
    //     return of('No data');
    //   })
    // )
    ;
    
    
    return r;
  }
}
