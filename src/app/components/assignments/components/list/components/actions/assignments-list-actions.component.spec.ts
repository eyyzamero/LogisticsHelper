import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssignmentsListActionsComponent } from './assignments-list-actions.component';

describe('AssignmentsListActionsComponent', () => {
  let component: AssignmentsListActionsComponent;
  let fixture: ComponentFixture<AssignmentsListActionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AssignmentsListActionsComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssignmentsListActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});