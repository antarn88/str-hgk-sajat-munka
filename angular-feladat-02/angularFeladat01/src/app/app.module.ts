import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MovieReducer } from './store/movie/MovieReducers';
import { MovieEffect } from './store/movie/MovieEffects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './page/home/home.component';
import { EditorComponent } from './page/editor/editor.component';
import { AdminComponent } from './page/admin/admin.component';
import { LoginComponent } from './page/login/login.component';
import { ForbiddenComponent } from './page/forbidden/forbidden.component';
import { NavComponent } from './widget/nav/nav.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorService } from './service/jwt-interceptor.service';
import { FormsModule } from '@angular/forms';
import { MovieEditorComponent } from './page/movie-editor/movie-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditorComponent,
    AdminComponent,
    ForbiddenComponent,
    NavComponent,
    LoginComponent,
    MovieEditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

    HttpClientModule,

    StoreModule.forRoot({ movies: MovieReducer }),
    EffectsModule.forRoot([MovieEffect]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
