<template>
  <div>
    <div class="error" v-if="errorOnPage" @click="closeError">
      <div>
        <h3>Error Occured!!!!</h3>
        <p>{{ error }}</p>
      </div>

      <Icon name="material-symbols:close" color="white" />
    </div>
    <div class="gridCointainer">
      <div class="container taskList" ref="draggableContainer1">
        <taskBar></taskBar>
        <addTask
          :data="editTaskData"
          :modal="editModal"
          @close="closeModal"
        ></addTask>
        <task
          v-for="task in tasks"
          :key="task.id"
          class="task"
          @editTask="editTask"
          :id="task.id"
          :title="task.title"
          :status="task.status"
          :desc="task.description"
          :due="task.due"
          :priority="task.priority"
          :start="task.start"
          :end="task.end"
        ></task>
      </div>
      <div class="container timeline">
        <toolbar
          :currentDate="currentDate"
          @timelineChanged="timelineChangePlus"
        ></toolbar>
        <div class="timeslots">
          <!-- <timeslot
            @timelineChangePlus="timelineChangePlus"
            @timelineChangeMinus="timelineChangeMinus"
            v-for="(slot, index) in pageData[0].slots"
            :key="slot.id"
            :id="slot.id"
            :start="slot.start"
            :end="slot.end"
            :class="'slotContainer ' + 'scrollToslot' + index"
            ref="scrollToslot"
          ></timeslot> -->
          <cal></cal>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import Sortable from "sortablejs";
export default {
  async mounted() {
    await this.getTasks(); // gets all the tasks in the left bar
  //  await this.getData(); // gets all the time-slots for the day in the right section

    // this section enables the dragging and dropping of the tasks into the time slots.

    if (this.dateNotFound == true) {
      this.$router.push("/notfound/404");
    } else  {
    
      var el = this.$refs.draggableContainer1;
      //    console.log(el);
      var sortable = Sortable.create(el, {
        group: "hello",
        onEnd: this.handleDrop,
        ghostClass: "dragging",
      });
      if (this.$refs.scrollToslot) {
        var el3 = this.$refs.scrollToslot[16].$el;
        //      console.log(el3);

        el3.scrollIntoView({ block: "start", inline: "start" });
        //    console.log(el3);
        window.scrollTo(0, 0);
      }
    }
  },

  data() {
    return {
      id: "",
      data: [],
      currentDate: "01/01/1970",
      pageData: [],
      dateNotFound: false,
      tasks: [],
      generatingData: false,
      editModal: true,
      editTaskData: {
        title: "",
        description: "",
        due: "",
        priority: "",
        status: "",
        id: "",
      },
      errorOnPage: false,
      error: "could not connect to database",
    };
  },
  methods: {
   async  handleDrop(event) {

    try{

       // Execute this code only when the tasks are dragged and dropped from Tasklist 
    // to lines on the calendar.

    if(event.from.className.indexOf('taskList') != -1 && event.to.className.indexOf('lines') != -1)
    {
      const draggedElement = event.item;

    // Convert start and end minutes of the task based on the slot 
    // position from the top and based on the height of the task
  
      let startMinutes = (Math.round(draggedElement.offsetTop/60))*30; 
      let endMinutes = startMinutes + Math.round(draggedElement.offsetHeight*30/56); 
      console.log("start and end ", startMinutes, endMinutes); 
    
    // convert numerical minutes to formatted string 8:00 AM for example

      let startTime = this.slotToTime(startMinutes); 
      let endTime = this.slotToTime(endMinutes); 
      console.log(this.currentDate +  " " + startTime, '-', endTime ); 
     
    // add Current Date so that we can then use it to pass it to database for updates 
      let startDTime = new Date(this.currentDate +  " " + startTime); 
      let endDtTime = new Date(this.currentDate +  " " + endTime); 
      const updates = {start: startDTime, end: endDtTime}
      console.log(updates.start, updates.end); 
    
    // Update the database 
      const supabase = useSupabaseClient();
      const { data: day, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', draggedElement.id)
      .single()
      
      if (error) {
        console.error('Error updating task:', error)
      }
      else 
      {
        console.log('Task updated successfully:', day)
        
      }

    }

    }

    catch(e){
      console.log("Error Occured: ", e)

      this.errorOnPage = true; 
      this.error = e; 
    }
  
   
      
    },
    slotToTime(time){
      let hrs = Math.floor(time/60); 
      let min = time % 60; 
      let formattedMin = min.toString().padStart(2, '0');

      if(hrs == 0 || hrs==24){
        return '12:'+ formattedMin + ' AM'
      }
      if(hrs < 12) {
        return hrs + ":" + formattedMin + " AM"; 
      }
      if(hrs == 12) {
        return hrs + ":" + formattedMin + " PM"; 
      }
      
      if(hrs > 12) {
        return hrs%12 + ":" + formattedMin + " PM"; 
      }
    }, 
   
    closeModal(refreshdata) {
      this.editModal = true;
      console.log("refreshData: " + refreshdata);
      if (refreshdata) {
        this.getTasks();
      }
    },
    closeError() {
      this.errorOnPage = false;
    },
    editTask(data) {
      // this.$store.commit('updateTaskData', data);
      // this.$store.commit('updateModal', false)
      console.log(data);
      this.editTaskData = data;
      this.editModal = false;
    },
    async generateSlots() {
      this.generatingData = true;
      var slotsArr = [];
      var start = 0;
      for (var i = 0; i < 48; i++) {
        var slot = { id: i + 1, start: start, end: start + 30 };
        slotsArr.push(slot);
        start = start + 30;
      }
      var generateData = { day: this.currentDate, slots: slotsArr };
      const supabase = useSupabaseClient();
      const { data: day, error } = await supabase
        .from("day")
        .insert({ name: generateData.day })
        .select("*");
      for (var slot in generateData.slots) {
        const { data, error } = await supabase.from("slots").insert({
          day_id: day[0].id,
          start: generateData.slots[slot].start,
          end: generateData.slots[slot].end,
        });
      }
      this.getData();
      this.generatingData = false;
    },
    timelineChangePlus(data) {
      //   console.log(data);
      var result = this.pageData[0].slots.findIndex(
        (item) => item.id === data.id
      );
      if (result) {
        for (var i = result; i < this.pageData[0].slots.length; i++) {
          if (i == result) {
            this.pageData[0].slots[i].end += 30;
          } else if (i == this.pageData[0].slots.length) {
            this.pageData[0].slots[i].start += 30;
          } else if (this.pageData[0].slots[i].end == 1440) {
            this.pageData[0].slots.pop();
            break;
          } else {
            this.pageData[0].slots[i].start += 30;

            this.pageData[0].slots[i].end += 30;
          }
        }
      }
      // console.log(result)
      // console.log(this.pageData);
    },
    timelineChangeMinus(data) {
      if (data.end - data.start > 30) {
        var result = this.pageData[0].slots.findIndex(
          (item) => item.id === data.id
        );

        for (var i = result; i < this.pageData[0].slots.length; i++) {
          if (i == result) {
            this.pageData[0].slots[i].end -= 30;
          } else {
            this.pageData[0].slots[i].start -= 30;
            this.pageData[0].slots[i].end -= 30;
          }
        }
        var newSlot = { id: "1", start: 1410, end: 1440 };
        this.pageData[0].slots.push(newSlot);
      }
      var result = this.pageData[0].slots.findIndex(
        (item) => item.id === data.id
      );
      // if(result){
      //   for(var i=result; i>=0 ; i--){
      //     if(i==result){
      //       this.pageData[0].slots[i].end-=30;
      //     }
      //     else if(i== this.pageData[0].slots.length){
      //       this.pageData[0].slots[i].start-=30;
      //     }
      //     else if(this.pageData[0].slots[i].start == 0 )
      //     break;
      //     else{
      //     this.pageData[0].slots[i].start-=30;

      //     this.pageData[0].slots[i].end-=30;
      //     }

      //   }
      // }
    },
    toHoursAndMinutes(totalMinutes) {
      var hours = Math.floor(totalMinutes / 60);
      var minutes = totalMinutes % 60;
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (hours > 12) {
        hours = Math.floor(hours / 12);
        return hours + ":" + minutes + " PM";
      }
      if (hours < 10) {
        return "0" + hours + ":" + minutes + " AM";
      }
      return hours + ":" + minutes + " AM";
    },
    getformattedDt(dt) {
      if (dt == null) {
        dt = new Date();
      }
      var dtMonth;
      dt.getMonth() < 9
        ? (dtMonth = "0" + (dt.getMonth() + 1))
        : (dtMonth = dt.getMonth());
      return dtMonth + "/" + dt.getDate() + "/" + dt.getFullYear();
    },
    async getData() {
      var id = "";

      if (this.$route.params.id) {
        id = this.$route.params.id;
      } else {
        var dt = new Date();
        var mon = dt.getMonth() + 1;
        var d = dt.getDate();
        mon < 10 ? (mon = "0" + mon) : mon;
        d < 10 ? (d = "0" + d) : d;

        // console.log(mon, d);
        id = mon + "" + d + "" + dt.getFullYear();
      }

      if (id.length != 8 || id.match(/^[0-9]+$/) == null) {
        console.log("error");
        this.dateNotFound = true;
      }

      var currentDt =
        id.substring(0, 2) +
        "/" +
        id.substring(2, 4) +
        "/" +
        id.substring(4, 8);

      const supabase = useSupabaseClient();

      const { data: day, error } = await supabase
        .from("day")
        .select("*, slots(*)")
        .eq("name", currentDt)
        .order("start", { foreignTable: "slots", asc: true });
      if (error) {
        console.log(JSON.stringify(day), error);
        this.$router.push("/notfound/error");
      } else {
        this.pageData = day;
        if (this.pageData.length > 0) this.currentDate = this.pageData[0].name;
        else this.currentDate = currentDt;
      }
    },
    async getTasks() {
      // This method fethches all the tasks of the user from database. 
      try {
        const supabase = useSupabaseClient();
        const { data: tasks, error } = await supabase
          .from("tasks")
          .select("*")
          .eq("done", false)
          .order("due", { asc: true });
        if(error){
          console.log("error occured", error); 
          this.showError = true; 
          this.error = error; 
        }
        
        console.log("Task List");
        console.log(tasks);

        this.tasks = tasks;
      } catch (e) {
        console.log("************* Error ***********");
        console.log(e);
        console.log("************* Error - End  ***********");
      }
    },
  },
};
</script>

<style scoped>
.dragging {
  background: green;
}
.gridCointainer {
  display: grid;
  grid-template-columns: 30% 70%;
  margin: 5px;
  box-shadow: -2rem 0 3rem -2rem #000;
}
.timeslot {
  background: #236486eb;
  padding: 10px;
  margin: 5px 0px;
  flex-grow: 1;
}

.controls {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  margin: 4px 0px;
}

.controls span {
  margin: 1px;
  background: brown;
  padding: 10px;
}

.slot {
  display: flex;
}

.timeslots {
  height: 90vh;
  overflow: scroll;
  padding: 10px;
  margin: 10px 0px;
}

.taskList {
  box-shadow: -2rem 0 3rem -2rem #000;
}

.interval {
  padding-top: 5px;
}

.timeslot.task {
  background: rgba(35, 100, 134, 0.92157);
}

.error {
  display: flex;
  justify-content: space-between;
  align-content: center;
  flex-wrap: wrap;
  background: rgba(163, 6, 6, 0.642);
  margin: 3px 0px;
  padding: 10px;
}

.error span {
  margin: 18px;
}
.lines > .task {
  position: absolute;
  width: 100%;
  z-index: 0;
}
</style>