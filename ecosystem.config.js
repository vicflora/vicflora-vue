module.exports = {
  apps : [{
    exec_mode: "cluster",
    name   : "VicFunga",
    instances: "1",
    script : "./node_modules/nuxt/bin/nuxt.js",
    args: "start",
    env: {
      "HOST": "0.0.0.0",
      "PORT": 5001,
      "NODE_ENV": "production",
    }
  }]
}
