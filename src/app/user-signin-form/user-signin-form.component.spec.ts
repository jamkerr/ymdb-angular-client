import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSignInFormComponent } from './user-signin-form.component';

describe('UserSignInFormComponent', () => {
  let component: UserSignInFormComponent;
  let fixture: ComponentFixture<UserSignInFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSignInFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSignInFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
