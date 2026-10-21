const { spawnSync } = require('node:child_process');

const serverUrl = process.env.npm_config_SERVER_URL;
const childEnvironment = { ...process.env };

if (serverUrl) {
    try {
        const url = new URL(serverUrl);
        const hostname = url.hostname.toLowerCase();
        const isLoopback = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';

        if (url.protocol === 'https:' && isLoopback) {
            childEnvironment.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        }
    }
    catch {
        // Let the integration test report invalid configuration consistently.
    }
}

const result = spawnSync(
    process.execPath,
    [require.resolve('jest/bin/jest'), ...process.argv.slice(2), '--runInBand'],
    {
        env: childEnvironment,
        stdio: 'inherit',
    },
);

if (result.error) {
    throw result.error;
}

process.exitCode = result.status ?? 1;
