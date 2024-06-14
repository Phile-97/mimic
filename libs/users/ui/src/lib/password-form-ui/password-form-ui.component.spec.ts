import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordFormUiComponent } from './password-form-ui.component';

describe('PasswordFormUiComponent', () => {
  let component: PasswordFormUiComponent;
  let fixture: ComponentFixture<PasswordFormUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordFormUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordFormUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
