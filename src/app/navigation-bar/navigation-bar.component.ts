import { Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
    selector: 'app-navigation-bar',
    templateUrl: './navigation-bar.component.html',
    styleUrls: ['./navigation-bar.component.scss']
})

export class NavigationBarComponent {

    constructor(
        private router: Router,
    ) {}

    username = JSON.parse(localStorage.getItem('user') || '').Username;

    onLogout(): void {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.router.navigate(['welcome']);
    }

}
