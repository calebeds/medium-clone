import { Component, Input, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {}

  handleLike(): void {
    //TODO: dispatch like or dislike
    if (this.isFavorited) {
      this.favoritesCount = this.favoritesCount - 1;
    } else {
      this.favoritesCount = this.favoritesCount + 1;
      console.log(this.favoritesCount);
    }

    this.isFavorited = !this.isFavorited;
  }
}
