import { ActivatedRoute } from '@angular/router';
import { OnInit, AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Comparator, IComparatorConfig } from '@epiclabs/epic-video-comparator';
import { FormGroup, FormControl, Validators } from '@angular/forms';

interface IPrettyCodeConfig {
  code: string;
  language: string;
  linenums: boolean;
}

interface ICode {
  js: IPrettyCodeConfig;
  html: IPrettyCodeConfig;
  css: IPrettyCodeConfig;
}

interface IExample {
  codeMode: boolean;
  code?: ICode;
  comparatorConfig: IComparatorConfig;
  playerContainerId: string;
  comparator?: Comparator;
}

@Component({
  selector: 'app-comparator',
  templateUrl: './comparator.component.html',
  styleUrls: ['./comparator.component.scss'],
})
export class ComparatorComponent implements OnInit, AfterViewInit, OnDestroy {
  comparator: Comparator;
  comparatorConfig: IComparatorConfig;
  urlsForm: FormGroup;

  leftUrl: string;
  rightUrl: string;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['left'] || params['right']) {
        this.leftUrl = params['left'] || '';
        this.rightUrl = params['right'] || '';
      } else {
        this.leftUrl = 'https://demo.unified-streaming.com/video/tears-of-steel/tears-of-steel.ism/.mpd';
        this.rightUrl = 'https://demo.unified-streaming.com/video/tears-of-steel/tears-of-steel.ism/.mpd';
      }
    });

    this.initForm();
  }

  ngAfterViewInit() {
    this.initPlayer();
  }

  ngOnDestroy() {
    if (this.comparator !== undefined) {
      this.comparator.destroy();
    }
  }

  public reloadComparator(): void {
    if (this.comparator !== undefined) {
      this.comparator.destroy();
    }
    this.initPlayer();
  }

  public shareLink(): void {
    /* Get the text field */
    const leftUrl = this.urlsForm.get('leftUrl').value;
    const rightUrl = this.urlsForm.get('rightUrl').value;
    const shareUrl = `${window.location.href.split('?')[0]}?left=${leftUrl}&right=${rightUrl}`;
    const cb = document.getElementById('cb') as HTMLInputElement;

    cb.value = shareUrl;
    cb.select();
    cb.setSelectionRange(0, cb.value.length); /*For mobile devices*/

    document.execCommand('copy');
  }

  private initForm(): void {
    this.urlsForm = new FormGroup({
      leftUrl: new FormControl(this.leftUrl, Validators.required),
      rightUrl: new FormControl(this.rightUrl, Validators.required),
    });
  }

  private initPlayer(): void {
    const config: IComparatorConfig = {
      leftUrl: this.urlsForm.get('leftUrl').value,
      rightUrl: this.urlsForm.get('rightUrl').value,
    };
    const container = document.getElementById('comparator-container') as HTMLDivElement;
    this.comparator = new Comparator(config, container);
  }
}
