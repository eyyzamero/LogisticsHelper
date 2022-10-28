import { FirebaseOptions } from "@angular/fire/app";

export type Config = {
  production: boolean;
  version: string;
  firebase: FirebaseOptions;
}