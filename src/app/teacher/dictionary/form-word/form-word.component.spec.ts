import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWordComponent } from './form-word.component';

describe('FormWordComponent', () => {
  let component: FormWordComponent;
  let fixture: ComponentFixture<FormWordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormWordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
