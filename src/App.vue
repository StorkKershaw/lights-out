<template>
  <div id="app">
    <locale-button />
    <b-container>
      <b-row>
        <game-cells />
        <game-settings />
      </b-row>
    </b-container>
  </div>
</template>

<script>
import {defineComponent, provide} from '@vue/composition-api';
import gameStore from './stores/game';
import i18nStore from './stores/i18n';
import {gameKey, i18nKey} from './stores/keys';

import {BContainer, BRow} from 'bootstrap-vue';
import GameCells from './components/GameCells';
import GameSettings from './components/GameSettings';
import LocaleButton from './components/LocaleButton';

export default defineComponent({
  components: {
    BContainer,
    BRow,
    GameCells,
    GameSettings,
    LocaleButton,
  },
  setup() {
    provide(gameKey, gameStore());
    provide(i18nKey, i18nStore());
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, "Yu Gothic Medium", "游ゴシック Medium",
    YuGothic, "游ゴシック体", "ヒラギノ角ゴ Pro W3", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 80px;
}
</style>
