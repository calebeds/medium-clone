import { Component, Input, OnInit } from '@angular/core';
import { ArticleInputInterface } from 'src/app/shared/types/article-input.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backend-errors-interface';

@Component({
  selector: 'mc-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
})
export class ArticleFormComponent implements OnInit {
  @Input()
  initialValue!: ArticleInputInterface;

  @Input()
  isSubmitting!: boolean;

  @Input()
  errors!: BackendErrorsInterface | null;

  constructor() {}

  ngOnInit(): void {}
}
