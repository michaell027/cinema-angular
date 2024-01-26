import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MoviesPageComponent } from './pages/movies-page/movies-page.component';
import { NgModule } from '@angular/core';
import { ErrorComponent } from './components/error-component/error-component.component';
import { AddMoviePageComponent } from './pages/add-movie-page/add-movie-page.component';
import { authGuard } from './guards/auth.guard';
export const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'movies', component: MoviesPageComponent, canActivate: [authGuard] },
  { path: 'movie/add', component: AddMoviePageComponent },
  { path: 'movies/:date', component: MoviesPageComponent },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
