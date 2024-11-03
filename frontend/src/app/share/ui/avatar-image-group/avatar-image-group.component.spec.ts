import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarImageGroupComponent } from './avatar-image-group.component';

describe('AvatarImageGroupComponent', () => {
  let component: AvatarImageGroupComponent;
  let fixture: ComponentFixture<AvatarImageGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvatarImageGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarImageGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
