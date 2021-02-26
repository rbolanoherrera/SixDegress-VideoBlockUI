import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { ClienteComponent } from './cliente.component';
import { ClienteListComponent } from './cliente-list.component';
import { AuthGuard } from 'src/app/helpers';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: ClienteListComponent, canActivate: [AuthGuard] },
            { path: 'add', component: ClienteComponent },
            { path: 'edit/:id', component: ClienteComponent, canActivate: [AuthGuard] }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClienteRoutingModule { }