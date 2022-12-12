type DevelopmentKind = "design" | "management" | "programming";

type DevelopmentSkill = {
  id: string;
  name: string;
  shortName: string;
  substituteFor: { id: DevelopmentSkill["id"]; rate: number }[];
};

const developmentSkills: DevelopmentSkill[] = [
  {
    id: "ai",
    name: "Artificial Intelligence",
    shortName: "AI",
    substituteFor: [],
  },
  {
    id: "back",
    name: "Back-end",
    shortName: "Back",
    substituteFor: [
      { id: "front", rate: 0.25 },
      { id: "infra", rate: 0.25 },
      { id: "legacy", rate: 0.25 },
      { id: "lowlevel", rate: 0.25 },
    ],
  },
  {
    id: "front",
    name: "Front-end",
    shortName: "Front",
    substituteFor: [
      { id: "back", rate: 0.25 },
      { id: "design", rate: 0.25 },
    ],
  },
  {
    id: "infra",
    name: "Infrastructure",
    shortName: "Infra",
    substituteFor: [
      { id: "back", rate: 0.25 },
      { id: "legacy", rate: 0.25 },
    ],
  },
  {
    id: "lecacy",
    name: "Legacy System",
    shortName: "Legacy",
    substituteFor: [{ id: "lowlevel", rate: 0.25 }],
  },
  {
    id: "lowlevel",
    name: "Low-level Programming",
    shortName: "Low",
    substituteFor: [
      { id: "back", rate: 0.25 },
      { id: "infra", rate: 0.25 },
      { id: "legacy", rate: 0.25 },
    ],
  },
  {
    id: "design",
    name: "Design",
    shortName: "Design",
    substituteFor: [{ id: "front", rate: 0.25 }],
  },
];

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
