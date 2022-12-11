import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';
import { config } from 'src/configs/config';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  encrypt(value: string) {
    return crypto.AES.encrypt(value, config.auth.secret).toString();
  }

  decrypt(value: string) {
    return crypto.AES.decrypt(value, config.auth.secret).toString(crypto.enc.Utf8);
  }
}