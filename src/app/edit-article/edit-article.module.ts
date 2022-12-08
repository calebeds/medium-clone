import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditArticleComponent } from './components/edit-article/edit-article.component';
import { ArticleFormModule } from '../shared/modules/article-form/article-form.module';
import { LoadingModule } from '../shared/modules/loading/loading.module';
import { EffectsModule } from '@ngrx/effects';
import { GetArticleEffect } from './store/effects/get-article-effect';
import { UpdateArticleEffect } from './store/effects/update-article.effect';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { EditArticleService } from './services/edit-article/edit-article.service';
import { ArticleService as SharedArticleService } from '../shared/services/article/article.service';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: 'articles/:slug/edit',
    component: EditArticleComponent,
  },
];

@NgModule({
  declarations: [EditArticleComponent],
  imports: [
    CommonModule,
    ArticleFormModule,
    LoadingModule,
    RouterModule.forRoot(routes),
    EffectsModule.forFeature([GetArticleEffect, UpdateArticleEffect]),
    StoreModule.forFeature('editArticle', reducers),
  ],
  providers: [EditArticleService, SharedArticleService],
})
export class EditArticleModule {}
