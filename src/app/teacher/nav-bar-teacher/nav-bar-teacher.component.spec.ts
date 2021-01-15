import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarTeacherComponent } from './nav-bar-teacher.component';

describe('NavBarTeacherComponent', () => {
  let component: NavBarTeacherComponent;
  let fixture: ComponentFixture<NavBarTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBarTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
