import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  showInfoModal = false;

  constructor(
    private todoService: TodoService,
    private router: Router,
  ) {}

  toggleComplete(): void {
    this.todoService.toggleComplete(this.todo.id);
  }

  deleteTodo(): void {
    this.todoService.deleteTodo(this.todo.id);
  }

  editTodo(): void {
    this.router.navigate(['/edit', this.todo.id]);
  }

  openInfoModal(): void {
    this.showInfoModal = true;
  }

  closeInfoModal(): void {
    this.showInfoModal = false;
  }
}
