import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { Utilities } from '@mimic/shared/utils';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'lib-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent implements OnInit {
  @Input() errorMessage!: Error;
  @Input() btnState$!: ClrLoadingState | null;
  @Output() childSubmit: EventEmitter<any> = new EventEmitter<any>();
  public registrationForm!: FormGroup;
  public showGuidelines = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createRegistrationForm();
  }



  private createRegistrationForm() {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['',[Validators.required,Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    { validator: Utilities.passwordMatchValidator }
    );
  }


  get passwordControl() {
    return this.registrationForm?.get('password');
  }

  onPasswordChange(flag: boolean){
    this.registrationForm.get('password')!.updateValueAndValidity;
    this.showGuidelines = flag;
    this.registrationForm.get('password')!.valid ? this.showGuidelines = false : null
    
  }


  onSubmit() {
    this.childSubmit.emit(this.registrationForm.value);
  }
}
