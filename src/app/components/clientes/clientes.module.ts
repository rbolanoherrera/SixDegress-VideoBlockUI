import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskModule, IConfig } from 'ngx-mask';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { ToastrModule } from 'ngx-toastr';

//para la configuración de mask
const maskConfig: Partial<IConfig> = {
  validation: false,
};

import { ClienteRoutingModule } from './cliente-routing.module';
import { LayoutComponent } from './layout.component';
import { ClienteListComponent } from './cliente-list.component';
import { ClienteComponent } from './cliente.component';
//import { SearchProductComponent } from '../shared/search-product/search-product.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ClienteRoutingModule,
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
    ],
    declarations: [
        LayoutComponent,
        ClienteListComponent,
        ClienteComponent
        //SearchProductComponent
    ]
})
export class ClientesModule { }