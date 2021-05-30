<template>
  <div id="app">
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
import {gameKey} from './stores/keys';

import {BContainer, BRow} from 'bootstrap-vue';
import GameCells from './components/GameCells';
import GameSettings from './components/GameSettings';

export default defineComponent({
  components: {
    BContainer,
    BRow,
    GameCells,
    GameSettings,
  },
  setup() {
    provide(gameKey, gameStore());
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
