import { Component, NgZone } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css']
})
export class WatchListComponent {
  watchedMoviesList :any[] = []

  constructor(protected movieService: MovieService , private ngZone: NgZone
    ) 
{}

  ngOnInit() {
  
   
    this.movieService.getWatchlist().subscribe(
      (res)=>{
        console.log(res);
        this.watchedMoviesList=res.results
        for (let movie of res.results) {
          
        this.movieService.watchList.push(movie.id)
        }
      },
      (err)=>{
        console.log(err);
        
      }
    )
  }

page=1
  loadMovies() {
    this.movieService.getWatchlist(this.page).subscribe(
      (res)=>{
        console.log(res);
        this.watchedMoviesList.push(...res.results)
        for (let movie of res.results) {
          
        this.movieService.watchList.push(movie.id)
        }
      },
      (err)=>{
        console.log(err);
        
      })
  }

  getGenreName(genreId: number): string {
    const genre = this.movieService.genres.find((g:any) => g.id === genreId);
    return genre ? genre.name : 'Unknown Genre';
  }

 
  

    onScroll(): void {
      this.page++
      this.loadMovies();
    }


removeMoviefromWatchList(movieId:any,index:any){
this.movieService.addToWatchlist(movieId,false).subscribe(
  res => {console.log(res)
  
  this.movieService.watchList =  this.movieService.watchList.filter(id => id !== movieId);
  
if (index >= 0 && index <   this.watchedMoviesList.length) {
  this.watchedMoviesList.splice(index, 1);
}
  },
  err =>console.log(err)
)
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

  filtersOpen :any= 'open';

  toggleFilters() {
    this.filtersOpen = this.filtersOpen=='open' ? 'close' :'open';
  }
}
