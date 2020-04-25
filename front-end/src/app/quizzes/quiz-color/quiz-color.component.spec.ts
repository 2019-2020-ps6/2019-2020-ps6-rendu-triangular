import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QuizColorComponent} from './quiz-color.component';

describe('QuizColorComponent', () => {
  let component: QuizColorComponent;
  let fixture: ComponentFixture<QuizColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuizColorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
