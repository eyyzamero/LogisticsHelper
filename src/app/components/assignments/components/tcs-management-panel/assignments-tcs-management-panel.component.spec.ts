import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssignmentsTcsManagementPanelComponent } from './assignments-tcs-management-panel.component';

describe('AssignmentsTcsManagementPanelComponent', () => {
  let component: AssignmentsTcsManagementPanelComponent;
  let fixture: ComponentFixture<AssignmentsTcsManagementPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentsTcsManagementPanelComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssignmentsTcsManagementPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
