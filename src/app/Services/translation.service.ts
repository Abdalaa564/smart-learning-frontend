import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TranslationService {
    private currentLanguage: string = 'en';

    constructor() {
        // Load saved language from localStorage
        const savedLang = localStorage.getItem('selectedLanguage');
        if (savedLang) {
            this.currentLanguage = savedLang;
        }
    }

    /**
     * Initialize Google Translate
     */
    initializeGoogleTranslate(): void {
        console.log('Initializing Google Translate...');
        // Don't do anything on init - just let Google Translate load
        // The cookie will be read automatically by Google Translate
    }

    /**
     * Change the translation language using Google Translate cookie method
     * @param langCode Language code (ar, en, de)
     */
    changeLanguage(langCode: string): void {
        console.log('Changing language to:', langCode);

        // Don't reload if already in the target language
        const currentGoogtrans = this.getCookie('googtrans');
        const targetCookie = `/en/${langCode}`;

        if (langCode === 'en' && !currentGoogtrans) {
            console.log('Already in English, no action needed');
            return;
        }

        if (currentGoogtrans === targetCookie) {
            console.log('Already in target language:', langCode);
            return;
        }

        // Save to localStorage
        this.currentLanguage = langCode;
        localStorage.setItem('selectedLanguage', langCode);

        if (langCode === 'en') {
            // Reset to English (original)
            this.setCookie('googtrans', '', -1);
            this.setCookie('googtrans', '', -1, '/');
            window.location.reload();
        } else {
            // Set the Google Translate cookie
            this.setCookie('googtrans', targetCookie, 365);
            this.setCookie('googtrans', targetCookie, 365, '/');

            // Reload the page to apply translation
            window.location.reload();
        }
    }

    /**
     * Get a cookie value
     */
    private getCookie(name: string): string | null {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    /**
     * Set a cookie
     */
    private setCookie(name: string, value: string, days: number, path: string = '/'): void {
        let expires = '';
        if (days > 0) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        } else if (days < 0) {
            // Delete cookie
            expires = '; expires=Thu, 01 Jan 1970 00:00:00 UTC';
        }
        document.cookie = name + '=' + (value || '') + expires + '; path=' + path;
        console.log('Cookie set:', name, '=', value);
    }

    /**
     * Get current selected language
     */
    getCurrentLanguage(): string {
        return this.currentLanguage;
    }
}
