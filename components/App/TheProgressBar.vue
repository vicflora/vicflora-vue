<template>
  <div>
    <b-progress :max="max" height="3px">
      <b-progress-bar v-if="show"  :value="value"/>
    </b-progress>
  </div>
</template>

<script>
export default {
  name: "TheProgressBar",
  data() {
    return {
      timer: 0,
      value: 0,
      max: 100,
      timer: false,
      show: false
    };
  },
  created() {
    this.$nuxt.$on('progress-bar-start', () => {
      this.show = true
      this.value = 0
      setTimeout(this.startTimer, 200)
    })
    this.$nuxt.$on('progress-bar-stop', () => {
      this.show = false
      this.stopTimer()
    })
  },
  methods: {
    startTimer() {
      let vm = this
      vm.timer = setInterval(function() {
        vm.value += 1
        if (vm.value >= vm.max) {
          clearInterval(vm.timer)
        }
      }, 100)
    },
    stopTimer() {
      clearInterval(this.timer)
    }
  }
}
</script>
