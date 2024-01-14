<template>
    <div>
        <div class="taskbar">
          <div class="title">
            <h3>Task List</h3> 
          </div>
         <Icon class="pointer add" name="material-symbols:add" @click="addTask" color="white" />

        
        </div>
        <addTask :data="newTaskData" :modal="newModal" @close="newModal=true"></addTask>
     
    </div>
</template>
<script>
export default {

  data() {
    return {
        newModal: true, 
        newTaskData: {title: "", 
      description: "", 
      due: "", 
      priority: "", 
      status:"", 
      id: "" }
    }
  }, 
    methods: {
        addTask(){
            this.newModal = false; 
        
        }
    },
    computed: {

    }
}
</script>
<style scoped>
.taskbar{
    display: flex; 
    justify-content: space-between;
    margin-bottom:10px; 
}
.title{
    display: flex; 
    justify-content: center;
}
h3{
    margin: 0px; 
}
.pointer{
    cursor: pointer;
}
.add{
    border:1px solid rgb(185, 183, 183); 
}

</style>