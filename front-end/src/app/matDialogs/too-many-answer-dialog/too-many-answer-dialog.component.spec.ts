import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TooManyAnswerDialogComponent} from './too-many-answer-dialog.component';

describe('TooManyAnswerDialogComponent', () => {
  let component: TooManyAnswerDialogComponent;
  let fixture: ComponentFixture<TooManyAnswerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TooManyAnswerDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TooManyAnswerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
