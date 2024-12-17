import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-employees-list',
  imports: [],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss'
})
export class EmployeesListComponent {
  constructor(
    private titleService: Title
  ) {
    titleService.setTitle('თანამშრომლების სია')
  }
}
