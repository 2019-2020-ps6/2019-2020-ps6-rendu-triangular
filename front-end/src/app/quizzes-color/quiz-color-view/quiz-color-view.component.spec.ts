import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QuizColorViewComponent} from './quiz-color-view.component';

describe('QuizColorViewComponent', () => {
  let component: QuizColorViewComponent;
  let fixture: ComponentFixture<QuizColorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuizColorViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizColorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
