import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LightgalleryModule } from 'lightgallery/angular';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css']
})
export class FilmDetailsComponent {
  movieId: number | null =null;
  movieDetails: any;
  reviews: any;
  movieVideos:any
  crew :any
  cast :any
  section:any ={
    reviews :false,
    trailers :true,
    companies :false,
    crew :false,
    cast :false,
  }
  toggleSection(section:string){
    this.section[section]= !this.section[section]
  }
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    // Get the movie ID from the route parameters
    this.route.params.subscribe(params => {
      this.movieId = +params['id']; // Assuming your route parameter is named 'id'
      // Fetch movie details using the MovieService
      this.movieService.getMovieDetails(this.movieId).subscribe(data => {
         console.log(data);
        
        this.movieDetails = data;
      });
      this.movieService.getMovieReviews(this.movieId).subscribe(
        (data) => {
          // console.log(data);
          
          this.reviews = data.results;
        },
        (error) => {
          console.error('Error fetching reviews:', error);
        }
      );
   
        this.movieService.getMovieVideos(this.movieId).subscribe(
          (data) => {
            // Assuming data.results is an array of videos
           console.log(data);
        
            // Add more breakpoints as needed
           
            this.movieVideos = data.results;


          },
          (error) => {
            console.error('Error fetching movie videos:', error);
          }
        );
        this.movieService.getMovieCredits(this.movieId).subscribe(
          (credits) => {
            
            // console.log('Movie Credits:', credits);
            this.crew=credits.crew
            this.cast=credits.cast
          },
          (error) => {
            console.error('Error fetching movie credits:', error);
          }
        );
       
        
    });
  }
  getVideoUrl(videoKey: string): SafeResourceUrl {
    const videoUrl = `https://www.youtube.com/embed/${videoKey}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }

  addReview(): void {
    // Example review data (replace with actual review data)
    const reviewData = {
      author: JSON.parse(sessionStorage.getItem('account')!).username,
      content: 'This movie is amazing!',
    };

    this.movieService.addMovieReview(this.movieId, reviewData).subscribe(
      (response) => {
        console.log('Review added successfully:', response);
        // Refresh the reviews after adding a new review
        
      },
      (error) => {
        console.error('Error adding review:', error);
      }
    );
  }

}
