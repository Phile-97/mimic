import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
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

  ngOnInit() {
    this.createRegistrationForm();
  }



  private createRegistrationForm() {
    this.registrationForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('',[Validators.required,Validators.email] ),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }



  onSubmit() {
    this.childSubmit.emit(this.registrationForm.value);
  }
}
