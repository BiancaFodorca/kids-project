import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoBookSelectedComponent } from './no-book-selected.component';

describe('NoBookSelectedComponent', () => {
  let component: NoBookSelectedComponent;
  let fixture: ComponentFixture<NoBookSelectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoBookSelectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoBookSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
