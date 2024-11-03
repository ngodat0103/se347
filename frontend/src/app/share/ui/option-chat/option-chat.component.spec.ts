import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionChatComponent } from './option-chat.component';

describe('OptionChatComponent', () => {
  let component: OptionChatComponent;
  let fixture: ComponentFixture<OptionChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
