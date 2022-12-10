import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UsersChangePasswordFormModalComponent } from './users-change-password-form-modal.component';

describe('UsersChangePasswordFormModalComponent', () => {
  let component: UsersChangePasswordFormModalComponent;
  let fixture: ComponentFixture<UsersChangePasswordFormModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UsersChangePasswordFormModalComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersChangePasswordFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});