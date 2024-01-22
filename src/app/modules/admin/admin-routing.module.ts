import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { MovieInfoPageComponent } from './movie-info-page/movie-info-page.component';
import { EditMoviePageComponent } from './edit-movie-page/edit-movie-page.component';

const routes: Routes = [
  {
    path: '',
    children: [{ path: '', component: HomePageComponent, pathMatch: 'full' }],
  },
  { path: 'info/:movieId', component: MovieInfoPageComponent },
  { path: 'edit/:movieId', component: EditMoviePageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
