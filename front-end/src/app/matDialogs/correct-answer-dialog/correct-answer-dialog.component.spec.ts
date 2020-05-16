import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CorrectAnswerDialogComponent} from './correct-answer-dialog.component';

describe('CorrectAnswerDialogComponent', () => {
  let component: CorrectAnswerDialogComponent;
  let fixture: ComponentFixture<CorrectAnswerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CorrectAnswerDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectAnswerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
