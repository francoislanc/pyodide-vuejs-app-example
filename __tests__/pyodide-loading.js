const NUMBER_OF_RUNS = 1;

function standardDeviation(values) {
  var avg = average(values);

  var squareDiffs = values.map(function(value) {
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });

  var avgSquareDiff = average(squareDiffs);

  var stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
}

function average(data) {
  var sum = data.reduce(function(sum, value) {
    return sum + value;
  }, 0);

  var avg = sum / data.length;
  return avg;
}

function printTime(data) {
  if (data.length > 0) {
    const avg = average(data);
    const std = standardDeviation(data);
    console.log(`${avg.toFixed(2)} +- ${std.toFixed(2)}`);
  } else {
    console.log("empty data");
  }
}

const getTime = async () => {
  return await page.evaluate(() => window.performance.now());
};

const loadpyodide = async () => {
  const page = await browser.newPage();
  let t0 = await getTime();
  await page.goto("http://localhost:8080/");
  await page.evaluate(async function() {
    await window.languagePluginLoader;
  });
  let t1 = await getTime();
  let loadingTime = t1 - t0;
  page.close();
  return loadingTime;
};

const loadSklearnPandas = async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080/");
  // page.on("console", msg => console.log("PAGE LOG:", msg));
  await page.evaluate(async function() {
    await window.languagePluginLoader;
  });
  let t0 = await getTime();
  await page.evaluate(async function() {
    await window.pyodide.loadPackage(["pandas", "scikit-learn"]);
  });
  let t1 = await getTime();
  let loadingTime = t1 - t0;
  page.close();
  return loadingTime;
};

const runTrainTestSplit = async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080/");
  // page.on("console", msg => console.log("PAGE LOG:", msg));
  await page.evaluate(async function() {
    await window.languagePluginLoader;
    await window.pyodide.loadPackage(["pandas", "scikit-learn"]);
  });

  // await page.screenshot({ path: `__tests__/example-before-split.png` });
  let t0 = await getTime();
  await page.click("text=Split dataset");
  await page.waitForSelector("text=Download datasets");
  // await page.screenshot({ path: `__tests__/example-after-split.png` });
  let t1 = await getTime();
  await page.click("text=Download datasets");
  let loadingTime = t1 - t0;
  page.close();
  return loadingTime;
};

describe("Pyodide", () => {
  it(
    "pyodide mean loading time",
    async () => {
      const loadingTimes = [];
      for (let index = 0; index < NUMBER_OF_RUNS; index++) {
        let loadingTime = await loadpyodide();
        loadingTimes.push(loadingTime);
      }
      printTime(loadingTimes);
      expect(loadingTimes.length).toBe(NUMBER_OF_RUNS);
    },
    NUMBER_OF_RUNS * 10000
  );

  it(
    "sklearn/pandas mean loading time",
    async () => {
      const loadingTimes = [];
      for (let index = 0; index < NUMBER_OF_RUNS; index++) {
        let loadingTime = await loadSklearnPandas();
        loadingTimes.push(loadingTime);
      }
      printTime(loadingTimes);
      expect(loadingTimes.length).toBe(NUMBER_OF_RUNS);
    },
    NUMBER_OF_RUNS * 150000
  );

  it(
    "train_test_split mean initial running time",
    async () => {
      const loadingTimes = [];
      for (let index = 0; index < NUMBER_OF_RUNS; index++) {
        let loadingTime = await runTrainTestSplit();
        loadingTimes.push(loadingTime);
      }
      printTime(loadingTimes);
      expect(loadingTimes.length).toBe(NUMBER_OF_RUNS);
    },
    NUMBER_OF_RUNS * 180000
  );
});
