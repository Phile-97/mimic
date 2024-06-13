import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { Utilities } from '@mimic/shared/utils';

@Component({
  selector: 'lib-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit {
  @Input() errorMessage!: Error;
  @Input() btnState$!: any;
  @Output() childSubmit: EventEmitter<any> = new EventEmitter<any>();
  public loginForm!: FormGroup;
  
  ngOnInit() {
    this.createLoginForm();
  }



  private createLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      grant_type: new FormControl(''),
      scope: new FormControl(''),
      client_id: new FormControl(''),
      client_secret: new FormControl(''),
    });
  }

  onSubmit() {
    if(this.loginForm.valid)
    {
      localStorage.setItem('username',this.loginForm.get('username')!.value)
      this.childSubmit.emit(this.loginForm.value);
    }else {
      Utilities.displayToast('info','Fill in all fields!');
    }
    
  }
}
