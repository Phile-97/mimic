import { Component } from '@angular/core';
import { AuthEntity, AuthFacade } from '@mimic/auth/data-access';

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public btnState$ = this.authFacade.authBtnState$;
  constructor(private authFacade: AuthFacade) {}


  login(request: AuthEntity) {
    this.authFacade.login(request);
  }
}
