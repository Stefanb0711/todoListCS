import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-todo-element',
  standalone: false,

  templateUrl: './todo-element.component.html',
  styleUrl: './todo-element.component.css'
})
export class TodoElementComponent {

  @Input() content: string | undefined;
  @Input() date: number | undefined;
  @Input() id: string | undefined;

}
