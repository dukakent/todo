import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Todo } from '../shared/models/todo.model';

@Component({
  selector: 'todo-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() remove = new EventEmitter<null>();
  @Output() toggleComplete = new EventEmitter<null>();

  editInput: string;

  ngOnInit() {
    this.editInput = this.todo.text;
  }

  edit() {
    if (this.editInput.length) {
      this.todo.text = this.editInput;
    } else {
      this.editInput = this.todo.text;
    }
  }

  onRemove() {
    this.remove.emit();
  }

  onToggleComplete() {
    this.toggleComplete.emit();
  }
}
