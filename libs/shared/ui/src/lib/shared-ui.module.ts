import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionConfirmationFormComponent } from './action-confirmation-form/action-confirmation-form.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ActionConfirmationFormComponent],
  exports: [ActionConfirmationFormComponent],
})
export class SharedUiModule {}
