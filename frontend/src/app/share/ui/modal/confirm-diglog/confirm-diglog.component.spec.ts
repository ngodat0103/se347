import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDiglogComponent } from './confirm-diglog.component';

describe('ConfirmDiglogComponent', () => {
  let component: ConfirmDiglogComponent;
  let fixture: ComponentFixture<ConfirmDiglogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDiglogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDiglogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
