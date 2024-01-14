<template>
  <div>
    <div class="modalBlock" :class="{'modal': modal}">
      <div class="closebar">
        <div class="modalTitle flex justifyCenter">
          <h2>New Task</h2>
        </div>
        <span
          class="material-symbols-outlined pointer close pointer"
          @click="closeModal(false)"
          >close</span
        >
      </div>

      <div class="flex justifyCenter">
        {{id}}
        <form>
          <input class="hidden" type="text" name='id' v-model="id" />  
          <div class="inputSection">
            <div class="label">
              <h3>Title:</h3>
            </div>
            <input v-model="title" type="text" class="input" />
          </div>
          <div class="inputSection">
            <div class="label">
              <h3>Description:</h3>
            </div>
            <textarea
              class="input"
              name="desc"
              id=""
              cols="30"
              rows="5"
              v-model="description"
            ></textarea>
          </div>
          <div class="inputSection">
            <div class="label">
              <h3>Due</h3>
            </div>
            <input v-model="due" type="datetime-local" class="input" />
          </div>
          <div class="inputSection">
            <div class="label">
              <h3>Priority</h3>
            </div>
            <select v-model="priority" name="priority" id="priority" class="input">
              <option value="P1">P1</option>
              <option value="P2">P2</option>
              <option value="P3">P3</option>
              <option value="P4" selected>P4</option>
            </select>
          </div>
          <div class="inputSection">
            <div class="label">
              <h3>Status</h3>
            </div>
            <select v-model="status" name="status" id="status" class="input">
              <option value="new" selected>new</option>
              <option value="in-progress">in-progress</option>
              <option value="completed">completed</option>
              <option value="on-hold">on-hold</option>
            </select>
          </div>
          <div class="inputSection">
            <div class="label">
              <h3>Start</h3>
            </div>
              <input v-model="start" type="datetime-local" class="input" />
          </div>
          <div class="inputSection">
            <div class="label">
              <h3>End</h3>
            </div>
              <input v-model="end" type="datetime-local" class="input" />
          </div>
          <div class="buttonSection flex spaceAround">
            <button @click.prevent="saveTask" class="button">Save</button>
            <button @click.prevent="closeModal" class="button buttonCancel">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { createClient } from "@supabase/supabase-js";
export default {
    
    methods: {
        closeModal(refreshData){
            // this.$store.commit('updateModal', true)
            this.$emit('close', refreshData);
        },
       async  saveTask(){
                const supabase = useSupabaseClient()
                if(this.id == null || this.id == ""){
                  console.log('in if')
                    const { data: day, error } = await supabase
                  .from("tasks")
                  .insert({ title: this.title, description: this.description, due: this.due, priority :this.priority, status:this.status  })
                  .select('*');

                  console.log(day); 
                  this.closeModal(true); 
                }
                else {
                  console.log('in else ')
                   const { data: day, error } = await supabase
                  .from("tasks")
                  .update({ title: this.title, description: this.description, due: this.due, priority :this.priority, status:this.status  })
                  .eq('id', this.id)
                  .select('*')
                  console.log(day); 
                  this.closeModal(true)
                }

                
        
        }
    },
    props:{
      modal: Boolean, 
      data: {
         title: String, 
      description: String, 
      due: Date, 
      priority: String, 
      status:String, 
      id: String, 
      start: Date, 
      end: Date
      }
     
    }, 
    data() {
        return {
            title: this.data.title, 
            description:this.data.description, 
            due: this.data.due, 
            priority: this.data.priority, 
            status:this.data.status, 
            id: this.data.id, 
            start: this.data.start, 
            end: this.data.end
        }
    },
    watch:{
      modal(){
        this.title =  this.data.title
            this.description=this.data.description
            this.due= this.data.due.substring(0,16)
            this.start = this.data.start.substring(0,16)
            this.end = this.data.end.substring(0,16)

            this.priority= this.data.priority 
            this.status=this.data.status 
            this.id= this.data.id


      }
    }
  
}
</script>
<style scoped>
.modalBlock {
  display: block;
  position: absolute;
  top: 5%;
  left: 15%;
  min-height: 90vh;
  width: 70%;
  background: #000000e0;
  z-index: 100;
}
.modal {
  display: none;
}

.closebar {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  border-top: 1px solid rgb(72 71 71);
}

.close {
  border: 1px solid rgb(185, 183, 183);
  margin: 20px;
  justify-self: right;
}

.modalTitle {
  flex-grow: 2;
}
form {
  width: 90%;
}

.inputSection {
  margin: 20px;
  flex-wrap: wrap;
  align-content: center;
  gap: 10px;
}
.label {
  flex-grow: 2;
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  justify-content: left;
  /* background: #252121; */
  border-radius: 5px;
  margin: 10px 0px;
}
.input {
  flex-grow: 5;
  min-height: 35px;
  font-family: "Quicksand", cursive;
  font-size: 22px;
  color: #d1c8c8;
  border: none;
  background: #2f2e2e;
  border-radius: 5px;
  padding: 5px 20px;
  width: 100%;
  box-sizing: border-box;
}
.input:focus {
  outline: none;
  border: 0.5px solid #d2d2d2;
}

.buttonSection {
  margin: 20px 20px 50px 20px;
}
</style>