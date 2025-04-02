import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-edit-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-todo.component.html',
  styleUrl: './edit-todo.component.scss',
})
export class EditTodoComponent implements OnInit {
  todoId!: number;
  todoTitle: string = '';
  todoDescription: string = '';
  todo: Todo | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.todoId = +id;
      this.todo = this.todoService.getTodoById(this.todoId);

      if (this.todo) {
        this.todoTitle = this.todo.title;
        this.todoDescription = this.todo.description || '';
      } else {
        // Redirect if todo not found
        this.router.navigate(['/']);
      }
    }
  }

  updateTodo(): void {
    if (this.todoTitle.trim() && this.todoId) {
      // Update the todo with new title and description
      this.todoService.editTodo(
        this.todoId,
        this.todoTitle,
        this.todoDescription,
      );
      this.router.navigate(['/']);
    }
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
