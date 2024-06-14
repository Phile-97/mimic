import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { Observable } from 'rxjs';
import { CustomValidators } from '../custom-validators';
import { UsersEntity } from '@mimic/users/data-access';

@Component({
  selector: 'lib-password-form-ui',
  templateUrl: './password-form-ui.component.html',
  styleUrl: './password-form-ui.component.scss'
})
export class PasswordFormUiComponent implements OnInit {
  @Input() user!: UsersEntity | null;
  @Input() btnState$!: Observable<ClrLoadingState>;
  @Output() formValue = new EventEmitter();
  @Output() closeModal = new EventEmitter();
  public passwordForm!: FormGroup;
  public opened = true;
  public showGuidelines = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createUserForm();
    if (this.user) {
      this.passwordForm.patchValue(this.user);
    }
  }

  private createUserForm() {
    return (this.passwordForm = this.formBuilder.group(
      {
        password: ['', Validators.required],
        confirmPassword: [
          '',
          [
            Validators.required,
          ],
        ],
        email: ['', [Validators.required,Validators.email]],
        username: ['', Validators.required],
      },
      { validator: CustomValidators.passwordMatchValidator }
    ));
  }

  get passwordControl() {
    return this.passwordForm?.get('password');
  }

  onPasswordChange(flag: boolean){
    this.passwordForm.get('password')!.updateValueAndValidity;
    this.showGuidelines = flag;
    this.passwordForm.get('password')!.valid ? this.showGuidelines = false : null
    
  }


}
