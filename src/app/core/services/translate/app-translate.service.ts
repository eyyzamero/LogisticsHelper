import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageKind } from 'src/app/core/enums';
import defaultLanguageRef from 'src/assets/i18n/en.json';

const DEFAULT_LANG: LanguageKind = LanguageKind.EN;
const LOCAL_STORAGE_LANGUAGE_KEY: string = 'lng';

@Injectable({
	providedIn: 'root'
})
export class AppTranslateService {

	get defaultLang(): LanguageKind {
		return this._translateService.defaultLang as LanguageKind;
	}

	get currentLang(): LanguageKind {
		return (this._translateService.currentLang ?? this.defaultLang) as LanguageKind;
	}

	constructor(
		private _translateService: TranslateService
	) { }

	setDefaultLang(language: LanguageKind) {
		this._translateService.setTranslation(DEFAULT_LANG, defaultLanguageRef);
		this._translateService.setDefaultLang(language);
	}

	use(language: LanguageKind) {
		const browserLang = this._translateService.getBrowserLang() ?? DEFAULT_LANG;

		try {
			if (language)
				localStorage.setItem(LOCAL_STORAGE_LANGUAGE_KEY, language);

			const langLocalStorage = localStorage.getItem(LOCAL_STORAGE_LANGUAGE_KEY);
			const lang = langLocalStorage ?? browserLang;

			this._translateService.use(lang);
		} catch (e) {
			this._translateService.use(language ? language: browserLang)
		}
	}
}