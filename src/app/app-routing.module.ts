import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MovieComponent } from './movie/movie.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { FilmDetailsComponent } from './film-details/film-details.component';
import { WatchListComponent } from './watch-list/watch-list.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path : 'login',
    component : LoginComponent
  },
  
  {
    path : 'movie',
    component : MovieComponent,
    canActivate  : [AuthGuard]
  },
  {
    path : 'MyFavoriteMovies',
    component : FavoritesComponent,canActivate  : [AuthGuard]
   },
   {
    path : 'MyWatchList',
    component : WatchListComponent,canActivate  : [AuthGuard]
   },
   {
    path : 'movie-details/:id',
    component : FilmDetailsComponent,canActivate  : [AuthGuard]
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
