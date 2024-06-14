import { Location } from '@angular/common';
import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthFacade } from '@mimic/auth/data-access';
import { UserDataService } from '@mimic/users/data-access';
import { Subject } from 'rxjs';

@Component({
  selector: 'lib-portal-container',
  templateUrl: './portal-container.component.html',
  styleUrl: './portal-container.component.scss',
})
export class PortalContainerComponent implements OnInit {
  public showTitle = true;
  public isLoggedIn = false;
  public showLoginDialog = false;
  opened = false;

  constructor(
    public authFacade: AuthFacade,
    public userDataService: UserDataService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
  ) {}



  ngOnInit(): void {
    if (!localStorage.getItem('accessToken')) {
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
    }
  }



  goToPage(){
    if(this.isLoggedIn){
      this.router.navigate(['../posts/create']);
    }else{
      this.showLoginDialog = true;
    }
  }

  goToLoginPage(){
    this.router.navigate(['../auth/login']);
  }

}

