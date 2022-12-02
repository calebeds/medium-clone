import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppStateInterface } from 'src/app/shared/types/app-state.interface';
import { environment } from 'src/environments/environment';
import { getFeedAction } from '../../store/actions/get-feed.action';
import {
  errorSelector,
  feedSelector,
  isLoadingSelector,
} from '../../store/selectors';
import { GetFeedResponseInterface } from '../../types/get-feed-response.interface';

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, OnDestroy {
  @Input()
  apiUrl = '';

  feed$!: Observable<GetFeedResponseInterface | null>;
  error$!: Observable<string | null>;
  isLoading$!: Observable<boolean>;
  limit = environment.limit;
  baseUrl = '';
  queryParamsSubscription!: Subscription;
  currentPage!: number;

  constructor(
    private store: Store<AppStateInterface>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }

  initializeListeners(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params: Params) => {
        this.currentPage = Number(params.page || '1');
      }
    );
  }

  initializeValues(): void {
    this.feed$ = this.store.pipe(select(feedSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.baseUrl = this.router.url.split('?')[0];
  }

  fetchData(): void {
    this.store.dispatch(getFeedAction({ url: this.apiUrl }));
  }
}
