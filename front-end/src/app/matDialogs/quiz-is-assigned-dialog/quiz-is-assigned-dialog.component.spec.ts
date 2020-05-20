import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QuizIsAssignedDialogComponent} from './quiz-is-assigned-dialog.component';

describe('QuizIsAssignedDialogComponent', () => {
  let component: QuizIsAssignedDialogComponent;
  let fixture: ComponentFixture<QuizIsAssignedDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuizIsAssignedDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizIsAssignedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
