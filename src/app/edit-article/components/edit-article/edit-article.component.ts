import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, take, takeLast, takeUntil, tap } from 'rxjs/operators';
import { AppStateInterface } from 'src/app/shared/types/app-state.interface';
import { ArticleInputInterface } from 'src/app/shared/types/article-input.interface';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backend-errors-interface';
import { getArticleAction } from '../../store/actions/get-article.action';
import { updateArticleAction } from '../../store/actions/update-article.action';
import {
  articleSelector,
  isLoadingSelector,
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors';

@Component({
  selector: 'mc-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss'],
})
export class EditArticleComponent implements OnInit {
  initialValues$!: Observable<ArticleInputInterface | null>;

  slug: string | null = '';

  isSubmitting$!: Observable<boolean>;
  backendErrors$!: Observable<BackendErrorsInterface | null>;
  isLoading$!: Observable<boolean>;

  constructor(
    private store: Store<AppStateInterface>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeValue();
    this.fetchData();
  }
  initializeValue() {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    this.initialValues$ = this.store.pipe(
      select(articleSelector),
      filter((article) => !!article),
      tap((article) => {
        console.log(article);
      }),
      map((article) => {
        return {
          title: article?.title,
          description: article?.description,
          body: article?.body,
          tagList: article?.tagList,
        } as ArticleInputInterface;
      })
    );
  }

  fetchData() {
    this.store.dispatch(getArticleAction({ slug: <string>this.slug }));
  }

  onSubmit(articleInput: ArticleInputInterface) {
    this.store.dispatch(
      updateArticleAction({ slug: <string>this.slug, articleInput })
    );
  }
}
