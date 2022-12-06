import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../shared/services/article/article.service';
import { ArticleComponent } from './components/article/article.component';
import { EffectsModule } from '@ngrx/effects';
import { GetArticleEffect } from './store/effects/get-article.effect';

@NgModule({
  declarations: [ArticleComponent],
  imports: [CommonModule, EffectsModule.forFeature([GetArticleEffect])],
  providers: [ArticleService],
})
export class ArticleModule {}
