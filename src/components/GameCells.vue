<template>
  <b-col md="6" class="mt-1 mt-md-5" style="line-height: 0.7">
    <template
      v-for="([cell, solution], index) in zip(game.cellsArray, game.solution)"
    >
      <b-img
        class="border"
        blank
        rounded="circle"
        :key="`cell__${index}`"
        :blank-color="cell ? 'white' : 'black'"
        :style="board.solutionShown && solution ? board.solutionStyle : {}"
        :width="board.cellSize"
        :height="board.cellSize"
        @click="handleClick(index)"
      />
      <br v-if="(index + 1) % game.size === 0" :key="`cell-br__${index}`" />
    </template>
    <h5 class="mt-2" style="height: 1em">
      {{ game.solved ? "Nice!" : "" }}
    </h5>
  </b-col>
</template>

<script>
import {
  computed,
  defineComponent,
  inject,
  reactive,
} from '@vue/composition-api';
import {gameKey} from '../stores/keys';
import {zip} from '../libs/zip';

import {BCol, BImg} from 'bootstrap-vue';

export default defineComponent({
  components: {
    BCol,
    BImg,
  },
  setup() {
    const {
      game,
      initialize,
      handleClick,
    } = inject(gameKey);

    initialize(3);

    const board = reactive({
      cellSize: computed(() => Math.min(300 / game.size, 75)),
      solutionShown: computed(() => [
        game.cheatEnabled,
        game.showSolution,
        !game.cellEditing,
      ].every(Boolean)),
      borderWidth: computed(() => Math.max(board.cellSize / 20, 2)),
      solutionStyle: computed(() => ({
        borderWidth: `${board.borderWidth}px !important`,
        borderColor: '#007bff !important',
      })),
    });

    return {
      board,
      zip,
      game,
      handleClick,
    };
  },
});
</script>
