import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OnEndingQuizComponent} from './on-ending-quiz.component';

describe('OnEndingQuizComponent', () => {
  let component: OnEndingQuizComponent;
  let fixture: ComponentFixture<OnEndingQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OnEndingQuizComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnEndingQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
