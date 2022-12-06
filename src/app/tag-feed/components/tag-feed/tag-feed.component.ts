import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'mc-tag-feed',
  templateUrl: './tag-feed.component.html',
  styleUrls: ['./tag-feed.component.scss'],
})
export class TagFeedComponent implements OnInit {
  tagName!: string | null;
  apiUrl = '';

  constructor(private route: ActivatedRoute, private router: Router) {
    // this.router.events.subscribe(() => {
    //   this.tagName = this.route.snapshot.paramMap.get('slug');
    //   this.apiUrl = `/articles?tag=${this.tagName}`;
    // });
  }

  ngOnInit(): void {
    this.tagName = this.route.snapshot.paramMap.get('slug');
    this.apiUrl = `/articles?tag=${this.tagName}`;
  }
}
