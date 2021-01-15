import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWordComponent } from './delete-word.component';

describe('DeleteWordComponent', () => {
  let component: DeleteWordComponent;
  let fixture: ComponentFixture<DeleteWordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteWordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
