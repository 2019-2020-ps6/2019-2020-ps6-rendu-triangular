import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LancementComponent } from './lancement.component';

describe('LancementComponent', () => {
  let component: LancementComponent;
  let fixture: ComponentFixture<LancementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LancementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LancementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
