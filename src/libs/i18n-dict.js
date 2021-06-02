/* eslint-disable require-jsdoc */

const _dict = {
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

function toMap(object) {
  const toEntries = Object.entries;

  const entries = [];
  for (let [key, value] of toEntries(object)) {
    if (value !== null && typeof value === 'object') {
      value = toMap(value);
    }
    entries.push([key, value]);
  }

  return new Map(entries);
}

export const i18nDict = toMap(_dict);
