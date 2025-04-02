import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss'
})
export class AddTodoComponent {
  newTodoTitle: string = '';
  newTodoDescription: string = '';

  constructor(private todoService: TodoService, private router: Router) {}

  addTodo(): void {
    if (this.newTodoTitle.trim()) {
      this.todoService.addTodo(this.newTodoTitle, this.newTodoDescription);
      this.newTodoTitle = '';
      this.newTodoDescription = '';
      this.router.navigate(['/']);
    }
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
