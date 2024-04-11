import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/*
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
*/
/*
import { EffectsArray } from './app.effects';
import { appReducers } from './app.reducer';
*/
import { AutorizacionService } from './services/auxiliares/autorizacion.service';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    //   StoreModule.forRoot(appReducers),
    //   EffectsModule.forRoot(EffectsArray),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutorizacionService,
      multi: true,
    },
  ],
  exports: [],
  bootstrap: [AppModule],
})
export class AppModule {}
