import allResults from "./results.js";

// gradeでフィルターを行う関数
const filterByGrade = (results, grade) => {
  const filteredResults = [];
  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    if (result.grade == grade) {
      filteredResults.push(result);
    }
  }
  return filteredResults;
};

// 三つの科目の合計点をresultsに追加する関数
const addTotal = (results, grade) => {
  const resultsWithTotal = []; // totalを含めたresults配列を用意(返り値)
  const filteredResults = filterByGrade(results, grade);

  for (let i = 0; i < filteredResults.length; i++) {
    let total = 0;
    // pointsの中にある値をpoint_arrayに格納
    const point_array = Object.values(filteredResults[i].points);
    // 教科の合計を計算
    for (let j = 0; j < point_array.length; j++) {
      total += point_array[j];
    }
    // resultsにtotalを含める
    resultsWithTotal.push({...filteredResults[i], total: total});
  }
  return resultsWithTotal;
};

// 降順ソートのための比較関数
function compareFunc(a, b) {
  return b.total - a.total;
}

// numの数だけ部分配列を作る関数
const pull = (result, num) => {
  const pull_result = [];
  for (let i = 0; i < num; i++) {
    pull_result[i] = result[i];
  }
  return pull_result;
};

// 合計を計算する関数
const sum = (numbers) => {
  let result = 0;
  for (let i = 0; i < numbers.length; i++) {
    result += numbers[i];
  }
  return result;
};
// 平均を計算する関数
const average = (points) => Math.round(sum(points) / points.length);

// resultのtotalの平均を計算する関数
const averageOf = (results) => {
  const totals = [];
  for (let i = 0; i < results.length; i++) {
    totals.push(results[i].total);
  }
  return average(totals);
};

const total_result = addTotal(allResults, 2).sort(compareFunc);
const top3_result = pull(total_result, 3);
console.log("# Top 3 of total points");
console.log(
  "1 | ",
  top3_result[0].grade,
  " | ",
  top3_result[0].name,
  " | ",
  top3_result[0].total
);
console.log(
  "2 | ",
  top3_result[1].grade,
  " | ",
  top3_result[1].name,
  " | ",
  top3_result[1].total
);
console.log(
  "3 | ",
  top3_result[2].grade,
  " | ",
  top3_result[2].name,
  " | ",
  top3_result[2].total
);
console.log("average: ", averageOf(total_result));
