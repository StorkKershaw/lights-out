/* eslint-disable require-jsdoc */

import {computed, reactive} from '@vue/composition-api';
import {range} from '../libs/range';
import {sleep} from '../libs/sleep';

export default function gameStore() {
  const game = reactive({
    size: 0,
    opVectors: [],
    cells: 0n,
    solution: [],

    cheatEnabled: false,
    showSolution: false,
    solutionKind: '',
    cellEditing: false,
    autoSolving: false,

    solved: computed(() => !game.cells),
    cellsArray: computed(() => {
      const length = game.size ** 2;
      let mask = 1n << BigInt(length);
      return Array.from({length}, () => Boolean(game.cells & (mask >>= 1n)));
    }),
  });

  const initialize = (size) => {
    game.size = size;
    game.opVectors = _calcOpVectors(size);
    game.cells = 0n;

    _randomizeCells();
    updateSolution();
  };

  const handleClick = (p) => {
    if (game.autoSolving) {
      return;
    }

    if (game.cellEditing) {
      game.cells ^= 1n << BigInt(p);
    } else {
      _flip(p);
    }
  };

  // Gaussian elimination
  const updateSolution = () => {
    const length = game.size ** 2;
    let highest = 1n << BigInt(length + 1);
    const digitMasks = Array.from({length}, () => highest >>= 1n);

    const cells = game.cells << 1n;
    const augMat = game.opVectors.map((vec, i) => {
      const low = BigInt((cells & digitMasks[i]) !== 0n);
      return (vec << 1n) | low;
    });

    for (const i of range(length)) {
      for (const j of range(i, length)) {
        if (augMat[j] & digitMasks[i]) {
          [augMat[i], augMat[j]] = [augMat[j], augMat[i]];
          break;
        }
      }
      for (const j of range(length)) {
        if (i == j) continue;
        if (augMat[j] & digitMasks[i]) {
          augMat[j] ^= augMat[i];
        }
      }
    }

    if (augMat.includes(1n)) {
      game.solution = Array.from({length}, () => false);
      game.solutionKind = 'none';
    } else {
      game.solution = augMat.map((n) => Boolean(n & 1n));
      game.solutionKind = augMat.includes(0n) ? 'multiple' : 'unique';
    }
  };

  const handleCheatChange = (value) => {
    if (value) {
      updateSolution();
    } else {
      game.cellEditing = false;
      updateSolution();
    }
  };

  const handleEditChange = (value) => {
    if (!value) {
      updateSolution();
    }
  };

  const autoSolve = async () => {
    game.autoSolving = true;
    const indices = game.solution
        .flatMap((bool, index) => bool ? index : []);

    const time = Math.min(Math.floor(7000 / indices.length), 100);
    for (const p of indices) {
      await sleep(time);
      _flip(p);
    }
    game.autoSolving = false;
  };

  // private

  const _rule = [2n, 7n, 2n];

  const _flip = (p) => {
    game.cells ^= game.opVectors[p];
    game.solution[p] ^= 1;
  };

  const _calcOpVectors = (size) => {
    // const rSize = _rule.length;
    const margin = _rule.length >> 1;
    const rule = [..._rule, ...Array.from({length: size - 1}, () => 0n)];
    const mask = (1n << BigInt(size)) - 1n;

    const opVectors = [];
    // eslint-disable-next-line no-unused-vars
    for (const _ of range(size)) {
      const tempRule = rule.slice();

      // eslint-disable-next-line no-unused-vars
      for (const _ of range(size)) {
        const vector = tempRule
            .slice(margin, -margin)
            .map((n, i) => ((n >> 1n) & mask) << BigInt(size * i))
            .reduce((total, current) => total | current);
        tempRule.forEach((_, i) => tempRule[i] <<= 1n);
        opVectors.push(vector);
      }
      rule.unshift(rule.pop());
    }

    return opVectors.reverse();
  };

  const _randomizeCells = () => {
    for (const p of range(game.size ** 2)) {
      if (Math.random() < 0.5) {
        _flip(p);
      }
    }
  };

  return {
    game,
    initialize,
    handleClick,
    updateSolution,
    handleCheatChange,
    handleEditChange,
    autoSolve,
  };
}
