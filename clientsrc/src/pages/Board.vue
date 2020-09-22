<template>
<div class="container-fluid">
  <div class="board card mt-2 row">
    <h1 v-if="board.title" class="card-header">{{board.title}}</h1>
    <h1 v-else>Loading...</h1>
    </div>

</div>
</template>

<script>
export default {
  name: "board",
  computed: {
    board() {
      return this.$store.state.activeBoard;
    }
  },
  props: ["boardId"]
};
</script>
