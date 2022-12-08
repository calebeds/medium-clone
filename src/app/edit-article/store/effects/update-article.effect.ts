import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { EditArticleService } from '../../services/edit-article/edit-article.service';
import {
  updateArticleAction,
  updateArticleFailureAction,
  updateArticleSuccessAction,
} from '../actions/update-article.action';

@Injectable()
export class UpdateArticleEffect {
  updateArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateArticleAction),
      switchMap(({ slug, articleInput }) =>
        this.editArticleService.updateArticle(slug, articleInput).pipe(
          map((article: ArticleInterface) =>
            updateArticleSuccessAction({ article })
          ),

          catchError((error: HttpErrorResponse) =>
            of(updateArticleFailureAction({ errors: error.error.errors }))
          )
        )
      )
    )
  );

  redirectAfterUpdate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateArticleSuccessAction),
        tap(({ article }) => this.router.navigate(['/articles', article.slug]))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private editArticleService: EditArticleService,
    private router: Router
  ) {}
}
