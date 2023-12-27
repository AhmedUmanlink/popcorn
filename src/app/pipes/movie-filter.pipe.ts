import { Pipe, PipeTransform } from '@angular/core';
import { window } from 'rxjs';

@Pipe({
  name: 'movieFilter',
})
export class MovieFilterPipe implements PipeTransform {
  transform(movies: any[], filters: any): any[] {
    if (!movies || (!filters.selectedCategory && !filters.startDate && !filters.endDate && !filters.field && !filters.field )) {
      return movies;
    }

    const filteredMovies = movies.filter((movie) => {
      const genreFilter = !filters.selectedCategory || movie.genre_ids.includes(parseInt(filters.selectedCategory));
      const startFilter = !filters.startDate || new Date(movie.release_date) >= new Date(filters.startDate);
      const endFilter = !filters.endDate || new Date(movie.release_date) <= new Date(filters.endDate);

      return genreFilter && startFilter && endFilter;
    });

    if (filters.field !== '' && filters.order !== '' ) {
      const sortedMovies = this.sort(filteredMovies, filters.field, filters.order);
      return sortedMovies;
    }
    else return filteredMovies

  }
  private sortByReleaseDate(movies: any[], order: any): any[] {
    return movies.sort((a, b) => {
      const dateA = new Date(a.release_date).getTime();
      const dateB = new Date(b.release_date).getTime();
      if (order === 'desc')
        return dateA - dateB;
      else
        return dateB - dateA;

    });
  }

  private sort(movies: any[], field: any,order:any): any[] {
    return movies.sort((a, b) => {
      let  fieldA= a[field]
      let  fieldB= b[field]
      if(field==='release_date')
      {
          fieldA= new Date(a[field]).getTime();
          fieldB= new Date(b[field]).getTime();
      }
      if (order === 'asc')
        return fieldA - fieldB;
      else
        return fieldB - fieldA;

    });
  
    
  }
}
