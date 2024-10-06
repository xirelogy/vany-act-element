import {
  xw,
} from '@xirelogy/xwts';

import ElementLocaleDefinition from '../interfaces/ElementLocaleDefinition';


/**
 * Locale related singleton services
 */
export interface LocaleSingleton {
  /**
   * Declare a locale
   * @param locale
   * @param def
   */
  declare(locale: string, def: ElementLocaleDefinition): void;

  /**
   * Access to locale definition
   * @param locale
   * @returns
   */
  access(locale: string): ElementLocaleDefinition|null;

  /**
   * Access to current locale definition
   * @returns
   */
  accessCurrent(): ElementLocaleDefinition|null;

  /**
   * Specify specific current locale to be overriden and use
   * @param locale
   */
  overrideCurrent(locale: string): void;
}


/**
 * Create specific locale key
 * @param locale
 * @returns
 */
function makeLocaleKey(locale: string): string {
  return locale.trim().toLowerCase();
}


/**
 * Locale storage
 */
const localeSingletonStorage = (function () {
  var instance: LocaleSingleton|null;


  function createInstance() {
    return new class implements LocaleSingleton {
      /**
       * Specific locale to override
       */
      private _overrideLocale: string|null = null;
      /**
       * Map of all locales
       */
      private _locales: Record<string, ElementLocaleDefinition> = {};

      /**
       * @inheritdoc
       */
      declare(locale: string, def: ElementLocaleDefinition): void {
        const _locale = makeLocaleKey(locale);
        this._locales[_locale] = def;
      }

      /**
       * @inheritdoc
       */
      access(locale: string): ElementLocaleDefinition|null {
        const _locale = makeLocaleKey(locale);
        return this._locales[_locale] ?? null;
      }

      /**
       * @inheritdoc
       */
      accessCurrent(): ElementLocaleDefinition|null {
        // Try to use override
        if (this._overrideLocale !== null) {
          const tryOverride = this.access(this._overrideLocale);
          if (tryOverride !== null) return tryOverride;
        }

        // Fallback to use xw selected locale
        return this.access(xw.i18n.currentLocale);
      }

      /**
       * @inheritdoc
       */
      overrideCurrent(locale: string): void {
        this._overrideLocale = locale;
      }
    };
  }

  return {
    getInstance: () => {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  }
})();


/**
 * Access to the locale singleton
 * @returns
 */
export function getLocaleSingleton() {
  return localeSingletonStorage.getInstance();
}