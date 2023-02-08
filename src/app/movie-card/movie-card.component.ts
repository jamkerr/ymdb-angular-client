import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { DirectorDetailsComponent } from '../director-details/director-details.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreDetailsComponent } from '../genre-details/genre-details.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
    selector: 'app-movie-card',
    templateUrl: './movie-card.component.html',
    styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
    movies: any[] = [];
    allMovies: any[] = [];
    user: any = JSON.parse(localStorage.getItem('user') || '') || {};
    filterToggle: boolean = false;
    constructor(
        public fetchApiData: FetchApiDataService,
        public dialog: MatDialog,
        public snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.getMovies();
        this.getUser();
    }

    getMovies(): void {
        this.fetchApiData.getAllMovies().subscribe((resp: any) => {
            this.movies = resp;
            this.allMovies = resp;
            return this.movies;
        });
    }

    getUser(): void {
        this.user = JSON.parse(localStorage.getItem('user') || '');
    }

    onFilterToggleChange(): void {
        this.movies = this.filterToggle ? this.movies.filter(movie => this.user.FavoriteMovies.includes(movie._id)) : this.allMovies;
    }

    // This is the function that will open the dialog when the director button is clicked  
    openDirectorDialog(director: any): void {
        this.dialog.open(DirectorDetailsComponent, {
            data: {
                Name: director.Name,
                Bio: director.Bio,
                Birthyear: director.Birthyear,
            },
            // Assigning the dialog a width
            width: '280px'
        });
    }
    
    // Function to open genre details dialog
    openGenreDialog(genre: any): void {
        this.dialog.open(GenreDetailsComponent, {
            data: {
                Name: genre.Name,
                Description: genre.Description
            },
            width: '280px'
        });
    }

    // Function to open movie details dialog
    openMovieDialog(movie: any): void {
        this.dialog.open(MovieDetailsComponent, {
            data: {
                Title: movie.Title,
                Description: movie.Description
            },
            width: '280px'
        });
    }

    // Function to toggle favorite movie
    favoriteMovieToggle(movie: any): void {
        if (!this.user.FavoriteMovies.includes(movie._id)) {
            this.fetchApiData.addFavoriteMovie(this.user.Username, movie.Title).subscribe((resp) => {
                const {Password, ...cleanUser} = resp;
                this.user = cleanUser;
                localStorage.setItem('user', JSON.stringify(cleanUser));
                this.snackBar.open(`Added ${movie.Title} to favorites.`, 'OK', {
                    duration: 2000
                })
            }, (resp) => {
                this.snackBar.open(resp.message, 'OK', {
                  duration: 2000
                });
            }) 
        } else {
            this.fetchApiData.removeFavoriteMovie(this.user.Username, movie.Title).subscribe((resp) => {
                const {Password, ...cleanUser} = resp;
                this.user = cleanUser;
                localStorage.setItem('user', JSON.stringify(cleanUser));
                this.snackBar.open(`Removed ${movie.Title} from favorites.`, 'OK', {
                    duration: 2000
                })
            }, (resp) => {
                this.snackBar.open(resp.message, 'OK', {
                  duration: 3000
                });
            }) 
        }
    }

}
