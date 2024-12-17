import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  // ეს ფუნქციონალი გადავიტანე main.ts.ში
  providers: [
    // provideZoneChangeDetection({ eventCoalescing: true }), 
    // provideRouter(routes)
  ]
};
