import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssignmentsFormAddTcsModalComponent } from './assignments-form-add-tcs-modal.component';

describe('AssignmentsFormAddTcsModalComponent', () => {
  let component: AssignmentsFormAddTcsModalComponent;
  let fixture: ComponentFixture<AssignmentsFormAddTcsModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AssignmentsFormAddTcsModalComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssignmentsFormAddTcsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});