import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListUiComponent } from './users-list-ui/users-list-ui.component';
import { UserInformationFormComponent } from './user-information-form/user-information-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { SharedUiModule } from '@mimic/shared/ui';
import { PasswordFormUiComponent } from './password-form-ui/password-form-ui.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ClarityModule,
    SharedUiModule,
  ],
  declarations: [UsersListUiComponent, UserInformationFormComponent, PasswordFormUiComponent],
  exports: [UsersListUiComponent, UserInformationFormComponent, PasswordFormUiComponent],
})
export class UsersUiModule {}
