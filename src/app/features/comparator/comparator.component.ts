import { ActivatedRoute } from '@angular/router';
import { OnInit, AfterViewInit, Component, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Comparator, IComparatorConfig } from '@epiclabs/epic-video-comparator';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

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

  @ViewChild('cbInput', {static: false}) cbInputRef: ElementRef<HTMLInputElement>;

  constructor(private activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar) {
    // nothing to see here
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
    const cbInputElement = this.cbInputRef.nativeElement;

    cbInputElement.value = shareUrl;
    cbInputElement.select();
    cbInputElement.setSelectionRange(0, cbInputElement.value.length); /*For mobile devices*/

    const snackBarConfig = {
      duration: 3000,
      panelClass: 'cb-snack-panel',
    };

    try {
      document.execCommand('copy');
      this.snackBar.open('Copied to clipboard!', null, snackBarConfig);
    } catch (err) {
      this.snackBar.open('Unable to copy to clipboard', null, snackBarConfig);
    }
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
