type DevelopmentKind = "design" | "management" | "programming";

type SkillKind = "design-architecture" | "design-markup" | "design-ui";

type Development = {
  value: number;
};

type Project = {
  // TODO: 作業内容のモデリング
  //       いろいろな作業の種類があり、それぞれに得意な職種がいるって方が良さそう
  necessaryDevelopments: { [k in DevelopmentKind]: number };
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
