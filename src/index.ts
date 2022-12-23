// Web 開発っぽいののシミュレーターだけど、切り口は色々ありそうだった
//
// - A) Web 企業の社長
//   - どんどん人を増やしてチームを作り案件を受注し、会社の規模を拡大する
//   - シミュレーターというよりはゲームっぽくなる
// - B) Web 大企業のいち PM
//   - マイクロマネジメントを行う。
//   - 基本的に波風が立たない様に収束するのが正しい選択になるので、やることが地味になる。
//     - 例えば、プロジェクト開始時にリソースが足りてなくて途中で雇って増やす、とかはシミュレーションとしておかしくなって萎えそう。
//     - 開発のスコープ変動くらいしか説得力のあるものがない
//   - あるあるネタが主になりそう。
//   - 勝利条件も納品することになりそうで、これも地味。
//   - 一番なさそう。
// - C) 新規 Web サービス開発ベンチャー
//   - 随所に発生する条件にサービスの完成度を間に合わせる
//   - 所持金がなくなったら負け、exitか上場したら勝ち
//   - 最初は自分だけで徐々に人を増やす感じ
//   - スピードと品質見たいのを表現できそう
//
// B はエモいのを表現するが主になるので、自分には難しそう。
//
// カードゲーム風の A にしましょう。

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

type Developer = {
  developmentSkills:
    | [DevelopmentSkill]
    | [DevelopmentSkill, DevelopmentSkill]
    | [DevelopmentSkill, DevelopmentSkill, DevelopmentSkill];
  // NOTE: 人材の募集は、人材募集画面があってそこで常に獲得できる想定。3 ターンなどの一定期間で全員更新される。
  //       常に獲得可能なのは、ユーザーの選択肢を増やすため。一定期間で全員同時に更新されるのは、ユーザーの確認の手間を減らすため。
  /** ゲームから退出したか。isEmployed が true なら雇用後に退職したことを示し、false なら雇われなくて応募期間を経過したことを示す。 */
  hasGone: boolean;
  id: string;
  isEmployed: boolean;
  /** プロジェクトへ割り当てる度に減少する。不足時はプロジェクトへ割り当てられない。 */
  motivation: number;
  name: string;
  /** 給料。ターン毎に資金から差し引かれる。 */
  salary: number;
};

type Game = {
  /** 資金。 */
  capital: number;
  /** 現在のターン番号。1 開始の連番。フレーバー上は「月」になる。 */
  currentTurnNumber: number;
  /** 開発者リスト。未雇用・雇用済み・非活性化の全ての状態のものを含む。 */
  developers: Developer[];
  /** 0 以上 1 未満の乱数を生成する関数。 */
  getRandom: () => number;
};

const proceedToNextTurn = (game: Game): Game => {
  const nextTurnNumber = game.currentTurnNumber + 1;
  return { ...game, currentTurnNumber: nextTurnNumber };
};

let game: Game = {
  getRandom: () => Math.random(),
  currentTurnNumber: 1,
  capital: 0,
  developers: [],
};
game = proceedToNextTurn(game);
game = proceedToNextTurn(game);
console.log(game);
