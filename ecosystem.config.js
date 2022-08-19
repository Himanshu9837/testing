module.exports = {
    apps : [
        {
            name: "http://178.62.228.242:3010",
            script: "./pages/_app.js",
            watch: true,
            env_development: {
                "PORT": 3010,
                "NODE_ENV": "development"
            },
            env_production: {
                "PORT": 3010,
                "NODE_ENV": "production",
            }
        }
    ]}