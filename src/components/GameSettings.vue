<template>
  <b-col md="6" class="mt-5 mt-md-1">
    <h4>{{ i18n("settings") }}</h4>
    <b-form-group label-cols="5" :label="i18n('difficulty')">
      <b-input-group>
        <template #append>
          <b-button
            :disabled="form.newGameDisabled"
            variant="outline-primary"
            @click="initialize(form.difficulty)"
          >
            {{ i18n("newGame") }}
          </b-button>
        </template>
        <b-form-select v-model="form.difficulty" :options="form.difficulties" />
      </b-input-group>
    </b-form-group>
    <b-form-group label-cols="5" :label="i18n('cheat')">
      <b-form-checkbox
        v-model="game.cheatEnabled"
        :disabled="form.toggleCheatDisabled"
        switch
        size="lg"
        @change="handleCheatChange"
      />
    </b-form-group>
    <template v-if="game.cheatEnabled">
      <b-form-group label-cols="5" :label="i18n('solution')">
        <b-form-checkbox
          v-model="game.showSolution"
          :disabled="form.toggleSolutionDisabled"
          switch
          size="lg"
        />
      </b-form-group>
      <b-form-group label-cols="5" :label="i18n('solutionKind')">
        {{ i18n(game.solutionKind) }}
      </b-form-group>
      <b-form-group label-cols="5" :label="i18n('refineSolution')">
        <b-button
          :disabled="form.refineSolutionDisabled"
          variant="outline-primary"
          @click="updateSolution"
        >
          {{ i18n("execute") }}
        </b-button>
      </b-form-group>
      <b-form-group label-cols="5" :label="i18n('editCells')">
        <b-form-checkbox
          v-model="game.cellEditing"
          :disabled="form.toggleEditDisabled"
          switch
          size="lg"
          @change="handleEditChange"
        />
      </b-form-group>
      <b-form-group label-cols="5" :label="i18n('autoSolve')">
        <b-button
          :disabled="form.autoSolveDisabled"
          variant="outline-primary"
          @click="autoSolve"
        >
          {{ i18n("execute") }}
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
import {gameKey, i18nKey} from '../stores/keys';

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

    const i18n = inject(i18nKey).selectScene('settings');

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
      i18n,
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
