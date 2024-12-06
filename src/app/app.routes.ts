import { Routes } from '@angular/router';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsDetailsComponent } from './components/news-details/news-details.component';

export const routes: Routes = [
    { path: '', component: NewsListComponent },
    { path: 'newsdetails', component: NewsDetailsComponent },
];
