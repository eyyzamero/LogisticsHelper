import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LayoutSideMenuUserInfoComponent } from './layout-side-menu-user-info.component';

describe('LayoutSideMenuUserInfoComponent', () => {
  let component: LayoutSideMenuUserInfoComponent;
  let fixture: ComponentFixture<LayoutSideMenuUserInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutSideMenuUserInfoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutSideMenuUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
