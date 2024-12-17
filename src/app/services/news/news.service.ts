import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  http = inject(HttpClient);

  baseApiUrl = 'https://localhost:7071/api/';

  allNews() {
    return this.http.get(`${this.baseApiUrl}News/allNews`);
  }

  newsById(id: string) {
    return this.http.get(`${this.baseApiUrl}News/newsById/${id}`);
  }

  deleteNews(id: string) {
    return this.http
      .delete(`${this.baseApiUrl}News/deleteNews/${id}`, {
        responseType: 'text',
      })
      .pipe(catchError(val => of(`მოხდა შეცდომა: ${val}`)));
  }
}
