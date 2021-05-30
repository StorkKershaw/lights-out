<template>
  <b-button
    variant="outline-primary"
    :style="button.style"
    @click="handleClick"
  >
    {{ button.face }}
  </b-button>
</template>

<script>
import {
  computed,
  defineComponent,
  inject,
  reactive,
} from '@vue/composition-api';
import {i18nKey} from '../stores/keys';

import {BButton} from 'bootstrap-vue';

export default defineComponent({
  components: {
    BButton,
  },
  setup() {
    const {config, setLocale} = inject(i18nKey);
    setLocale(navigator.language.slice(0, 2).toLowerCase());

    const button = reactive({
      face: computed(() => {
        const [first, ...rest] = config.locale;
        return first.toUpperCase() + rest.join();
      }),
      style: {
        top: '3%',
        right: '5%',
        position: 'fixed',
        zIndex: 1000,
      },
    });

    const handleClick = () => {
      const locale = config.locale === 'en' ? 'ja' : 'en';
      setLocale(locale);
    };

    return {
      button,
      handleClick,
    };
  },
});
</script>
