import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthUiModule } from '@mimic/auth/ui';
import { AuthDataAccessModule } from '@mimic/auth/data-access';
import { UsersDataAccessModule } from '@mimic/users/data-access';
import { UsersUiModule } from '@mimic/users/ui';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    AuthUiModule,
    AuthDataAccessModule,
    UsersDataAccessModule,
    UsersUiModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent},
      { path: 'register', component: RegisterComponent}
    ])
  ],
  declarations: [LoginComponent, RegisterComponent],
})
export class ClientFeatureAuthModule {}
