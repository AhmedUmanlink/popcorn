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
        this.favoritesMoviesList=res.results
        for (let movie of res.results) {
          
        this.movieService.favoritesMovies.push(movie.id)
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
}
