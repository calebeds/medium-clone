import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { reducers } from 'src/app/auth/store/reducers';
import { AuthService } from './services/auth-service/auth.service';
import { EffectsModule } from '@ngrx/effects';
import { RegisterEffect } from 'src/app/auth/store/effects/register.effect';
import { BackendErrorsMessagesModule } from '../shared/modules/backend-errors-messages/backend-errors-messages.module';
import { PersistenceService } from '../shared/services/persistence/persistence.service';
import { LoginEffect } from './store/effects/login.effect';
import { LoginComponent } from './components/login/login.component';
import { GetCurrentUserEffect } from './store/effects/get-current-user.effect';
import { UpdateCurrentUserEffect } from './store/effects/update-current-user.effect';

const routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([
      RegisterEffect,
      LoginEffect,
      GetCurrentUserEffect,
      UpdateCurrentUserEffect,
    ]),
    BackendErrorsMessagesModule,
  ],
  exports: [RegisterComponent],
  providers: [AuthService, PersistenceService],
})
export class AuthModule {}
