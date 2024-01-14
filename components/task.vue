<template>
    <div :id="id" ref="myref">
        <div class="card">
            <div class="title pointer" >
                <h3  @click="showDesc" >{{title}}</h3>
              
              <Icon @click="$emit('editTask', taskData)" class="material-symbols-outlined pointer" name="material-symbols:edit-rounded" color="white" />
             <div>{{duration}}</div>
            </div>
            <div class="holder" :class="{expand:expand}">
                <div class="status">
                    <p>{{status}}</p>
                 </div>
                <div class="priority">
                  <p>{{priority}}</p>
                </div>
                 <div class="due">
                <p>{{due}}</p>
            </div>
            </div>
            
            <div class="desc" :class="{expand: expand}">
                <p>{{desc}}</p>
            </div>
           
          
        </div>
     
    </div>
</template>

<script>
export default {
    mounted() {
       console.log("task Mounted - > ", this.$refs.myref); 
       this.height = this.$refs.myref.offsetHeight; 
        this.resizeObserver = new ResizeObserver(this.handleResize);
          this.resizeObserver.observe(this.$refs.myref);
        console.log('Start and End', this.start, this.end )
    },
    props:
        ['id', 
        'title', 
        'status', 
        'desc', 
        'due', 
        'priority', 
        'start', 
        'end']
    , 
    data() {
        return {
            expand:true, 
            height:0, 
            resizeObserver:null
        }
    },
    methods: {
        showDesc(){
            
            // this.expand = !this.expand
        }, 
        handleResize(event){
            console.log(event[0].target.offsetHeight); 
            const ht =event[0].target.offsetHeight; 
            this.height = Math.round( event[0].target.offsetHeight * 30 / 56)
        }
    },
    computed: {
        taskData(){
            return {
                 title:this.title, 
                status:this.status, 
                description:this.desc, 
                due:this.due, 
                priority:this.priority, 
                id:this.id, 
                start:this.start, 
                end:this.end
            }
        }, 
        duration(){
            return this.height; 
        }
    }
}
</script>

<style scoped>
.card {
  
    padding:5px; 
    margin:1.5px; 
}


h3{
    margin:0; 
}

p{
    margin:0; 
}

.title, .desc, .holder{
    margin:5px;
  
    padding:5px; 
}

.task {
  background: #d5330059;
  padding: 0px;
  margin: 1px 0px;
  resize: vertical;
  overflow: auto;
  border-radius: 7px;
}

.holder{
    display: flex;
    gap:5px; 
    justify-content: center;
    

}

.status, .priority , .due{
    background: #2c2b2b;
    padding:5px; 
  
}

.title{
    display: flex; 
    justify-content: space-between;
    align-items: center;
    
}

.expand{
    display: none;
}
.pointer{
    cursor: pointer;
}

.title h3{
    flex-grow: 2;
}
</style>