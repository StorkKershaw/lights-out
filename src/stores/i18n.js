/* eslint-disable require-jsdoc */

import {reactive} from '@vue/composition-api';
import {i18nDict} from '../libs/i18n-dict';

export default function i18nStore() {
  const config = reactive({
    locale: 'en',
  });

  const setLocale = (locale) => {
    config.locale = i18nDict.has(locale) ? locale : 'en';
  };

  const selectScene = (scene) => {
    return (key) => i18nDict.get(config.locale)?.get(scene)?.get(key) ?? key;
  };

  return {config, setLocale, selectScene};
}
