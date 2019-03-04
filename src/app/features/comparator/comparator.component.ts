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

  constructor() {
  }

  ngOnInit() {
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

  private initForm(): void {
    this.urlsForm = new FormGroup({
      leftUrl: new FormControl('https://demo.unified-streaming.com/video/tears-of-steel/tears-of-steel.ism/.mpd', Validators.required),
      rightUrl: new FormControl('https://demo.unified-streaming.com/video/tears-of-steel/tears-of-steel.ism/.mpd', Validators.required),
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
