import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QuizColorFormComponent} from './quiz-color-form.component';

describe('QuizColorFormComponent', () => {
  let component: QuizColorFormComponent;
  let fixture: ComponentFixture<QuizColorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuizColorFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizColorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
