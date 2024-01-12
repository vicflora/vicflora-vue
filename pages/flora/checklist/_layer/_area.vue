<script>
export default {
  middleware: [
    function({ redirect, route }) {
      return redirect({
        name: 'checklist-layer-area', 
        params: route.params
      })
    },
  ],
}
</script>