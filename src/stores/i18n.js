/* eslint-disable require-jsdoc */

import {reactive} from '@vue/composition-api';

const _dictionaries = {
  'en': {
    'settings': {
      'settings': 'Settings',
      'difficulty': 'Difficulty',
      'newGame': 'New game',
      'cheat': 'Cheat',
      'solution': 'Solution',
      'solutionKind': 'Solution kind',
      'none': 'None',
      'unique': 'Unique',
      'multiple': 'Multiple',
      'refineSolution': 'Refine solution',
      'execute': 'Execute',
      'editCells': 'Edit cells',
      'autoSolve': 'Auto solve',
    },
  },
  'ja': {
    'settings': {
      'settings': '設定',
      'difficulty': '難易度',
      'newGame': '開始',
      'cheat': 'チート',
      'solution': '解法表示',
      'solutionKind': '解の種類',
      'none': '不能',
      'unique': '一意',
      'multiple': '複数',
      'refineSolution': '解の再計算',
      'execute': '実行',
      'editCells': '盤の編集',
      'autoSolve': '自動解答',
    },
  },
};


const e = Object.entries;
const dictionaries = new Map(
    e(_dictionaries).map(([langKey, langVal]) => [
      langKey,
      new Map(e(langVal).map(([sceneKey, sceneVal]) => [
        sceneKey,
        new Map(e(sceneVal)),
      ])),
    ]),
);

export default function i18nStore() {
  const config = reactive({
    locale: 'en',
  });

  const setLocale = (locale) => {
    config.locale = dictionaries.has(locale) ? locale : 'en';
  };

  const submitScene = (scene) => {
    return (key) => dictionaries.get(config.locale).get(scene).get(key) || key;
  };

  return {config, setLocale, submitScene};
}
