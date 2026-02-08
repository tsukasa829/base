import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,

    // 【追加】エラーが1つでも出たら即座にテストを終了する設定
    maxFailures: 1,

    // 【変更点】ログ出力設定
    // 1. 'list': ターミナルでパッと見る用
    // 2. 'json': 'e2e-logs' フォルダに詳細ログを出力（LLM解析用）
    reporter: [
        ['list'],
        ['json', { outputFile: 'e2e-logs/test-results.json' }]
    ],

    use: {
        baseURL: 'http://localhost:3000',
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],

    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
    },
});