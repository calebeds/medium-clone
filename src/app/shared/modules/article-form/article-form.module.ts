import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { BackendErrorsMessagesModule } from '../backend-errors-messages/backend-errors-messages.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ArticleFormComponent],
  imports: [CommonModule, BackendErrorsMessagesModule, ReactiveFormsModule],
  exports: [ArticleFormComponent],
})
export class ArticleFormModule {}
