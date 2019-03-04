import { routerTransition } from '@app/core/animations/router.transition';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition],
})
export class AppComponent {
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
}
