import { Component, OnInit, Input } from '@angular/core';
// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-profile-view',
    templateUrl: './profile-view.component.html',
    styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

    user: any = {};
    
    @Input() userInput = {
        Username: '',
        Password: '',
        Email: '',
        Birth_Date: ''
    };

    constructor(
        public fetchApiData: FetchApiDataService,
        public snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.getUser();
    }

    getUser(): void {   
        const parsedUser: any = JSON.parse(localStorage.getItem('user') || '');     
        this.user = {
            ...parsedUser,
            // Birth_Date: new Date(parsedUser.Birth_Date)
        }

        // Prefill userInput with user data, except password
        this.userInput = {
            ...this.userInput,
            Username: this.userInput.Username === '' || null ? this.user.Username : this.userInput.Username,
            Email: this.userInput.Email === '' || null ? this.user.Email : this.userInput.Email,
            Birth_Date: this.userInput.Birth_Date === '' || null ? this.user.Birth_Date : this.userInput.Birth_Date,
        }
    }

    onUserUpdate(): void {
        // Make sure userInput fields aren't empty by filling them with user variable data if empty
        this.userInput = {
            Username: this.userInput.Username === '' || null ? this.user.Username : this.userInput.Username,
            Password: this.userInput.Password,
            Email: this.userInput.Email === '' || null ? this.user.Email : this.userInput.Email,
            Birth_Date: this.userInput.Birth_Date === '' || null ? this.user.Birthday : this.userInput.Birth_Date,
        }

        this.fetchApiData.editUser(this.user.Username, this.userInput).subscribe((res) => {
            // Update user variable with updated content            
            this.user = {
                ...this.user,
                Username: this.userInput.Username,
                Email: this.userInput.Email,
                Birth_Date: this.userInput.Birth_Date
            }
            // Update local storage user with updated content
            localStorage.setItem('user', JSON.stringify(this.user));

            this.snackBar.open(res.message, 'OK', {
                duration: 4000
            });
            window.location.reload();
        }, (res) => {
            console.log(res)
            this.snackBar.open(res.message, 'OK', {
                duration: 4000
            });
        });
    }
}
