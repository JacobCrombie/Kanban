<template>
  <div class="task-comp">
    <li>{{taskProp.description}}<i class="fa fa-trash" @click="deleteTask"></i></li>
    
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
  methods:{
    deleteTask(){
      this.$store.dispatch('deleteTask', this.taskProp)
    }
  },
  components:{},
}
</script>


<style scoped>

</style>