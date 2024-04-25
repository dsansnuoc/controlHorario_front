import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MensajeErrorCampoPipe } from '../pipes/mensaje-error-campo.pipe';
import { AutorizacionService } from '../services/auxiliares/autorizacion.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const provideTranslation = () => ({
  defaultLanguage: 'es',
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient],
  },
});

@NgModule({
  declarations: [MensajeErrorCampoPipe],
  imports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot(provideTranslation()),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutorizacionService,
      multi: true,
    },
  ],
  exports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule,
    MensajeErrorCampoPipe,
  ],
})
export class OtherModule {}
