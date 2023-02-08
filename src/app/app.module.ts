import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Material modules
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 

// Componenents
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserSignInFormComponent } from './user-signin-form/user-signin-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { DirectorDetailsComponent } from './director-details/director-details.component';
import { GenreDetailsComponent } from './genre-details/genre-details.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile', component: ProfileViewComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserSignInFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    NavigationBarComponent,
    DirectorDetailsComponent,
    GenreDetailsComponent,
    MovieDetailsComponent,
    ProfileViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatSlideToggleModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
