import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DescriptionAccueilComponent} from './description-accueil.component';

describe('DescriptionAccueilComponent', () => {
  let component: DescriptionAccueilComponent;
  let fixture: ComponentFixture<DescriptionAccueilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DescriptionAccueilComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
