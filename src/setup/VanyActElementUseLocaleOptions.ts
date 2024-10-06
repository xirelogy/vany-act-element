import {
  VanyActuatorOptions,
} from '@xirelogy/vany';

/**
 * Option interface for using a locale in element-plus
 */
export interface VanyActElementUseLocaleOptions extends VanyActuatorOptions {
  /**
   * @inheritdoc
   */
  name: 'use-locale';
  /**
   * Locale code
   */
  locale: string;
}


/**
 * Create a VanyActElementUseLocaleOptions
 * @param locale 
 * @param def 
 * @returns 
 */
export default function createVanyActElementUseLocaleOptions(locale: string): VanyActElementUseLocaleOptions {
  return {
    name: 'use-locale',
    locale: locale,
  }
}