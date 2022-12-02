import { Component, Input, OnInit } from '@angular/core';
import { utils } from 'protractor';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';

@Component({
  selector: 'mc-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input()
  total = 0;

  @Input()
  limit = 0;

  @Input()
  currentPage = 0;

  @Input()
  url = '';

  pagesCount = 0;

  pages: number[] = [];

  constructor(private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.pagesCount = Math.ceil(this.total / this.limit);
    console.log(this.pagesCount);
    this.pages = this.utilsService.range(1, this.pagesCount);
  }
}
