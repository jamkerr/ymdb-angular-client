import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-user-signin-form',
    templateUrl: './user-signin-form.component.html',
    styleUrls: ['./user-signin-form.component.scss']
})
export class UserSignInFormComponent implements OnInit {

    @Input() userData = { Username: '', Password: '' };

    constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<UserSignInFormComponent>,
        public snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
    }

    // This is the function responsible for sending the form inputs to the backend
    signInUser(): void {
        this.fetchApiData.userSignIn(this.userData).subscribe((result) => {
            // Logic for a successful user sign in goes here! (To be implemented)
            this.dialogRef.close(); // This will close the modal on success!
            // Save token to local storage
            localStorage.setItem('token', result.token);
            // Remove password from user object, and save remaining user object to local storage
            const {Password, ...cleanUser} = result.user;
            localStorage.setItem('user', JSON.stringify(cleanUser));
            console.log(result);
            this.snackBar.open(result, 'OK', {
                duration: 2000
            });
        }, (result) => {
            console.log(result);
            this.snackBar.open(result, 'OK', {
                duration: 2000
            });
        });
    }

}
