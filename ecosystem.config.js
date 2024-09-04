module.exports = {
    apps: [{
        name: 'bustransfront',
        script: 'node_modules/next/dist/bin/next',
        args: 'start --port 80',
        instances: 0,
        exec_mode: 'cluster',
        wait_ready: true,
        kill_timeout: 5000,
    }, ],
}