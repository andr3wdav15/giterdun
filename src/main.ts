import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// bootstrap application so that the app config is used
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
