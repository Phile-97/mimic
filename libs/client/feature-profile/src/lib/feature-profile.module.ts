import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { SharedUiModule } from '@mimic/shared/ui';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
import { UserProfileResolverService, UsersDataAccessModule } from '@mimic/users/data-access';
import { UsersUiModule } from '@mimic/users/ui';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    SharedUiModule,
    UsersUiModule,
    UsersDataAccessModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'details', pathMatch: 'full' },
      { 
        path: 'details', component: ProfileComponent,
        resolve: { userDetails: UserProfileResolverService },
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
