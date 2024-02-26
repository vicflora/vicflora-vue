module.exports = {
  apps : [{
    exec_mode: "cluster",
    name   : "VicFlora",
    instances: "2",
    script : "./node_modules/nuxt/bin/nuxt.js",
    args: "start",
    env: {
      "HOST": "0.0.0.0",
      "PORT": 5000,
      "NODE_ENV": "production",
    }
  }]
}
