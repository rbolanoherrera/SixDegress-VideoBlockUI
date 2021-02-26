import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskModule, IConfig } from 'ngx-mask';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//para la configuración de mask
const maskConfig: Partial<IConfig> = {
  validation: false,
};

import { PeliculaRoutingModule } from './pelicula-routing.module';
import { LayoutComponent } from './layout.component';
import { PeliculaListComponent } from './pelicula-list.component';
import { PeliculaComponent } from './pelicula.component';
//import { SearchProductComponent } from '../shared/search-product/search-product.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PeliculaRoutingModule,
        //BrowserAnimationsModule, // required animations module
        NgxMaskModule.forRoot(maskConfig),
        NgxLoadingModule.forRoot({
            animationType: ngxLoadingAnimationTypes.threeBounce,
            backdropBackgroundColour: 'rgba(0,0,0,0.4)',
            backdropBorderRadius: '-1px',
            primaryColour: '#2a3542',
            secondaryColour: '#2a3542',
            tertiaryColour: '#2a3542'
        }),
        ToastrModule.forRoot({
            positionClass: 'toast-top-right',
            preventDuplicates: true,
        }),
        NgbModule //Modulo del DatePicker y Modal
    ],
    declarations: [
        LayoutComponent,
        PeliculaListComponent,
        PeliculaComponent
        //SearchProductComponent
    ]
})
export class PeliculasModule { }