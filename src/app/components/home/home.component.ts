import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GeneralResponse } from '../../models/GeneralResponse';
import { AccountService } from '../../services/account.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: GeneralResponse;

    constructor(
        private accountService: AccountService,
        private router: Router
        ) {
        
        this.user = this.accountService.userValue;
    
    }
}