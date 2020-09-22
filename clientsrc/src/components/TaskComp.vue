<template>
  <div class="task-comp">
    <li>{{taskProp.description}}</li>
  </div>
</template>


<script>
export default {
  name: 'task-comp',
  props: ["taskProp"],
  data(){
    return {}
  },
  computed:{},
  methods:{},
  components:{},
}
</script>


<style scoped>

</style>