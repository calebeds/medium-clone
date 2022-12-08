import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/shared/types/app-state.interface';
import { ArticleInputInterface } from 'src/app/shared/types/article-input.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backend-errors-interface';
import { createArticleAction } from '../../store/actions/create-article.action';
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors';

@Component({
  selector: 'mc-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
})
export class CreateArticleComponent implements OnInit {
  initialValues: ArticleInputInterface = {
    title: '',
    description: '',
    body: '',
    tagList: [''],
  };

  isSubmitting$!: Observable<boolean>;
  backendErrors$!: Observable<BackendErrorsInterface | null>;

  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  onSubmit(articleInput: ArticleInputInterface) {
    console.log(articleInput);

    this.store.dispatch(createArticleAction({ articleInput }));
  }
}
