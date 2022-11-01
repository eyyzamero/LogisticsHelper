import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LayoutToolbarLogoComponent } from './layout-toolbar-logo.component';

describe('LayoutToolbarLogoComponent', () => {
  let component: LayoutToolbarLogoComponent;
  let fixture: ComponentFixture<LayoutToolbarLogoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutToolbarLogoComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutToolbarLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});