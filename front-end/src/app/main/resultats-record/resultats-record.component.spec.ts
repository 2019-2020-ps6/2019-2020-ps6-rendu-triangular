import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ResultatsRecordComponent} from './resultats-record.component';

describe('ResultatsRecordComponent', () => {
  let component: ResultatsRecordComponent;
  let fixture: ComponentFixture<ResultatsRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResultatsRecordComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultatsRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
