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

    /**
     * @function userRegistration
     * @service POST to user registration endpoint
     * @param userDetails 
     * @returns a JSON response message that the user was successfully added
     */
    public userRegistration(userDetails: any): Observable<any> {
        return this.http.post(apiUrl + 'users', userDetails)
        .pipe(
            catchError(this.handleError)
        );
    }

    /**
     * @function userSignIn
     * @service POST to user login endpoint
     * @param userDetails 
     * @returns a JSON object containing a user object and the associated JSON Web Token.
     */
    public userSignIn(userDetails: any): Observable<any> {
        return this.http.post(apiUrl + 'login', userDetails)
        .pipe(
            catchError(this.handleError)
        );
    }

    /**
     * @function getAllMovies
     * @service GET all movie data
     * @returns a JSON object containing an array of movie objects, including nested director and genre object arrays
     */
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

    /**
     * @function getOneMovie
     * @service GET data for one movie
     * @param movieTitle 
     * @returns a JSON movie object, including nested director and genre object arrays
     */
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

    /**
     * @function getDirector
     * @service GET data for a director
     * @param directorName 
     * @returns a JSON director object
     */
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

    /**
     * @function getGenre
     * @service GET data for a genre
     * @param genreName 
     * @returns a JSON genre object
     */
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

    /**
     * @function getUser
     * @service GET data for one user
     * @param userName 
     * @returns a JSON user object
     */
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

    /**
     * @function getFavoriteMovie
     * @service GET favorite movie data for a user
     * @param userName 
     * @returns an array of movie IDs for the user's favorite movies
     */
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

    /**
     * @function addFavoriteMovie
     * @service PUT (add) a favorite movie to a user's favorite movies
     * @param userName 
     * @param movieTitle 
     * @returns a JSON user object with the updated user data
     */
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

    /**
     * @function removeFavoriteMovie
     * @service DELETE a favorite movie from a user's favorite movies
     * @param userName 
     * @param movieTitle 
     * @returns a JSON user object with the updated user data
     */
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

    /**
     * @function editUser
     * @service PUT (change) a user's Username, Password, Email, or Birth_Date (which need to be sent in a JSON object)
     * @param userName 
     * @param userDetails 
     * @returns a JSON message that the user's details were successfully updated
     */
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

    /**
     * @function deleteUser
     * @service DELETE user data
     * @param userName 
     * @returns a JSON message that the user was successfully deleted
     */
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
