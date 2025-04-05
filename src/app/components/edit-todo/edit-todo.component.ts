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
  todoGoalDate?: string;
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
        this.todoGoalDate = this.todo.goalDate
          ? this.formatDateForInput(this.todo.goalDate)
          : undefined;
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  updateTodo(): void {
    if (this.todoTitle.trim() && this.todoId) {
      const goalDate = this.todoGoalDate
        ? new Date(this.todoGoalDate)
        : undefined;
      this.todoService.editTodo(
        this.todoId,
        this.todoTitle,
        this.todoDescription,
        goalDate,
      );
      this.router.navigate(['/']);
    }
  }

  private formatDateForInput(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
