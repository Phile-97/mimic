import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  declarations: [LoginFormComponent, RegisterFormComponent],
  exports: [LoginFormComponent, RegisterFormComponent],
})
export class AuthUiModule {}
