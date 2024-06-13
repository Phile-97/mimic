import { Component } from '@angular/core';
import { AuthFacade } from '@mimic/auth/data-access';
import { RegisterUserContext, UsersFacade } from '@mimic/users/data-access';

@Component({
  selector: 'lib-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  public btnState$ = this.usersFacade.btnState$;
  constructor(public usersFacade: UsersFacade) {}


  submit(request: RegisterUserContext) {
    console.log("Register Request: ",request);
    this.usersFacade.registerUser(request);
  }
}
