import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './page/admin/admin.component';
import { EditorComponent } from './page/editor/editor.component';
import { ForbiddenComponent } from './page/forbidden/forbidden.component';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { MovieEditorComponent } from './page/movie-editor/movie-editor.component';
import { AuthGuardService } from './service/auth-guard.service';
import { RoleGuardService } from './service/role-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'editor',
    component: EditorComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 2
    }
  },
  {
    path: 'editor/:id',
    component: MovieEditorComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 3
    }
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
