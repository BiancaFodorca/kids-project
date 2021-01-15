import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDictionaryComponent } from './student-dictionary.component';

describe('StudentDictionaryComponent', () => {
  let component: StudentDictionaryComponent;
  let fixture: ComponentFixture<StudentDictionaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentDictionaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
