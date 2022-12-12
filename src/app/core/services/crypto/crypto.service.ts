import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';
import { config } from 'src/configs/config';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  private _key: crypto.lib.WordArray = crypto.enc.Base64.parse(config.auth.secret);
  private _iv: crypto.lib.WordArray = crypto.enc.Base64.parse(`${config.auth.secret}IV#`);

  constructor() { }

  encrypt(value: string): string {
    const encrypted = crypto.AES.encrypt(value, this._key, { iv: this._iv });
    return encrypted.toString();
  }

  decrypt(value: string): string {
    const decrypted = crypto.AES.decrypt(value, this._key, { iv: this._iv });
    return decrypted.toString(crypto.enc.Utf8);
  }
}