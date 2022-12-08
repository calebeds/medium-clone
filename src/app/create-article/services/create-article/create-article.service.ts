import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArticleInputInterface } from 'src/app/shared/types/article-input.interface';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { SaveArticleResponseInterface } from 'src/app/shared/types/save-article-response.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class CreateArticleService {
  constructor(private http: HttpClient) {}

  createArticle(
    articleInput: ArticleInputInterface
  ): Observable<ArticleInterface> {
    const fullUrl = environment.apiUrl + '/articles';
    return this.http
      .post<SaveArticleResponseInterface>(fullUrl, {
        article: articleInput,
      })
      .pipe(map((res: SaveArticleResponseInterface) => res.article));
  }
}
