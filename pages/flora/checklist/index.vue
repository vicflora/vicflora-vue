<script>
export default {
  middleware: [
        function({ redirect }) {
            redirect('/checklist');
        },
    ],
}
</script>