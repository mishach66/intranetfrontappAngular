import {
  Component,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { GreetingCardComponent } from '../../components/greeting-card/greeting-card.component';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [
    HeaderComponent,
    FooterComponent,
    GreetingCardComponent,
    JsonPipe,
    RouterOutlet,
    RouterLink,
],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent { }
