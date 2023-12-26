import { Component, Inject, Renderer2 } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
constructor(protected movieService: MovieService,private router:Router,private renderer: Renderer2,
  @Inject(DOCUMENT) private document: Document
  ){}

canShow(){
  return this.router.url !== "/login"
}

canSerach(){
  return this.router.url === "/movie"
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
isDarkMode =false

switchTheme(){
  this.isDarkMode=!this.isDarkMode
  console.log(this.isDarkMode);
  const root = this.document.documentElement.style;
  if (this.isDarkMode) {
    root.setProperty('--primary', '#2c3e50');
    root.setProperty('--secondary', '#b1b0ac');
    root.setProperty('--background', '#333');
    root.setProperty('--textP', '#f5f5f5');
    root.setProperty('--textS', '#d36a6a');
    root.setProperty('--text3', 'royalblue');
    root.setProperty('--text4', '#b1b0ac');
  } else {
    root.setProperty('--primary', '#EEEBDD');
    root.setProperty('--secondary', '#CE1212');
    root.setProperty('--background', '#f5f5f5');
    root.setProperty('--textP', '#333');
    root.setProperty('--textS', '#d36a6a');
    root.setProperty('--text3', '#b1b0ac');
    root.setProperty('--text4', '#b1b0ac');
  }
}

}
