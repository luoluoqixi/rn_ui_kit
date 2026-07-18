#!/usr/bin/env node

const { spawnSync } = require("node:child_process");
const { existsSync, readFileSync, writeFileSync } = require("node:fs");
const { resolve } = require("node:path");

const projectRoot = resolve(__dirname, "..");
const packageJsonPaths = [
  "package.json",
  "packages/rn_ui_kit/package.json",
  "examples/app/package.json",
];
const semverPattern =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

function printUsage() {
  console.log("鐢ㄦ硶: bun run set-version <version>");
  console.log("绀轰緥: bun run set-version 1.2.3");
}

function fail(message) {
  console.error(`閿欒: ${message}`);
  printUsage();
  process.exit(1);
}

const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h")) {
  printUsage();
  process.exit(0);
}

if (args.length !== 1) {
  fail("璇蜂紶鍏ヤ笖浠呬紶鍏ヤ竴涓増鏈彿銆?);
}

const version = args[0].startsWith("v") ? args[0].slice(1) : args[0];

if (!semverPattern.test(version)) {
  fail(`鐗堟湰鍙?"${args[0]}" 涓嶆槸鏈夋晥鐨?SemVer銆俙);
}

const originalFiles = new Map();
const changedPackageJsonPaths = [];

for (const relativePath of packageJsonPaths) {
  const absolutePath = resolve(projectRoot, relativePath);

  if (!existsSync(absolutePath)) {
    fail(`鎵句笉鍒?${relativePath}銆俙);
  }

  const originalContent = readFileSync(absolutePath, "utf8");
  const packageJson = JSON.parse(originalContent);
  originalFiles.set(absolutePath, originalContent);

  if (packageJson.version === version) {
    continue;
  }

  packageJson.version = version;
  writeFileSync(absolutePath, `${JSON.stringify(packageJson, null, 2)}\n`, "utf8");
  changedPackageJsonPaths.push(relativePath);
}

if (changedPackageJsonPaths.length > 0) {
  const lockfilePath = resolve(projectRoot, "bun.lock");

  if (existsSync(lockfilePath)) {
    originalFiles.set(lockfilePath, readFileSync(lockfilePath, "utf8"));
  }

  console.log(`宸插皢宸ョ▼鐗堟湰鏇存柊涓?${version}锛歚);
  for (const relativePath of changedPackageJsonPaths) {
    console.log(`  - ${relativePath}`);
  }

  console.log("\n姝ｅ湪鍚屾 bun.lock...");
  const bunCommand = process.platform === "win32" ? "bun.exe" : "bun";
  const lockfileResult = spawnSync(bunCommand, ["install", "--lockfile-only"], {
    cwd: projectRoot,
    stdio: "inherit",
  });

  if (lockfileResult.status !== 0) {
    for (const [absolutePath, originalContent] of originalFiles) {
      writeFileSync(absolutePath, originalContent, "utf8");
    }

    fail("bun.lock 鍚屾澶辫触锛屽凡鎭㈠鐗堟湰鏂囦欢銆?);
  }
} else {
  console.log(`宸ョ▼褰撳墠宸茬粡鏄?${version}锛屾棤闇€淇敼鐗堟湰鏂囦欢銆俙);
}

const tag = `v${version}`;

console.log("\n璇峰厛鎻愪氦鐗堟湰淇敼锛屽啀鎵ц浠ヤ笅鍛戒护锛?);
console.log(`git tag -a ${tag} -m "${tag}"`);
console.log(`git push origin ${tag}`);
