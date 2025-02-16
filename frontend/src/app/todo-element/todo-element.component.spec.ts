import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoElementComponent } from './todo-element.component';

describe('TodoElementComponent', () => {
  let component: TodoElementComponent;
  let fixture: ComponentFixture<TodoElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoElementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
