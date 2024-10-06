import {
  h,
} from 'vue';

import {
  VanyCommonActuatorHandle,
  VanyAutocompleteRenderRequest,
  VanyRenderRequest,
} from '@xirelogy/vany';

import ElementAutocomplete from '../components/ElementAutocomplete.vue';


/**
 * Rendering function
 * @param request Rendering request
 */
const renderAutocomplete = (request: VanyRenderRequest) => {
  const specRequest = request as VanyAutocompleteRenderRequest;

  return h(ElementAutocomplete, {
    specRequest,
  }, {});
};


/**
 * Register function
 * @param handle
 */
export default function register(handle: VanyCommonActuatorHandle): void {
  handle.registerRenderer('autocomplete', renderAutocomplete);
}