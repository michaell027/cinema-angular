import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MoviesPageComponent } from './pages/movies-page/movies-page.component';
import { NgModule } from '@angular/core';
import { ErrorComponent } from './components/eror-component/eror-component.component';
import { AddMoviePageComponent } from './pages/add-movie-page/add-movie-page.component';

export const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'movies', component: MoviesPageComponent },
  { path: 'movie/add', component: AddMoviePageComponent },
  { path: 'movies/:day', component: MoviesPageComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
