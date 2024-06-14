import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { UserDataService, UsersEntity, UsersFacade } from '@mimic/users/data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'lib-user-information-form',
  templateUrl: './user-information-form.component.html',
  styleUrl: './user-information-form.component.scss',
})
export class UserInformationFormComponent implements OnInit {
  @Input() user!: UsersEntity | null;
  @Input() btnState$!: Observable<ClrLoadingState>;
  @Output() formValue = new EventEmitter();
  @Output() updatePassword = new EventEmitter();
  public userForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
    if (this.user) {
      this.userForm.patchValue(this.user);
    }
  }

  public createForm() {
    this.userForm = this.formBuilder.group({
      email: ['',Validators.required],
      password: '',
      username: ['',Validators.required],
      id: '',
    });
  }
}
