import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MovieComponent } from './movie/movie.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { FilmDetailsComponent } from './film-details/film-details.component';

const routes: Routes = [
  {
    path : 'login',
    component : LoginComponent
  },
  
  {
    path : 'movie',
    component : MovieComponent,
    children :[
    
    ]
  },
  {
    path : 'MyFavoriteMovies',
    component : FavoritesComponent,
   },
   {
    path : 'movie-details/:id',
    component : FilmDetailsComponent,
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
