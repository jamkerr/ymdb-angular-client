import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { DirectorDetailsComponent } from '../director-details/director-details.component';
import { MatDialog } from '@angular/material/dialog';
import { GenreDetailsComponent } from '../genre-details/genre-details.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
    selector: 'app-movie-card',
    templateUrl: './movie-card.component.html',
    styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
    movies: any[] = [];
    constructor(
        public fetchApiData: FetchApiDataService,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.getMovies();
    }

    getMovies(): void {
        this.fetchApiData.getAllMovies().subscribe((resp: any) => {
            this.movies = resp;
            return this.movies;
        });
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

}
