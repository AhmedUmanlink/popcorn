import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  @ViewChild('moviesContainer') moviesContainer!: ElementRef;

 
 
  favoritesMoviesList :any[] = []

  constructor(protected movieService: MovieService , private ngZone: NgZone
    ) 
{}

  ngOnInit() {
  
   
    this.movieService.getFavoriteMovies().subscribe(
      (res)=>{
        console.log(res);
        this.favoritesMoviesList.push(...res.results)
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

page =1
  loadMovies() {
      this.movieService.getFavoriteMovies(this.page).subscribe(
      (res)=>{
        console.log(res);
        this.favoritesMoviesList.push(...res.results)
        for (let movie of res.results) {
          
        this.movieService.favoritesMovies.push(movie.id)
        }
      },
      (err)=>{
        console.log(err);
        
      }
    )


  }

  getGenreName(genreId: number): string {
    const genre = this.movieService.genres.find((g:any) => g.id === genreId);
    return genre ? genre.name : 'Unknown Genre';
  }

 
  

    onScroll(): void {
      this.page++
      this.loadMovies();
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
removeMoviefromFavorites(movieId:any,index:any){
this.movieService.addMovieToFavorites(movieId,false).subscribe(
  res => {console.log(res)
  
  this.movieService.favoritesMovies =  this.movieService.favoritesMovies.filter(id => id !== movieId);
  
if (index >= 0 && index <   this.favoritesMoviesList.length) {
  this.favoritesMoviesList.splice(index, 1);
}
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
