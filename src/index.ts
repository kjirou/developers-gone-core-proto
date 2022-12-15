// Web企業の社長シミュレーターを考えてたけど、どっちかというと一つの案件のプロジェクトマネージングをマイクロにする方が良さそう。
//
// 以下の様な要素)
// - タスクの依存関係
// - 人の割り当て
// - 開発スコープ変動

type DevelopmentSkill = {
  defaultSortOrder: number;
  id: string;
  name: string;
  shortName: string;
};

const developmentSkills: DevelopmentSkill[] = [
  {
    id: "back",
    name: "Back-end",
    shortName: "Back",
    defaultSortOrder: 2,
  },
  {
    id: "data",
    name: "Data Analysis",
    shortName: "Data",
    defaultSortOrder: 8,
  },
  {
    id: "design",
    name: "Design",
    shortName: "Design",
    defaultSortOrder: 5,
  },
  {
    id: "front",
    name: "Front-end",
    shortName: "Front",
    defaultSortOrder: 4,
  },
  {
    id: "infra",
    name: "Infrastructure",
    shortName: "Infra",
    defaultSortOrder: 3,
  },
  {
    id: "lecacy",
    name: "Legacy System",
    shortName: "Legacy",
    defaultSortOrder: 6,
  },
  {
    id: "lowlevel",
    name: "Low-level Programming",
    shortName: "Low",
    defaultSortOrder: 7,
  },
  {
    id: "pm",
    name: "Project Management",
    shortName: "PM",
    defaultSortOrder: 1,
  },
];

/**
 * NOTE:
 *   - 直列・並行でやらないといけない仕事は、Development 同士のリレーションで表現する。
 *   - 名前をつけるのはやめる。必要スキルが名前的に表示されてた方が見やすいはずで、フレーバー上で活かすのを考えるのも難しい。
 */
type Development = {
  cost: number;
  necessarySkillId: string;
  value: number;
};

// TODO: 受注した案件と受注候補の案件がある。
type Project = {
  necessaryDevelopments: Development[];
};

type Game = {
  /** 現在のターン番号。1 開始の連番。フレーバー上は「週」になる。 */
  currentTurnNumber: number;
  /** 0 以上 1 未満の乱数を生成する関数。 */
  getRandom: () => number;
};

const proceedToNextTurn = (game: Game): Game => {
  const nextTurnNumber = game.currentTurnNumber + 1;
  return { ...game, currentTurnNumber: nextTurnNumber };
};

let game: Game = {
  currentTurnNumber: 1,
  getRandom: () => Math.random(),
};
game = proceedToNextTurn(game);
game = proceedToNextTurn(game);
console.log(game);
