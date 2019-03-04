import { AfterViewInit, Component } from '@angular/core';
import { routerTransition } from '@app/core/animations/router.transition';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition],
})
export class AppComponent implements AfterViewInit {
  year = (new Date).getFullYear();

  socialNetworks = [
    {
      title: 'Epic Labs',
      faIcon: 'fa fa-2x fa-globe',
      url: 'https://www.epiclabs.io/',
    },
    {
      title: 'Github',
      faIcon: 'fa fa-2x fa-github',
      url: 'https://github.com/epiclabs-io',
    }, {
      title: 'Twitter',
      faIcon: 'fa fa-2x fa-twitter',
      url: 'https://twitter.com/epiclabs_io',
    }, {
      title: 'LinkedIn',
      faIcon: 'fa fa-2x fa-linkedin',
      url: 'https://www.linkedin.com/company/epiclabs-io/',
    }
  ];

  ngAfterViewInit() {
    console.log('%c Coded with %c♥️ %cby %cepic%c>%clabs',
      'background: #000; color: #fff; line-height: 35px; padding: 10px 0 10px 20px;',
      'background: #000; color: #f00; font-weight: bold; line-height: 35px; padding: 10px 0;',
      'background: #000; color: #fff; font-weight: normal; line-height: 35px; padding: 10px 0;',
      'background: #000; color: #fff; font-weight: bold; line-height: 35px; padding: 10px 0;',
      'background: #000; color: #fad000; font-weight: bold; line-height: 35px; padding: 10px 0;',
      'background: #000; color: #80bd01; font-weight: bold; line-height: 35px; padding: 10px 20px 10px 0;');
  }
}
