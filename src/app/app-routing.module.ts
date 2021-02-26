import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home';
import { AuthGuard } from './helpers';

const accountModule = () => import('./components/account/account.module').then(x => x.AccountModule);
const clientesModule = () => import('./components/clientes/clientes.module').then(x => x.ClientesModule);
const peliculasModule = () => import('./components/peliculas/peliculas.module').then(x => x.PeliculasModule);

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'account', loadChildren: accountModule },
  { path: 'clientes', loadChildren: clientesModule },
  { path: 'peliculas', loadChildren: peliculasModule },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
