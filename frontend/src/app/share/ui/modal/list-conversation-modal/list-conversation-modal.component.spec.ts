import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConversationModalComponent } from './list-conversation-modal.component';

describe('ListConversationModalComponent', () => {
  let component: ListConversationModalComponent;
  let fixture: ComponentFixture<ListConversationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListConversationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListConversationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
