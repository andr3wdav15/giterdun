import { Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { EditTodoComponent } from './components/edit-todo/edit-todo.component';

// app routes
export const routes: Routes = [
  { path: '', component: TodoListComponent },
  { path: 'add', component: AddTodoComponent },
  { path: 'edit/:id', component: EditTodoComponent },
  { path: '**', redirectTo: '' },
];
