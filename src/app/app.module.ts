import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { MaterialModule } from './modules/material/material.module';

import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

import { BreedsEffects } from './modules/breeds/+state/breeds.effects';

import { SettingsReducer } from './modules/settings/+state/settings.reducers';
import { TranslocoRootModule } from './transloco/transloco-root.module';
import { SubBreedEffects } from './modules/breeds/subbreed/+state/subbreed.effects';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MaterialModule,
    HttpClientModule,
    StoreModule.forRoot({
      // @ts-ignore
      settings: SettingsReducer
    }),
    EffectsModule.forRoot([
      BreedsEffects,
      SubBreedEffects
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, logOnly: environment.production
    }),
    TranslocoRootModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
