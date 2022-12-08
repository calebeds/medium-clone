import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ArticleInputInterface } from 'src/app/shared/types/article-input.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backend-errors-interface';

@Component({
  selector: 'mc-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
})
export class ArticleFormComponent implements OnInit {
  @Input()
  initialValues$!: Observable<ArticleInputInterface | null>;

  @Input()
  isSubmitting!: boolean | null;

  @Input()
  errors!: BackendErrorsInterface | null;

  @Output()
  articleSubmitEvent = new EventEmitter<ArticleInputInterface>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.initialValues$.subscribe((article) => {
      this.form = this.fb.group({
        title: article?.title,
        description: article?.description,
        body: article?.body,
        tagList: article?.tagList.join(' '),
      });
    });
    // this.form = this.fb.group({
    //   title: this.initialValues$?.title,
    //   description: this.initialValues$?.description,
    //   body: this.initialValues$?.body,
    //   tagList: this.initialValues$?.tagList.join(' '),
    // });
  }

  onSubmit(): void {
    const tagList: string[] = [this.form.value.tagList.split(' ')];
    const formValues = { ...(<ArticleInputInterface>this.form.value), tagList };

    this.articleSubmitEvent.emit(formValues);
  }
}
