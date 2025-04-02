import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

// todo service
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = [];
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  private readonly STORAGE_KEY = 'todos';

  // constructor
  constructor() { 
    this.loadTodos();
  }

  // load todos from localStorage
  private loadTodos(): void {
    const storedTodos = localStorage.getItem(this.STORAGE_KEY);
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
      this.todosSubject.next([...this.todos]);
    }
  }

  // save todos to localStorage
  private saveTodos(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.todos));
    this.todosSubject.next([...this.todos]);
  }


  // get all todos as an observable collection
  getTodos(): Observable<Todo[]> {
    return this.todosSubject.asObservable();
  }

  // add a new todo
  addTodo(title: string, description: string = ''): void {
    const newTodo: Todo = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      completed: false
    };
    
    this.todos.push(newTodo);
    this.saveTodos();
  }

  // toggle the completion state of a todo
  toggleComplete(id: number): void {
    const todoIndex = this.todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
      this.todos[todoIndex].completed = !this.todos[todoIndex].completed;
      this.saveTodos();
    }
  }

  // delete a todo
  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveTodos();
  }

  // edit a todo's title and description
  editTodo(id: number, newTitle: string, newDescription: string = ''): void {
    const todoIndex = this.todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
      this.todos[todoIndex].title = newTitle.trim();
      this.todos[todoIndex].description = newDescription.trim();
      this.saveTodos();
    }
  }

  // get a specific todo by id
  getTodoById(id: number): Todo | undefined {
    return this.todos.find(todo => todo.id === id);
  }
}
