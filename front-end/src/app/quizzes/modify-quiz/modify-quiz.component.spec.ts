import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyQuizComponent } from './modify-quiz.component';

describe('ModifyQuizComponent', () => {
  let component: ModifyQuizComponent;
  let fixture: ComponentFixture<ModifyQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
