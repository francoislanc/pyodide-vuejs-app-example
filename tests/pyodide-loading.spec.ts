import { test, expect} from '@playwright/test';

const NUMBER_OF_RUNS = 1;

function standardDeviation(values) {
  const avg = average(values);

  const squareDiffs = values.map(function(value) {
    const diff = value - avg;
    const sqrDiff = diff * diff;
    return sqrDiff;
  });

  const avgSquareDiff = average(squareDiffs);

  const stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
}

function average(data) {
  const sum = data.reduce(function(sum, value) {
    return sum + value;
  }, 0);

  const avg = sum / data.length;
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

const getTime = async (page) => {
  return await page.evaluate(() => window.performance.now());
};

const loadpyodide = async (page) => {
  const t0 = await getTime(page);
  await page.goto("http://localhost:5173/");
  const t1 = await getTime(page);
  const loadingTime = t1 - t0;
  page.close();
  return loadingTime;
};

const runTrainTestSplit = async (page) => {
  await page.goto("http://localhost:5173/");
  // page.on("console", msg => console.log("PAGE LOG:", msg));

  // await page.screenshot({ path: `__tests__/example-before-split.png` });
  const t0 = await getTime(page);
  await page.click("text=Split dataset");
  await page.waitForSelector("text=Download datasets");
  // await page.screenshot({ path: `__tests__/example-after-split.png` });
  const t1 = await getTime(page);
  await page.click("text=Download datasets");
  const loadingTime = t1 - t0;
  page.close();
  return loadingTime;
};

test.describe("Pyodide", () => {
  test(
    "pyodide mean loading time",
    async ({ page }) => {
      const loadingTimes = [];
      for (let index = 0; index < NUMBER_OF_RUNS; index++) {
        const loadingTime = await loadpyodide(page);
        loadingTimes.push(loadingTime);
      }
      printTime(loadingTimes);
      expect(loadingTimes.length).toBe(NUMBER_OF_RUNS);
    },
    NUMBER_OF_RUNS * 10000
  );

  test(
    "train_test_split mean initial running time",
    async ({ page }) => {
      const loadingTimes = [];
      for (let index = 0; index < NUMBER_OF_RUNS; index++) {
        const loadingTime = await runTrainTestSplit(page);
        loadingTimes.push(loadingTime);
      }
      printTime(loadingTimes);
      expect(loadingTimes.length).toBe(NUMBER_OF_RUNS);
    },
    NUMBER_OF_RUNS * 180000
  );
});
