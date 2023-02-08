// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-user-registration-form',
    templateUrl: './user-registration-form.component.html',
    styleUrls: ['./user-registration-form.component.scss']
})

export class UserRegistrationFormComponent implements OnInit {
    
    @Input() userData = { Username: '', Password: '', Email: '', Birth_Date: '' };

    constructor(
        public fetchApiData: FetchApiDataService,
        public snackBar: MatSnackBar
    ) { }
    
    ngOnInit(): void {
    }
    
    // This is the function responsible for sending the form inputs to the backend
    registerUser(): void {
        this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
            this.snackBar.open(result.message, 'OK', {
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
