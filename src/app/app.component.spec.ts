import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { ItemComponent } from './item/item.component';
import { TodoService } from './shared/services/todo.service';
import { StorageService } from './shared/services/storage.service';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TodosComponent,
        ItemComponent
      ],
      providers: [
        TodoService,
        StorageService
      ],
      imports: [
        FormsModule
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  }));
});
