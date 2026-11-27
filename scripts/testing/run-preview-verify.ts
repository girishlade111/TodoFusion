import { spawn } from 'node:child_process';
import path from 'node:path';

async function waitForServer(url: string) {
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error('Server failed to start within timeout');
}

async function main() {
  const nextBin = path.resolve('node_modules/next/dist/bin/next');
  const server = spawn(process.execPath, [nextBin, 'start', '-p', '3000'], {
    stdio: 'pipe',
  });

  try {
    await waitForServer('http://localhost:3000');
    console.log('Production preview server ready on http://localhost:3000');

    const exitCode = await new Promise<number>((resolve) => {
      const tsxBin = path.resolve('node_modules/tsx/dist/cli.mjs');
      const runner = spawn(process.execPath, [tsxBin, 'scripts/testing/verify-app.ts'], {
        stdio: 'inherit',
      });
      runner.on('close', (code) => resolve(code ?? 1));
    });

    process.exitCode = exitCode;
  } finally {
    server.kill();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
