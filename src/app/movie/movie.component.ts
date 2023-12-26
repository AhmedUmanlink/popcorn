

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgZone } from '@angular/core';

import { MovieFilterPipe } from '.././pipes/movie-filter.pipe';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  @ViewChild('moviesContainer') moviesContainer!: ElementRef;

 
 

  constructor(protected movieService: MovieService, private fb: FormBuilder , private ngZone: NgZone
    ) 
{}

  ngOnInit() {
    this.reload();
    this.movieService.getFavoriteMovies().subscribe(
      (res)=>{
        // console.log(res);
        for (let movie of res.results) {
          
        this.movieService.favoritesMovies.push(movie.id)
        }
      },
      (err)=>{
        console.log(err);
        
      }
    )

    this.movieService.getWatchlist().subscribe(
      (res)=>{
        console.log('watchList',res);
        for (let movie of res.results) {
          
        this.movieService.watchList.push(movie.id)
        }
      },
      (err)=>{
        console.log(err);
        
      }
    )
  }


  loadMovies(type: string) {
    this.movieService.getMoviesByFilters(type, this.movieService.currentPage).subscribe(
      (data: any) => {
        console.log(data);
        
        this.movieService.selectedtype = type;
        if (this.movieService.currentPage == 1) this.movieService.originalMovies = data.results;
        else this.movieService.originalMovies.push(...data.results);

        this.movieService.currentPage++;
      },
      (error) => {
        console.error('Error fetching movies:', error);
      }
    );
  }

  getGenreName(genreId: number): string {
    const genre = this.movieService.genres.find((g:any) => g.id === genreId);
    return genre ? genre.name : 'Unknown Genre';
  }

 

  reload(){
    this.movieService.getMovies(this.movieService.currentPage).subscribe(
      (data) => {
        
        this.movieService.originalMovies = data.results;
      
      },
      (error) => {
        console.error('Error fetching movies', error);
      }
    );
  }



  
    // Add a flag to indicate if movies are currently being loaded
    isLoading: boolean = true;
  
    // ... (your existing code)
  
    // Listen for the infinite-scroll event
    onScroll(): void {
      
      this.loadMovies(this.movieService.selectedtype);
    }

scrollup(){
  this.ngZone.runOutsideAngular(() => {
    setTimeout(() => {
      // Update the scrollTop property here
      this.moviesContainer.nativeElement.scrollTop = this.moviesContainer.nativeElement.scrollHeight;

      // Run change detection manually
      this.ngZone.run(() => {});
    });
  });
}
addMovieToFavorites(movieId:any,isFav:boolean){
this.movieService.addMovieToFavorites(movieId,isFav).subscribe(
  res => {console.log(res)
    if(isFav===true)
    this.movieService.favoritesMovies.push(movieId)
  else if(isFav===false)
  this.movieService.favoritesMovies =  this.movieService.favoritesMovies.filter(id => id !== movieId);
  },
  err =>console.log(err)
)
}

addMovieToWatchList(movieId:any,isWatched:boolean){
  this.movieService.addToWatchlist(movieId,isWatched).subscribe(
    res => {console.log(res)
      if(isWatched===true)
      this.movieService.watchList.push(movieId)
    else if(isWatched===false)
    this.movieService.watchList =  this.movieService.watchList.filter(id => id !== movieId);
    },
    err =>console.log(err)
  )
  }

  filtersOpen :any= 'open';

  toggleFilters() {
    this.filtersOpen = this.filtersOpen=='open' ? 'close' :'open';
  }
}
