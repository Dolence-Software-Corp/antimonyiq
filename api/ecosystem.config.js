const ip = require('./ip');

module.exports = {
    apps: [
        {
            name: "antimonyiq",
            script: "npm",
            args: "run dev",
            instances: 1,
            autorestart: true,
            watch: true,
            ignore_watch: ["node_modules"],
            env: {
                NODE_ENV: "development",
                PORT: 3110,
                HOST: ip,
            },
        },
    ],
};
