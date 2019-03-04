import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Comparator, IComparatorConfig } from '@epiclabs/epic-video-comparator';

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
  extraCode?: (comparator: Comparator) => void;
  intervalFn?: any;
  comparator?: Comparator;
  comparatorConfig: IComparatorConfig;
  playerContainerId: string;
  title: string;
}

@Component({
  selector: 'app-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
})
export class ExamplesComponent implements OnInit, AfterViewInit {
  comparator: Comparator;
  comparatorConfig: IComparatorConfig;
  examples: IExample[] = [];

  constructor() {
  }

  ngOnInit() {
    this.initExamples();
  }

  ngAfterViewInit() {
    for (let i = 0; i < this.examples.length; i++) {
      this.initExample(i);
    }
  }

  public toggleCodeMode(index: number) {
    this.examples[index].codeMode = !this.examples[index].codeMode;

    if (this.examples[index].codeMode === true) {
      this.destroyExample(index);
    } else {
      setTimeout(() => {
        this.initExample(index);
      }, 100);
    }
  }

  public play(index: number) {
    this.examples[index].comparator.play();
  }

  public pause(index: number) {
    this.examples[index].comparator.pause();
  }

  private initExamples(): void {
    this.examples = [{
      codeMode: false,
      code: {
        js: {
          code: `
          var comparatorConfig = {
            leftUrl: 'https://demo.unified-streaming.com/video/tears-of-steel/tears-of-steel.ism/.mpd',
            rightUrl: 'https://demo.unified-streaming.com/video/tears-of-steel/tears-of-steel.ism/.mpd',
            autoplay: false,
          };

          var comparatorContainer = document.getElementById('example-0-comparator-container');

          var comparator = new Comparator(comparatorConfig, comparatorContainer);
          `,
          language: 'js',
          linenums: false,
        },
        html: {
          code: '<div id="example-0-comparator-container"></div>',
          language: 'html',
          linenums: false,
        },
        css: {
          code: `
          .example-card {
            width: 700px;
          }
          `,
          language: 'css',
          linenums: false,
        },
      },
      comparatorConfig: {
        leftUrl: 'https://demo.unified-streaming.com/video/tears-of-steel/tears-of-steel.ism/.mpd',
        rightUrl: 'https://demo.unified-streaming.com/video/tears-of-steel/tears-of-steel.ism/.mpd',
        autoplay: false,
      },
      playerContainerId: 'example-0-comparator-container',
      title: 'Basic example',
    },
    {
      codeMode: false,
      code: {
        js: {
          code: `
          var comparator;

          function play() {
            comparator.play();
          }

          function pause() {
            comparator.pause();
          }

          var comparatorConfig = {
            autoplay: false,
            leftUrl: 'https://demo.unified-streaming.com/video/tears-of-steel/tears-of-steel.ism/.mpd',
            rightUrl: 'https://demo.unified-streaming.com/video/tears-of-steel/tears-of-steel.ism/.mpd',
            stats: false,
            mediaControls: false,
          };

          var comparatorContainer = document.getElementById('example-1-comparator-container');

          comparator = new Comparator(comparatorConfig, comparatorContainer);
          `,
          language: 'js',
          linenums: false,
        },
        html: {
          code: `
          <div id="example-1-comparator-container"></div>
          <button onclick="play()">play</button>
          <button onclick="pause()">pause</button>
          `,
          language: 'html',
          linenums: false,
        },
        css: {
          code: `
          .example-card {
            width: 700px;
          }
          `,
          language: 'css',
          linenums: false,
        },
      },
      comparatorConfig: {
        autoplay: false,
        leftUrl: 'https://demo.unified-streaming.com/video/tears-of-steel/tears-of-steel.ism/.mpd',
        rightUrl: 'https://demo.unified-streaming.com/video/tears-of-steel/tears-of-steel.ism/.mpd',
        stats: false,
        mediaControls: false,
      },
      playerContainerId: 'example-1-comparator-container',
      title: 'Custom controls',
    },
    {
      codeMode: false,
      code: {
        js: {
          code: `
          var comparatorConfig = {
            autoplay: false,
            leftUrl: 'https://demo.unified-streaming.com/video/tears-of-steel/tears-of-steel.ism/.mpd',
            rightUrl: 'https://demo.unified-streaming.com/video/tears-of-steel/tears-of-steel.ism/.mpd',
            stats: {
              custom: true,
            },
          };

          var comparatorContainer = document.getElementById('example-2-comparator-container');

          var comparator = new Comparator(comparatorConfig, comparatorContainer);

          setInterval(function() {
            comparator.updateStats('LEFT: ' + new Date().getSeconds(), 'RIGHT: ' + new Date().getSeconds());
          }, 1000);
          `,
          language: 'js',
          linenums: false,
        },
        html: {
          code: '<div id="example-2-comparator-container"></div>',
          language: 'html',
          linenums: false,
        },
        css: {
          code: `
          .example-card {
            width: 700px;
          }
          `,
          language: 'css',
          linenums: false,
        },
      },
      comparatorConfig: {
        autoplay: false,
        leftUrl: 'https://demo.unified-streaming.com/video/tears-of-steel/tears-of-steel.ism/.mpd',
        rightUrl: 'https://demo.unified-streaming.com/video/tears-of-steel/tears-of-steel.ism/.mpd',
        stats: {
          custom: true,
        },
      },
      playerContainerId: 'example-2-comparator-container',
      title: 'Custom stats',
    }];

    this.examples[2].extraCode = (comparator: Comparator) => {
      this.examples[2].intervalFn = setInterval(() => {
        comparator.updateStats('LEFT: ' + new Date().getSeconds(), 'RIGHT: ' + new Date().getSeconds());
      }, 1000);
    };
  }

  private initExample(index: number): void {
    const config = this.examples[index].comparatorConfig;
    const container = document.getElementById(this.examples[index].playerContainerId) as HTMLDivElement;
    this.examples[index].comparator = new Comparator(config, container);
    if (this.examples[index].extraCode !== undefined) {
      this.examples[index].extraCode(this.examples[index].comparator);
    }
  }

  private destroyExample(index: number): void {
    if (this.examples[index].intervalFn) {
      clearInterval(this.examples[index].intervalFn);
    }
    this.examples[index].comparator.destroy();
  }
}
