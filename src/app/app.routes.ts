import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MoviesPageComponent } from './pages/movies-page/movies-page.component';
import { NgModule } from '@angular/core';
import { ErrorComponent } from './components/error-component/error-component.component';
import { authGuard } from './guards/auth-guard/auth.guard';
import { adminGuard } from './guards/admin-guard/admin.guard';
export const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'movies', component: MoviesPageComponent, canActivate: [authGuard] },
  {
    path: 'movies/:date',
    component: MoviesPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [adminGuard],
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
