import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'mimic';
  typeSelected: string;
  

  constructor(
    private router: Router,
    private spinnerService: NgxSpinnerService
    ) {
      router.events.subscribe((routerEvent: any) => {
        this.checkRouterEvent(routerEvent);
      });
    this.typeSelected = 'ball-beat';
  }

  public showSpinner(): void {
    this.spinnerService.show();

    setTimeout(() => {
      this.spinnerService.hide();
    }, 5000); // 5 seconds
  }

  checkRouterEvent(routerEvent: RouterEvent): void {
    if (routerEvent instanceof NavigationStart) {
      this.spinnerService.show();
      // setTimeout(() => {
      //   this.spinnerService.hide();
      // }, 5000); 
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
        this.spinnerService.hide();
        
    }
  }
}

