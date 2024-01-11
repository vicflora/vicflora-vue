<script>
export default {
  middleware: [
        function({ redirect }) {
            redirect('/api');
        },
    ],
}
</script>