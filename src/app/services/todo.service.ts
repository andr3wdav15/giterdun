import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: Todo[] = [];
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  private readonly STORAGE_KEY = 'todos';

  constructor() {
    this.loadTodos();
  }

  private loadTodos(): void {
    const storedTodos = localStorage.getItem(this.STORAGE_KEY);
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
      this.todos.forEach((todo) => (todo.isSelected = !!todo.isSelected));
    } else {
      this.todos = [];
    }
    this.todosSubject.next([...this.todos]);
  }

  private saveTodos(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.todos));
    this.todosSubject.next([...this.todos]);
  }

  getTodos(): Observable<Todo[]> {
    return this.todosSubject.asObservable();
  }

  addTodo(title: string, description: string = '', goalDate?: Date): void {
    const newId =
      this.todos.length > 0 ? Math.max(...this.todos.map((t) => t.id)) + 1 : 1;

    const newTodo: Todo = {
      id: newId,
      title: title.trim(),
      description: description.trim(),
      goalDate: goalDate,
      isSelected: false,
    };

    this.todos.push(newTodo);
    this.saveTodos();
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.saveTodos();
  }

  deleteSelectedTodos(): void {
    const initialLength = this.todos.length;
    this.todos = this.todos.filter((todo) => !todo.isSelected);
    if (this.todos.length < initialLength) {
      this.saveTodos();
    }
  }

  editTodo(
    id: number,
    newTitle: string,
    newDescription: string = '',
    newGoalDate?: Date,
  ): void {
    const todo = this.getTodoById(id);

    if (todo) {
      todo.title = newTitle.trim();
      todo.description = newDescription.trim();
      todo.goalDate = newGoalDate;
      this.saveTodos();
    }
  }

  getTodoById(id: number): Todo | undefined {
    return this.todos.find((todo) => todo.id === id);
  }

  toggleSelection(todoToToggle: Todo): void {
    const todoIndex = this.todos.findIndex(
      (todo) => todo.id === todoToToggle.id,
    );
    if (todoIndex !== -1) {
      this.todos[todoIndex].isSelected = !this.todos[todoIndex].isSelected;
      this.saveTodos();
    }
  }

  hasSelectedTodos(): boolean {
    return this.todos.some((todo) => todo.isSelected);
  }

  getSelectedCount(): number {
    return this.todos.filter((todo) => todo.isSelected).length;
  }
}
