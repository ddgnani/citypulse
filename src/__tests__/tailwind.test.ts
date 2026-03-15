import fs from "fs";
import path from "path";

const projectRoot = path.resolve(__dirname, "../..");

describe("Tailwind CSS configuration", () => {
  test("Tailwind config exists and references correct content paths", () => {
    const configPath = path.join(projectRoot, "tailwind.config.ts");
    expect(fs.existsSync(configPath)).toBe(true);

    const configContent = fs.readFileSync(configPath, "utf-8");
    expect(configContent).toContain("./src/app/**/*.{js,ts,jsx,tsx,mdx}");
    expect(configContent).toContain("./src/components/**/*.{js,ts,jsx,tsx,mdx}");
  });

  test("globals.css includes Tailwind directives", () => {
    const cssPath = path.join(projectRoot, "src/app/globals.css");
    const css = fs.readFileSync(cssPath, "utf-8");
    expect(css).toContain("@tailwind base");
    expect(css).toContain("@tailwind components");
    expect(css).toContain("@tailwind utilities");
  });

  test("Tailwind classes are present in page markup", () => {
    const pagePath = path.join(projectRoot, "src/app/page.tsx");
    const page = fs.readFileSync(pagePath, "utf-8");
    expect(page).toMatch(/className="[^"]*min-h-screen/);
  });
});
