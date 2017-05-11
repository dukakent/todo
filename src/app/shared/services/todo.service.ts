import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Todo } from '../models/todo.model';
import { StorageService } from './storage.service';

@Injectable()
export class TodoService {
  todos$: BehaviorSubject<Todo[]>;

  private todos: Todo[];
  private storageName = 'allTodos';

  constructor(private storage: StorageService) {
    this.todos = this.storage.pull<Todo[]>(this.storageName) || [];
    this.todos$ = new BehaviorSubject(this.todos);
  }

  addTodo(todoText: string) {
    this.todos.unshift(new Todo(todoText));
    this.update();
  }

  removeTodo(removingTodo: Todo) {
    const index = this.todos.indexOf(removingTodo);

    if (index >= 0) {
      this.todos.splice(index, 1);
      this.update();
    }
  }

  completeAll() {
    this.todos.forEach(todo => todo.completed = true);
    this.update();
  }

  uncompleteAll() {
    this.todos.forEach(todo => todo.completed = false);
    this.update();
  }

  toggleComplete(todo: Todo): void {
    if (this.todos.indexOf(todo) >= 0) {
      todo.completed = !todo.completed;
      this.update();
    }
  }

  private update(): void {
    this.todos$.next(this.todos);
    this.storage.push<Todo[]>(this.storageName, this.todos);
  }
}
