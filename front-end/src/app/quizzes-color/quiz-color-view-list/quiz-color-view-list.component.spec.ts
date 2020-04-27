import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QuizColorViewListComponent} from './quiz-color-view-list.component';

describe('QuizColorViewListComponent', () => {
  let component: QuizColorViewListComponent;
  let fixture: ComponentFixture<QuizColorViewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuizColorViewListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizColorViewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
