import { Component, OnInit } from '@angular/core';
import { UsersEntity, UserDataService, UsersFacade } from '@mimic/users/data-access';
import { UsersService } from '@mimic/users/data-access';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'lib-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  public isUpdatePassword = false;
  public user!: UsersEntity;

  constructor(
    public userDataService: UserDataService,
    public usersFacade: UsersFacade,
    private usersService: UsersService,
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
    
  }

  async getUserDetails(){
    this.user =  await firstValueFrom(this.usersService.getUserProfile(localStorage.getItem('username')!))
  }

  public updatePassword(request: any) {
    this.usersFacade.updateUser(request);
    this.usersFacade.loaded$.subscribe((res) => {
      if (res) this.isUpdatePassword = false;
    });
  }
}
