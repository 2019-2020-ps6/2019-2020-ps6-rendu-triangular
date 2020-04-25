import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LancementQuizColorComponent} from './lancement-quiz-color.component';

describe('LancementQuizColorComponent', () => {
  let component: LancementQuizColorComponent;
  let fixture: ComponentFixture<LancementQuizColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LancementQuizColorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LancementQuizColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
