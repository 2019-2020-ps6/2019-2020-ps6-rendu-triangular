import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QuizColorListComponent} from './quiz-color-list.component';

describe('QuizColorListComponent', () => {
  let component: QuizColorListComponent;
  let fixture: ComponentFixture<QuizColorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuizColorListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizColorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
