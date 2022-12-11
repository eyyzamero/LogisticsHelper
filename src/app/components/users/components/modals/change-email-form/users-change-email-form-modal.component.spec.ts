import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UsersChangeEmailFormModalComponent } from './users-change-email-form-modal.component';

describe('UsersChangeEmailFormModalComponent', () => {
  let component: UsersChangeEmailFormModalComponent;
  let fixture: ComponentFixture<UsersChangeEmailFormModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UsersChangeEmailFormModalComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersChangeEmailFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});