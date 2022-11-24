import { Component, Input, OnInit } from '@angular/core';
import { BackendErrorsInterface } from 'src/app/shared/types/backend-errors-interface';

@Component({
  selector: 'mc-backend-error-messages',
  templateUrl: './backend-error-messages.component.html',
  styleUrls: ['./backend-error-messages.component.scss'],
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input()
  backendErrors!: BackendErrorsInterface | null;

  errorMessages: string[] = [];

  ngOnInit(): void {
    this.errorMessages = this.backendErrors
      ? Object.keys(this.backendErrors).map((name: string) => {
          const messages = this.backendErrors![name].join(' ');
          return `${messages}`;
        })
      : [];
  }
}
