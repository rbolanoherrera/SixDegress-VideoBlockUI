import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { PeliculaComponent } from './pelicula.component';
import { PeliculaListComponent } from './pelicula-list.component';
import { AuthGuard } from 'src/app/helpers';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: PeliculaListComponent },
            { path: 'add', component: PeliculaComponent, canActivate: [AuthGuard] },
            { path: 'edit/:id', component: PeliculaComponent, canActivate: [AuthGuard] }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PeliculaRoutingModule { }