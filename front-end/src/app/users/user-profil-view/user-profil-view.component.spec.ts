import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserProfilViewComponent} from './user-profil-view.component';

describe('UserProfilViewComponent', () => {
  let component: UserProfilViewComponent;
  let fixture: ComponentFixture<UserProfilViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfilViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfilViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
