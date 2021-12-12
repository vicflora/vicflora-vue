<script>
export default {
  middleware: [
        function({ redirect }) {
            redirect('/home');
        },
    ],
}
</script>