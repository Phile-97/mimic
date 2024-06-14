import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionConfirmationFormComponent } from './action-confirmation-form/action-confirmation-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ClarityModule
  ],
  declarations: [ActionConfirmationFormComponent],
  exports: [ActionConfirmationFormComponent],
})
export class SharedUiModule {}
