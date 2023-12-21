import { Component } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
constructor(protected movieService: MovieService,private router:Router){}

canShow(){
  return this.router.url !== "/login"
}
searchMovies() {
  if (this.movieService.searchQueryForm.value.searchQuery) {
    this.movieService.searchMovies(this.movieService.searchQueryForm.value.searchQuery).subscribe(
      (data) => {
       console.log(data);
       if(data.results.length>0)
        this.movieService.originalMovies = data.results;
      },
      (error) => {
        // Handle error
       console.log(error);

        console.error('Error searching movies:', error);
      }
    );
  }
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


}
