import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './Components/about/about.component';
import { HomeComponent } from './Components/home/home.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent//Hiç bişey olmadığında Home çalışacak.
  },
  {
    path:'about',
    component:AboutComponent
  },
  {
    path:'**',
    component:NotFoundComponent//Olmayan bir sayfaya girildiğinde.
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
