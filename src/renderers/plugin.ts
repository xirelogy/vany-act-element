import {
  VanyCommonActuatorHandle,
} from '@xirelogy/vany';

import renderApp from './renderApp';
import renderAutocomplete from './renderAutocomplete';
import renderBreadcrumb from './renderBreadcrumb';
import renderBreadcrumbItem from './renderBreadcrumbItem';
import renderButton from './renderButton';
import renderCard from './renderCard';
import renderCheck from './renderCheck';
import renderContainer from './renderContainer';
import renderDateInput from './renderDateInput';
import renderDialog from './renderDialog';
import renderDiv from './renderDiv';
import renderDrawer from './renderDrawer';
import renderDropdownMenu from './renderDropdownMenu';
import renderForm from './renderForm';
import renderFormItem from './renderFormItem';
import renderIcon from './renderIcon';
import renderImageInput from './renderImageInput';
import renderImagesInput from './renderImagesInput';
import renderInput from './renderInput';
import renderInputFrame from './renderInputFrame';
import renderInputGroup from './renderInputGroup';
import renderList from './renderList';
import renderMenu from './renderMenu';
import renderMenuDivider from './renderMenuDivider';
import renderMenuItem from './renderMenuItem';
import renderOption from './renderOption';
import renderProgress from './renderProgress';
import renderRadio from './renderRadio';
import renderRadioGroup from './renderRadioGroup';
import renderSelect from './renderSelect';
import renderTable from './renderTable';
import renderTableColumn from './renderTableColumn';
import renderTabPane from './renderTabPane';
import renderTabs from './renderTabs';
import renderTag from './renderTag';
import renderTimeInput from './renderTimeInput';


/**
 * Initialize all renderers
 * @param handle
 */
export default function initRenderers(handle: VanyCommonActuatorHandle): void {
  renderApp(handle);
  renderAutocomplete(handle);
  renderBreadcrumb(handle);
  renderBreadcrumbItem(handle);
  renderButton(handle);
  renderCard(handle);
  renderCheck(handle);
  renderContainer(handle);
  renderDateInput(handle);
  renderDialog(handle);
  renderDiv(handle);
  renderDrawer(handle);
  renderDropdownMenu(handle);
  renderForm(handle);
  renderFormItem(handle);
  renderIcon(handle);
  renderImageInput(handle);
  renderImagesInput(handle);
  renderInput(handle);
  renderInputFrame(handle);
  renderInputGroup(handle);
  renderList(handle);
  renderMenu(handle);
  renderMenuDivider(handle);
  renderMenuItem(handle);
  renderOption(handle);
  renderProgress(handle);
  renderRadio(handle);
  renderRadioGroup(handle);
  renderSelect(handle);
  renderTable(handle);
  renderTableColumn(handle);
  renderTabPane(handle);
  renderTabs(handle);
  renderTag(handle);
  renderTimeInput(handle);
}