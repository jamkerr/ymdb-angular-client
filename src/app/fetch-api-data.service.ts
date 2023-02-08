import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

//Declare the API URL that will provide data for the client app
const apiUrl = 'https://ymdeebee.herokuapp.com/';

@Injectable({
    providedIn: 'root'
})

export class FetchApiDataService {
  
    // Inject the HttpClient module to the constructor params
    // This will provide HttpClient to the entire class, making it available via this.http
    constructor(private http: HttpClient) {}

    // User registration
    public userRegistration(userDetails: any): Observable<any> {
        return this.http.post(apiUrl + 'users', userDetails)
        .pipe(
            catchError(this.handleError)
        );
    }

    // User sign in
    public userSignIn(userDetails: any): Observable<any> {
        return this.http.post(apiUrl + 'login', userDetails)
        .pipe(
            catchError(this.handleError)
        );
    }

    // Get all movies
    public getAllMovies(): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'movies',
            {headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                }
            )}
        )
        .pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    // Get one movie
    public getOneMovie(movieTitle: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'movies/' + movieTitle,
            {headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                }
            )}
        )
        .pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    // Get director
    public getDirector(directorName: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'directors/' + directorName,
            {headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                }
            )}
        )
        .pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    // Get genre
    public getGenre(genreName: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'genres/' + genreName,
            {headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                }
            )}
        )
        .pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    // Get user
    public getUser(userName: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'users/' + userName,
            {headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                }
            )}
        )
        .pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    // Get favorite movies from user
    public getFavoriteMovie(userName: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'users/' + userName,
            {headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                }
            )}
        )
        .pipe(
            map(this.extractResponseData),
            map((userData) => userData.FavoriteMovies),
            catchError(this.handleError)
        );
    }    

    // Add a favorite movie
    public addFavoriteMovie(userName: string, movieTitle: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.put(apiUrl + 'users/' + userName + '/favorites/' + movieTitle,
        {},
            {headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                }
            )}
        )
        .pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }        

    // Remove a favorite movie
    public removeFavoriteMovie(userName: string, movieTitle: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.delete(apiUrl + 'users/' + userName + '/favorites/' + movieTitle,
            {headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                }
            )}
        )
        .pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }   

    // Edit user
    public editUser(userName: string, userDetails: any): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.put(apiUrl + 'users/' + userName,
            userDetails,
            {headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                }
            )}
        )
        .pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    } 

    // Delete user
    public deleteUser(userName: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.delete(apiUrl + 'users/' + userName,
            {headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                }
            )}
        )
        .pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    } 

    // Extract response data
    private extractResponseData(res: any): any {
        const body = res;
        return body || {};
    }

    // Handle error
    private handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
            console.error('Some error occurred:', error.error.message);
            return throwError(() => new Error(error.error.message));
        } else if (error.error.errors) {
            console.error(
                `Error Status code ${error.status}, ` +
                `Error body is: ${JSON.stringify(error.error)}`
            );
            return throwError(() => new Error(error.error.errors[0].msg));
        } else {
        return throwError(() => new Error('Something bad happened; please try again later.'));
        }
    }
}
