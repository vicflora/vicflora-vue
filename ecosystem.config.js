module.exports = {
  apps : [{
    name   : "VicFlora",
    script : "yarn start",
    env: {
      "HOST": "0.0.0.0",
      "PORT": 5000,
      "NODE_ENV": "production",
    }
  }]
}
