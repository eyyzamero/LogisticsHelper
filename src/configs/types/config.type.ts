import { FirebaseOptions } from '@angular/fire/app';
import { AuthConfig } from '.';

export type Config = {
  production: boolean;
  version: string;
  firebase: FirebaseOptions;
  auth: AuthConfig
}