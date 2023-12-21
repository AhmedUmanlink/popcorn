// movie.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENV } from '../env';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private env = ENV;

  genres: any;
  originalMovies: any[] = [];
  favoritesMovies :any[]=[]
  searchQueryForm: any;
  filtersForm:any
  selectedtype = 'discover';
  currentPage = 1;

  constructor(private http: HttpClient,private fb: FormBuilder) 
  {
    this.getMovieGenres().subscribe(
      (data) => {
        console.log(data);
        
        this.genres = data.genres;
      },
      (error) => {
        console.error('Error fetching genres:', error);
      }
    );
    this.searchQueryForm = this.fb.group({
      searchQuery: ['', [Validators.required]],
    });
    this.filtersForm = this.fb.group({
      start: [''],
      end: [''],
      selectedCategory: ['']
    });
  }

  // Fetch movies based on a selected category (genre)
  getMoviesByCategory(categoryId: number): Observable<any> {
    const url = `${this.env.baseUrl}/discover/movie`;
    const params = {
      api_key: this.env.api_key,
       with_genres: categoryId.toString(),
    };

    return this.http.get(url, { params });
  }
  getMovies(page:any=1): Observable<any> {
    const url = `${this.env.baseUrl}/discover/movie`;
    const params = {
      api_key: this.env.api_key, 
      page :page

    };

    return this.http.get(url, { params });
  }

  getMoviesByFilters(type:string,page:any=1): Observable<any> {
    
    let url = `${this.env.baseUrl}/movie/${type}`;

    if(type=='discover')
     url = `${this.env.baseUrl}/discover/movie`;

    const params = {
      api_key: this.env.api_key, 
      page :page
    };

    return this.http.get(url, { params });
  }
  // Fetch the list of movie genres
  getMovieGenres(): Observable<any> {
    const url = `${this.env.baseUrl}/genre/movie/list`;
    const params = {
      api_key: this.env.api_key,
    };

    return this.http.get(url, { params });
  }

  searchMovies(query: string): Observable<any> {
    const url = `${this.env.baseUrl}/search/movie`;
    const params = {
      api_key: this.env.api_key,
      query: query,
    };

    return this.http.get(url, { params });
  }

  getFavoriteMovies(): Observable<any> {
    const accountId =JSON.parse(sessionStorage.getItem('account')!).id
    const url = `${this.env.baseUrl}/account/${accountId}/favorite/movies`;
    const params = {
      api_key: this.env.api_key,
      session_id: JSON.parse(sessionStorage.getItem('sessionData')!).session_id,
    };

    return this.http.get(url, { params });
  }


  addMovieToFavorites(movieId: number,isFav:boolean): Observable<any> {
    const accountId =JSON.parse(sessionStorage.getItem('account')!).id
    const url = `${this.env.baseUrl}/account/${accountId}/favorite`;
    const params = {
      api_key: this.env.api_key,
      session_id: JSON.parse(sessionStorage.getItem('sessionData')!).session_id,
    };

    const body = {
      media_type: 'movie',
      media_id: movieId,
      favorite: isFav,
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, body, { params, headers });
  }

  getMovieDetails(movieId: number): Observable<any> {
    const url = `${this.env.baseUrl}/movie/${movieId}`;
    const params = {
      api_key: this.env.api_key,
    };

    return this.http.get(url, { params });
  }
  getMovieCredits(movieId: number): Observable<any> {
    const url = `${this.env.baseUrl}/movie/${movieId}/credits`;
    const params = {
      api_key: this.env.api_key,
    };

    return this.http.get(url, { params });
  }
  getMovieReviews(movieId: number): Observable<any> {
    const url = `${this.env.baseUrl}/movie/${movieId}/reviews`;
    const params = {
      api_key: this.env.api_key,
    };

    return this.http.get(url, { params });
  }
  addMovieReview(movieId: any, reviewData: any): Observable<any> {
    const url = `${this.env.baseUrl}/movie/${movieId}/reviews`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const params = {
      api_key: this.env.api_key,
    };
    return this.http.post(url, reviewData, { params,headers });
  }

  getMovieVideos(movieId: number): Observable<any> {
    const url = `${this.env.baseUrl}/movie/${movieId}/videos`;
    const params = {
      api_key: this.env.api_key,
    };

    return this.http.get(url, { params });
  }
}

