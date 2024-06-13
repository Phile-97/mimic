import { Location } from '@angular/common';
import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthFacade } from '@mimic/auth/data-access';
import { UserDataService } from '@mimic/users/data-access';
import { Subject } from 'rxjs';

@Component({
  selector: 'lib-portal-container',
  templateUrl: './portal-container.component.html',
  styleUrl: './portal-container.component.scss',
})
export class PortalContainerComponent implements OnInit, AfterViewChecked {
  public showTitle = true;
  public isLoggedIn = false;
  opened = false;

  constructor(
    public authFacade: AuthFacade,
    public userDataService: UserDataService,
    private location: Location,
  ) {}



  ngOnInit(): void {
    console.log('local')
    if (!localStorage.getItem('accessToken')) {
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
    }
  }

  ngAfterViewChecked(): void {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice(1);
    if (
      titlee === '/posts' ||
      titlee === '/about' ||
      titlee === '/pricing' ||
      titlee === '/contact-us'
    ) {
      this.showTitle = true;
    } else {
      this.showTitle = false;
    }
  }

}

