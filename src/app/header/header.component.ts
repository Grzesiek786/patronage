import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public links: any[];
  public activeLinkIndex: number = -1;

  constructor(private router: Router) {
    this.links = [
      {
        label: 'Users',
        link: './users',
        index: 0,
      },
      {
        label: 'Form',
        link: './addUser',
        index: 1,
      },
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.links.indexOf(
        this.links.find((tab) => tab.link === '.' + this.router.url)
      );
    });
  }
}
