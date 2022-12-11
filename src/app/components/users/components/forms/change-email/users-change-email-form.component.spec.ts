import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UsersChangeEmailFormComponent } from './users-change-email-form.component';

describe('UsersChangeEmailFormComponent', () => {
  let component: UsersChangeEmailFormComponent;
  let fixture: ComponentFixture<UsersChangeEmailFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersChangeEmailFormComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersChangeEmailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
