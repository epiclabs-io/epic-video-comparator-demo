import { async, TestBed } from '@angular/core/testing';
import { GestureConfig } from '@angular/material/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from '@app/app.component';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { ComparatorModule } from './features/comparator/comparator.module';
import { ExamplesModule } from './features/examples/examples.module';
import { SharedModule } from './shared/shared.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        SharedModule,
        ComparatorModule,
        ExamplesModule,
        AppRoutingModule,
      ],
      providers: [
        {
          provide: HAMMER_GESTURE_CONFIG,
          useClass: GestureConfig,
        },
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
