import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { CoreModule } from '@mimic/core';
import { AuthDataAccessModule, AuthFeature } from '@mimic/auth/data-access';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import localeZw from '@angular/common/locales/en-ZW';
import { CommonModule, DatePipe, HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxSpinnerModule } from 'ngx-spinner';
registerLocaleData(localeZw);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ClarityModule,
    NgxSpinnerModule,
    CoreModule,
    AuthDataAccessModule,
    StoreModule.forRoot(
      { reducers: AuthFeature.authReducer },
      {
        metaReducers: AuthFeature.metaReducers,
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    //StoreDevtoolsModule.instrument({ logOnly: !environment.production }),
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () =>
            import('@mimic/client/feature-shell').then(
              (module) => module.ClientFeatureShellModule
            ),
        },
      ],
    )
  ],
  providers: [
    { provide: 'BaseUrl', useValue: environment.baseUrl},
    { provide: LOCALE_ID, useValue: 'en-ZW' },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
