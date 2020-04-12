import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewListQuizComponent} from './view-list-quiz.component';

describe('ViewListQuizComponent', () => {
  let component: ViewListQuizComponent;
  let fixture: ComponentFixture<ViewListQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewListQuizComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewListQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
