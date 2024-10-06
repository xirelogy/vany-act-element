import {
  VanyActuatorOptions,
} from '@xirelogy/vany';

import ElementLocaleDefinition from '../interfaces/ElementLocaleDefinition';


/**
 * Option interface for declaring locale in element-plus
 */
export interface VanyActElementDeclareLocaleOptions extends VanyActuatorOptions {
  /**
   * @inheritdoc
   */
  name: 'declare-locale';
  /**
   * Locale code
   */
  locale: string;
  /**
   * Locale definition
   */
  def: ElementLocaleDefinition;
}


/**
 * Create a VanyActElementDeclareLocaleOptions
 * @param locale 
 * @param def 
 * @returns 
 */
export default function createVanyActElementDeclareLocaleOptions(locale: string, def: ElementLocaleDefinition): VanyActElementDeclareLocaleOptions {
  return {
    name: 'declare-locale',
    locale: locale,
    def: def,
  }
}