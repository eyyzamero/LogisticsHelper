import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssignmentsFormAddPalletModalComponent } from './assignments-form-add-pallet-modal.component';

describe('AssignmentsFormAddPalletModalComponent', () => {
  let component: AssignmentsFormAddPalletModalComponent;
  let fixture: ComponentFixture<AssignmentsFormAddPalletModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentsFormAddPalletModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssignmentsFormAddPalletModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
