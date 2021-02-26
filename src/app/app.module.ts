import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { ToastrModule } from 'ngx-toastr';

//para la configuración de mask
const maskConfig: Partial<IConfig> = {
  validation: false,
};

import { AppRoutingModule } from './app-routing.module';

//helpers
import { JwtInterceptor, ErrorInterceptor } from './helpers';


//Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(maskConfig),
    NgxLoadingModule.forRoot({
      //animationType: ngxLoadingAnimationTypes.doubleBounce,
      //animationType: ngxLoadingAnimationTypes.rectangleBounce,
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
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
