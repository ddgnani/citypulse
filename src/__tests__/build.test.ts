import { execSync } from "child_process";
import path from "path";

const projectRoot = path.resolve(__dirname, "../..");

describe("Next.js project setup", () => {
  test("Next.js builds without errors", () => {
    const result = execSync("npx next build", {
      cwd: projectRoot,
      encoding: "utf-8",
      timeout: 60000,
    });
    expect(result).toContain("Generating static pages");
  });
});
