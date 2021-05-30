<template>
  <b-col md="6" class="mt-5 mt-md-1">
    <h4>Settings</h4>
    <b-form-group label-cols="5" label="Difficulty">
      <b-input-group>
        <template #append>
          <b-button
            :disabled="form.newGameDisabled"
            variant="outline-primary"
            @click="initialize(form.difficulty)"
          >
            New Game
          </b-button>
        </template>
        <b-form-select v-model="form.difficulty" :options="form.difficulties" />
      </b-input-group>
    </b-form-group>
    <b-form-group label-cols="5" label="Cheat">
      <b-form-checkbox
        v-model="game.cheatEnabled"
        :disabled="form.toggleCheatDisabled"
        switch
        size="lg"
        @change="handleCheatChange"
      />
    </b-form-group>
    <template v-if="game.cheatEnabled">
      <b-form-group label-cols="5" label="Solution">
        <b-form-checkbox
          v-model="game.showSolution"
          :disabled="form.toggleSolutionDisabled"
          switch
          size="lg"
        />
      </b-form-group>
      <b-form-group label-cols="5" label="Solution kind">
        {{ game.solutionKind }}
      </b-form-group>
      <b-form-group label-cols="5" label="Refine solution">
        <b-button
          :disabled="form.refineSolutionDisabled"
          variant="outline-primary"
          @click="updateSolution"
        >
          Execute
        </b-button>
      </b-form-group>
      <b-form-group label-cols="5" label="Edit cells">
        <b-form-checkbox
          v-model="game.cellEditing"
          :disabled="form.toggleEditDisabled"
          switch
          size="lg"
          @change="handleEditChange"
        />
      </b-form-group>
      <b-form-group label-cols="5" label="Auto solve">
        <b-button
          :disabled="form.autoSolveDisabled"
          variant="outline-primary"
          @click="autoSolve"
        >
          Execute
        </b-button>
      </b-form-group>
    </template>
  </b-col>
</template>

<script>
import {
  computed,
  defineComponent,
  inject,
  reactive,
} from '@vue/composition-api';
import {range} from '../libs/range';
import {gameKey} from '../stores/keys';

import {
  BButton,
  BCol,
  BFormCheckbox,
  BFormGroup,
  BFormSelect,
  BInputGroup,
} from 'bootstrap-vue';

export default defineComponent({
  components: {
    BButton,
    BCol,
    BFormCheckbox,
    BFormGroup,
    BFormSelect,
    BInputGroup,
  },
  setup() {
    const {
      game,
      initialize,
      updateSolution,
      handleCheatChange,
      handleEditChange,
      autoSolve,
    } = inject(gameKey);

    const form = reactive({
      difficulty: game.size,
      difficulties: Array.from(range(3, 21)),

      newGameDisabled: computed(() => game.autoSolving),
      toggleCheatDisabled: computed(() => game.autoSolving),
      toggleSolutionDisabled: computed(() => game.cellEditing),
      refineSolutionDisabled: computed(() => [
        game.solutionKind !== 'multiple',
        game.cellEditing,
        game.autoSolving,
      ].some(Boolean)),
      toggleEditDisabled: computed(() => game.autoSolving),
      autoSolveDisabled: computed(() => [
        game.solutionKind === 'none',
        game.cellEditing,
        game.solved,
        game.autoSolving,
      ].some(Boolean)),
    });

    return {
      form,
      game,
      initialize,
      updateSolution,
      handleCheatChange,
      handleEditChange,
      autoSolve,
    };
  },
});
</script>
