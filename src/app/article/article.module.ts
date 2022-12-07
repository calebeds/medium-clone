import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleService as SharedArticleService } from '../shared/services/article/article.service';
import { ArticleComponent } from './components/article/article.component';
import { EffectsModule } from '@ngrx/effects';
import { GetArticleEffect } from './store/effects/get-article.effect';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { RouterModule } from '@angular/router';
import { LoadingModule } from '../shared/modules/loading/loading.module';
import { ErrorMessageModule } from '../shared/modules/error-message/error-message.module';
import { TagListModule } from '../shared/modules/tag-list/tag-list.module';
import { DeleteArticleEffect } from './store/effects/delete-article.effect';
import { ArticleService } from './services/article/article.service';

const routes = [{ path: 'articles/:slug', component: ArticleComponent }];

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetArticleEffect, DeleteArticleEffect]),
    StoreModule.forFeature('article', reducers),
    RouterModule.forChild(routes),
    LoadingModule,
    ErrorMessageModule,
    TagListModule,
  ],
  providers: [SharedArticleService, ArticleService],
})
export class ArticleModule {}
