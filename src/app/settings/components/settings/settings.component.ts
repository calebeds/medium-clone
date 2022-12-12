import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { logoutAction } from 'src/app/auth/store/actions/sync.action';
import { updateCurrentUserAction } from 'src/app/auth/store/actions/update-current-user.action';
import { currentUserSelector } from 'src/app/auth/store/selectors';
import { AppStateInterface } from 'src/app/shared/types/app-state.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backend-errors-interface';
import { CurrentUserInputInterface } from 'src/app/shared/types/current-user-input.interface';
import { CurrentUserInterface } from 'src/app/shared/types/current-user.interface';
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors';

@Component({
  selector: 'mc-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  currentUserSubscription!: Subscription;
  currentUser!: CurrentUserInterface;
  isSubmitting$!: Observable<boolean>;
  backendErrors$!: Observable<BackendErrorsInterface | null>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateInterface>
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
    // this.initializeForm();
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

  initializeValues() {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  initializeListeners() {
    this.currentUserSubscription = this.store
      .pipe(
        select(currentUserSelector),
        filter(
          (currentUser: CurrentUserInterface | null) => currentUser != null
        )
      )
      .subscribe((currentUser: CurrentUserInterface | null) => {
        this.currentUser = <CurrentUserInterface>currentUser;
        this.initializeForm();
      });
  }

  initializeForm(): void {
    console.log(this.currentUser);
    this.form = this.fb.group({
      image: this.currentUser.image,
      username: this.currentUser.username,
      bio: this.currentUser.bio,
      email: this.currentUser.email,
      password: '',
    });
  }

  submit(): void {
    const currentUserInput: CurrentUserInputInterface = {
      ...this.currentUser,
      ...this.form.value,
    };

    this.store.dispatch(updateCurrentUserAction({ currentUserInput }));
  }

  logout(): void {
    this.store.dispatch(logoutAction());
  }
}
