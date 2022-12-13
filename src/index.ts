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

type DevelopmentKind = {
  appropriateSkills: {
    developmentSkillId: DevelopmentSkill["id"];
    efficiency: number;
  }[];
  name: string;
};

// TODO: 開発の種類を介すのは冗長かもしれない。絵合わせをしたいだけなので開発者直接指定の方がいいのでは。
const developmentKinds: DevelopmentKind[] = [
  {
    name: "",
    appropriateSkills: [
      {
        developmentSkillId: "pm",
        efficiency: 100,
      },
    ],
  },
];

type Development = {
  cost: number;
  kind: DevelopmentKind;
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
