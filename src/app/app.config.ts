import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { EffectsArray } from './app.efects';
import { appReducers } from './app.reducer';
import { routes } from './app.routes';
//import { LoginEffects } from './effects/login.effects';
//import { loginReducer } from './reducers';
//import { metaReducers, reducers } from './reducers';
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

export const provideTranslation = () => ({
  defaultLanguage: 'es',
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient],
  },
});
/*
const reducersAux = combineReducers({
  loginReducer: loginReducer,
});
*/
export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(), // required animations providers
    provideHttpClient(),
    importProvidersFrom([
      HttpClientModule,
      TranslateModule.forRoot(provideTranslation()),
    ]),
    provideRouter(routes),
    provideStore(appReducers),

    provideStoreDevtools(),
    provideEffects(EffectsArray),
  ],
};
