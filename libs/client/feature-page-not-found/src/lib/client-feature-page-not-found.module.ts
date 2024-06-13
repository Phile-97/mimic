import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedUiModule } from '@mimic/shared/ui';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SharedUiModule,
    RouterModule.forChild([
      { path: '**', component: PageNotFoundComponent}
    ])
  ],
  declarations: [PageNotFoundComponent],
})
export class ClientFeaturePageNotFoundModule {}
