import {exec} from "child_process";

const execute = () => {
  return new Promise((resolve, reject) => {
    exec("node ./src/top_results.js", (err, stdout) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(stdout);
    });
  });
};

describe("top_results", () => {
  it("outputs top results", async () => {
    const out = await execute();
    const lines = out.split("\n");
    expect(lines[0]).toMatch(/^# Top 3 of total points/);
    expect(lines[1]).toMatch(
      /^1[\s]*\|[\s]*2[\s]*\|[\s]*Brian[\s]*\|[\s]*237[\s]*$/
    );
    expect(lines[2]).toMatch(
      /^2[\s]*\|[\s]*2[\s]*\|[\s]*Ken the Ninja[\s]*\|[\s]*234[\s]*$/
    );
    expect(lines[3]).toMatch(
      /^3[\s]*\|[\s]*2[\s]*\|[\s]*John[\s]*\|[\s]*233[\s]*$/
    );
    expect(lines[4]).toMatch(/^average:[\s]*208[\s]*$/);
  });
});
