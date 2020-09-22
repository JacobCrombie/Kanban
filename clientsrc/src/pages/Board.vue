<template>
<div class="container-fluid">
  <div class="row" v-if="board.title">
    <div class="card col">
      <div class="card-body">
        <h1 class="card-title">{{board.title}}</h1>
        <p class="card-text">Text</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Item 1</li>
        <li class="list-group-item">Item 2</li>
        <li class="list-group-item">Item 3</li>
      </ul>
    </div>
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
