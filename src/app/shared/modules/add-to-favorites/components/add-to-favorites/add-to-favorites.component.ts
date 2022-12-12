import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/types/app-state.interface';
import { addToFavoritesAction } from '../../store/actions/add-to-favorites.action';

@Component({
  selector: 'mc-add-to-favorites',
  templateUrl: './add-to-favorites.component.html',
  styleUrls: ['./add-to-favorites.component.scss'],
})
export class AddToFavoritesComponent implements OnInit {
  @Input()
  isFavorited = false;

  @Input()
  articleSlug = '';

  @Input()
  favoritesCount = 0;

  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {}

  handleLike(): void {
    this.store.dispatch(
      addToFavoritesAction({
        isFavorited: this.isFavorited,
        slug: this.articleSlug,
      })
    );

    if (this.isFavorited) {
      this.favoritesCount = this.favoritesCount - 1;
    } else {
      this.favoritesCount = this.favoritesCount + 1;
      console.log(this.favoritesCount);
    }

    this.isFavorited = !this.isFavorited;
  }
}
