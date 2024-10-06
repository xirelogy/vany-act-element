import {
  _used,
} from '@xirelogy/xwts';

import {
  App,
} from 'vue';

import {
  VanyActuator,
  VanyActuatorHandle,
  VanyActuatorOptions,
  VanyCommonActuatorHandle,
} from '@xirelogy/vany';

import { VanyActElementDeclareLocaleOptions } from './VanyActElementDeclareLocaleOptions';
import { VanyActElementUseLocaleOptions } from './VanyActElementUseLocaleOptions';
import { getLocaleSingleton } from '../internals/LocaleSingleton';

import '../../styles/vany-standard.scss';
import '../../styles/import-element.scss';
import '../../styles/patch-element.scss';

import initRenderers from '../renderers/plugin';
import initDirectives from '../directives/plugin';
import initReactors from '../reactors/plugin';
import initServices from '../services/plugin';

const plugin: VanyActuator = {
  /**
   * @inheritdoc
   */
  install(app: App<any>, options: VanyActuatorOptions[]): VanyActuatorHandle {
    _used(app);

    // Create handle and initialize handle
    const handle = new VanyCommonActuatorHandle('vany-act-element');
    initRenderers(handle);
    initDirectives(handle);
    initReactors(handle);
    initServices(handle);

    // Process the options
    for (const option of options) {
      switch (option.name) {
        case 'declare-locale':
          {
            const specOption = option as VanyActElementDeclareLocaleOptions;
            getLocaleSingleton().declare(specOption.locale, specOption.def);
          }
          break;
        case 'use-locale':
          {
            const specOption = option as VanyActElementUseLocaleOptions;
            getLocaleSingleton().overrideCurrent(specOption.locale);
          }
          break;
      }
    }

    return handle;
  }
}

export default plugin;