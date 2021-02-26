import { Component } from '@angular/core';

import { AccountService } from './services';
import { GeneralResponse } from './models/GeneralResponse';
//import { Router } from '@angular/router';

@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  
  title = 'VideoBlock';
  user: GeneralResponse;
  fecha:string;

  constructor(
    private accountService: AccountService,
    //private router: Router
    ) {
      this.accountService.user.subscribe(x => this.user = x);
      this.fecha = new Date().getFullYear().toString();

      // if(this.user != null && this.user.Data == null)
      //   this.logout();
  }

  logout() {
      this.accountService.logout();
  }

}
