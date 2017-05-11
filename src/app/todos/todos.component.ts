import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Todo } from '../shared/models/todo.model';
import { TodoService } from '../shared/services/todo.service';

@Component({
  selector: 'todo-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent {
  newTodoInput: string;
  inputPlaceholder = 'What needs to be done?';
  todosToShow$: BehaviorSubject<Todo[]>;

  private allTodos$: BehaviorSubject<Todo[]>;
  private activeTodos$: BehaviorSubject<Todo[]>;
  private completedTodos$: BehaviorSubject<Todo[]>;

  constructor(private todoService: TodoService) {
    this.allTodos$ = this.todoService.todos$;
    this.activeTodos$ = new BehaviorSubject([]);
    this.completedTodos$ = new BehaviorSubject([]);
    this.todosToShow$ = new BehaviorSubject([]);

    this.allTodos$.subscribe((todos: Todo[]) => {
      const activeTodos = todos.filter((todo: Todo) => !todo.completed);
      const completedTodos = todos.filter((todo: Todo) => todo.completed);
      this.activeTodos$.next(activeTodos);
      this.completedTodos$.next(completedTodos);
    });

    this.todosToShow$ = this.allTodos$;
  }

  create(): void {
    if (this.newTodoInput && this.newTodoInput.length) {
      this.todoService.addTodo(this.newTodoInput);
      this.newTodoInput = '';
    }
  }

  removeTodo(removingTodo: Todo): void {
    this.todoService.removeTodo(removingTodo);
  }

  toggleCompletedAll(): void {
    if (!this.numberOfTodosLeft()) {
      this.todoService.uncompleteAll();
    } else {
      this.todoService.completeAll();
    }
  }

  toggleCompleteTodo(todo: Todo) {
    this.todoService.toggleComplete(todo);
  }

  numberOfTodosLeft(): number {
    return this.activeTodos$.getValue().length;
  }

  showAll() {
    this.todosToShow$ = this.allTodos$;
  }

  showActive() {
    this.todosToShow$ = this.activeTodos$;
  }

  showCompleted() {
    this.todosToShow$ = this.completedTodos$;
  }
}
