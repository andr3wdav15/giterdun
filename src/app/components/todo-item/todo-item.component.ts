import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  isExpanded = false;

  constructor(
    public todoService: TodoService,
    private router: Router,
  ) {}

  toggleSelection(): void {
    this.todoService.toggleSelection(this.todo);
  }

  editTodo(event: MouseEvent): void {
    event.stopPropagation();
    this.router.navigate(['/edit', this.todo.id]);
  }

  toggleDetails(event: MouseEvent): void {
    event.stopPropagation();
    this.isExpanded = !this.isExpanded;
  }
}
