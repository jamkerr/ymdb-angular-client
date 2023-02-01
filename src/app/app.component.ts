import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserSignInFormComponent } from './user-signin-form/user-signin-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'ymdb-angular-client';
    constructor(public dialog: MatDialog) { }
    // This is the function that will open the dialog when the signup button is clicked  
    openUserRegistrationDialog(): void {
        this.dialog.open(UserRegistrationFormComponent, {
            // Assigning the dialog a width
            width: '280px'
        });
    }
    // This is the function that will open the dialog when the signin button is clicked  
    openUserSignInDialog(): void {
        this.dialog.open(UserSignInFormComponent, {
            // Assigning the dialog a width
            width: '280px'
        });
    }
}
