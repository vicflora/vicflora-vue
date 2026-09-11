module.exports = {
  apps : [{
    exec_mode: "cluster",
    name   : "VicFlora",
    instances: "max",
    script : "./node_modules/nuxt/bin/nuxt.js",
    args: "start",

    merge_logs: true,              // Merges logs from all cluster workers into one file
    log_date_format: "YYYY-MM-DD HH:mm:ss", // Adds timestamps to every log line

    max_memory_restart: "2G",          // Restarts the instance if it hits 2GB
    node_args: "--max-old-space-size=2500", // Tells Node it has ~2.5GB available

    env: {
      "HOST": "0.0.0.0",
      "PORT": 5000,
      "NODE_ENV": "production",
    }
  }]
}
