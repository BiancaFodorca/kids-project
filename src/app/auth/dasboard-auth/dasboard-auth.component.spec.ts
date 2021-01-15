import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DasboardAuthComponent } from './dasboard-auth.component';

describe('DasboardAuthComponent', () => {
  let component: DasboardAuthComponent;
  let fixture: ComponentFixture<DasboardAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DasboardAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DasboardAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
