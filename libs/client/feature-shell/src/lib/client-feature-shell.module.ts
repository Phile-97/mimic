import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalContainerComponent } from './portal-container/portal-container.component';
import { AuthDataAccessModule } from '@mimic/auth/data-access';
import { UserProfileResolverService, UsersDataAccessModule } from '@mimic/users/data-access';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import '@cds/core/icon/register.js';
import { ClarityIcons, clockIcon, cogIcon, pasteIcon, pencilIcon, thumbsDownIcon, thumbsUpIcon, trashIcon, userIcon } from '@cds/core/icon';
import { AuthGuard } from './guards/auth.guard';
import { SharedUiModule } from '@mimic/shared/ui';
ClarityIcons.addIcons(pasteIcon,cogIcon,userIcon,thumbsDownIcon,thumbsUpIcon,pencilIcon,trashIcon,clockIcon);

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    SharedUiModule,
    AuthDataAccessModule,
    UsersDataAccessModule,
    RouterModule.forChild(
      [
        { 
          path: '',
          component: PortalContainerComponent,
          children: [
           { path: '', redirectTo: 'posts', pathMatch: 'full'},
           { path: 'posts',
            loadChildren: () => 
              import('@mimic/client/feature-posts').then(
                (module) => module.ClientFeaturePostsModule
              ),
           },
           {
            path: 'profile',
            canActivate: [AuthGuard],
            resolve: { userDetails: UserProfileResolverService },
            loadChildren: () =>
              import('@mimic/feature-profile').then(
                (module) => module.FeatureProfileModule
              ),
          },
          ]
        },
        {
          path: 'auth',
          loadChildren: () =>
            import('@mimic/client/feature-auth').then(
              (module) => module.ClientFeatureAuthModule
            ),
        },
        {
          path: '**',
          loadChildren: () =>
            import('@mimic/client/feature-page-not-found').then(
              (module) => module.ClientFeaturePageNotFoundModule
            ),
        },

      ]
    )
  ],
  declarations: [PortalContainerComponent],
})
export class ClientFeatureShellModule {}
