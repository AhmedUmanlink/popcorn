import { Pipe, PipeTransform } from '@angular/core';
import { window } from 'rxjs';

@Pipe({
  name: 'movieFilter',
})
export class MovieFilterPipe implements PipeTransform {
    transform(movies: any[], selectedCategory: any, startDate: string, endDate: string): any[] {
        if (!movies || (!selectedCategory && !startDate && !endDate)) {
          return movies;
        }
    
        return movies.filter((movie) => {
          const genreFilter = !selectedCategory || movie.genre_ids.includes(parseInt(selectedCategory));
          const startFilter = !startDate || new Date(movie.release_date) >= new Date(startDate);
          const endFilter = !endDate || new Date(movie.release_date) <= new Date(endDate);
    
          return genreFilter && startFilter && endFilter;
        });
      }
}
