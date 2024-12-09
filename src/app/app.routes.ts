import { Routes } from '@angular/router';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsDetailsComponent } from './components/news-details/news-details.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { NotFoundComponent } from './components/not-found/not-found/not-found.component';

export const routes: Routes = [

    // // Lazy loading example
    // { path: 'newslist', loadComponent: () => 
    //     import('./components/news-list/news-list.component').then((n) => n.NewsListComponent),
    // },
    
    { path: 'newslist', component: NewsListComponent },
    { path: '', redirectTo: 'newslist', pathMatch: 'full' },
    { path: 'newsbyid/:id', component: NewsDetailsComponent },
    { path: 'employeeslist', component: EmployeesListComponent },

    { path: '**', component: NotFoundComponent },
];
