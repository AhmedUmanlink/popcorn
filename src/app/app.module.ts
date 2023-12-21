import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Interceptor } from './interceptor';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieComponent } from './movie/movie.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MovieFilterPipe } from './pipes/movie-filter.pipe';
import { NavbarComponent } from './navbar/navbar.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { FilmDetailsComponent } from './film-details/film-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LightGallery } from 'lightgallery/lightgallery';
import lightGallery from 'lightgallery';
import { LightgalleryModule } from 'lightgallery/angular';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MovieComponent,
    MovieFilterPipe,
    NavbarComponent,
    FavoritesComponent,
    FilmDetailsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    InfiniteScrollModule,
    BrowserAnimationsModule,
    LightgalleryModule 


  ],
  providers: [MovieFilterPipe,  {
    provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
