import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass',
})
export class HeaderComponent {
  isHomePage: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isHomePage =
      this.router.url === '/' || this.router.url === '/products-overview';
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        ),
        tap((event: NavigationEnd) => {
          this.isHomePage =
            event.url === '/' || event.url === '/products-overview';
        })
      )
      .subscribe();
  }
}
