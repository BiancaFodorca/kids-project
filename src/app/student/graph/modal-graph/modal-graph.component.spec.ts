import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGraphComponent } from './modal-graph.component';

describe('ModalGraphComponent', () => {
  let component: ModalGraphComponent;
  let fixture: ComponentFixture<ModalGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
