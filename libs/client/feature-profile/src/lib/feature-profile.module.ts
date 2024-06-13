import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { SharedUiModule } from '@mimic/shared/ui';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    SharedUiModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'details', pathMatch: 'full' },
      { 
        path: 'details', component: ProfileComponent,
        //resolve: { userDetails: UserProfileResolverService },
        children: [
          { path: '', redirectTo: 'my-account', pathMatch: 'full' },
          { path: 'my-account', component: ProfileComponent, },

        ]
       },
    ]),
  ],
  declarations: [ProfileComponent],
})
export class FeatureProfileModule {}
