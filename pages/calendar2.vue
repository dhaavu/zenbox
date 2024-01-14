<template>
  <div>
    <div class="grid">
      <div class="sidebar" ref="sidebar">
        <div
          v-for="task in tasks"
          :key="task.id"
          class="tasker"
          ref="tasker"
        >
          {{ task.name }}
        </div>
        <task v-for="task in tasks"
          :key="task.id"
          class="tasker"
          ref="tasker" ></task>
      </div>
      <div>
        <div class="timeGrid" ref="timeGrid">
          <div class="time">
            <div v-for="(time, index) in timeIntervals" :key="index">
              <div class="slot">
                {{ time }}
              </div>
            </div>
          </div>
          <div
            class="lines"
            ref="lines"
          >
            <div
              v-for="line in calcLines"
              :key="line.id"
              class="line"
            >
                {{ line.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.timeGrid {
  display: flex;
  gap: 5px;
  max-height: 100vh;
  overflow: auto;
}
.time {
  width: 100px;
  background: black;
  text-align: center;
  overflow: auto;
}

.slot {
  height: 39px;
  border-top: 1px solid rgb(212, 210, 210);
  padding: 5px;
}
.lines {
  flex: 1;
  background: black;
  /* max-height: 100vh; */
  overflow: auto;
  position: relative;
}
.line{
  border-top:1px solid white; 
  min-height:49px; 
}
.tasker {
  resize: vertical;
  overflow: auto;
  padding:10px; 
  min-height:30px; 
  background: rgb(92, 92, 227);
   display: flex;
  align-items: center;
}

.lines > .tasker {
  position: absolute;
  width: 95%;
}
.grid {
  display: grid;
  grid-template-columns: 20% 80%;
  max-height: 100vh;
  background: gray;
  gap: 5px;
  overflow: auto;
}
.sidebar {
  background: rgb(58, 57, 57);
  height: 100vh;
}
.timeline {
  background: rgb(58, 57, 57);
  height: 100vh;
  padding: 20px;
}
.timeslot {
  padding: 15px;
  border-top: 1px solid rgba(139, 138, 138, 0.257);
}
.calendar {
  display: grid;
  grid-template-columns: 20% 80%;
  overflow: scroll;
}
.taskArea {
  background: rgb(184, 59, 59);
}
.draggable {
  cursor: pointer;
}

</style>

<script>
import Sortable from 'sortablejs';
export default 
  {
  computed: {
    timeIntervals() {
      const intervals = [];
      for (let i = 0; i < 24; i++) {
        if (i < 13) {
          intervals.push(`${i}:00 AM`);
          intervals.push(`${i}:30 AM`);
        } else {
          intervals.push(`${i - 12}:00 PM`);
          intervals.push(`${i - 12}:30 PM`);
        }
      }
      return intervals;
    },
    calcLines() {
      const lines = [];
      for (let i = 0; i < 48; i++) {
        lines.push({ type: "line", id: "i", name: i });
      }
      return lines;
    },
  },
  methods: {
    handleDrop(event) {
      const draggedElement = event.item;
      console.log(draggedElement.offsetTop , draggedElement.offsetHeight)
      
    
    },

    handleResize(event) {
      console.log(event); 
      console.log(event[0].target.parentElement.className); 
      console.log(event[0].contentRect.height); 
     

    
    },
    
  },
  mounted() {
    
   new Sortable(this.$refs.sidebar,  {
    
    group:'sortable', 
    onEnd:this.handleDrop
}) 

new Sortable(this.$refs.lines,  {
   
    group:'sortable', 
    onEnd:this.handleDrop
}) 

    this.resizeObserver = new ResizeObserver(this.handleResize);

    if (this.$refs.tasker) {
      this.$refs.tasker.forEach((task) => {
        this.resizeObserver.observe(task);
      });
    }

    const timeGrid = this.$refs.timeGrid;
    const timeElement = timeGrid.querySelector(".time");
    const linesElement = timeGrid.querySelector(".lines");

    timeElement.addEventListener("scroll", () => {
      // Synchronize the scroll position of .time and .lines
      linesElement.scrollTop = timeElement.scrollTop;
    });

    linesElement.addEventListener("scroll", () => {
      // Synchronize the scroll position of .lines and .time
      timeElement.scrollTop = linesElement.scrollTop;
    });
  },
  data() {
    return {
      resizeObserver: null,
      tasks: [
        {
          id: "1",
          title: "Complete vue",
          status:"", 
          descreption:"", 
          due: "",
          start: "1:00 AM",
          priority: "", 
          end: "2:30 AM",
          date: null,
        },
        {
           id: "2",
          title: "Complete react",
          status:"", 
          descreption:"", 
          due: "",
          start: "1:00 AM",
          priority: "", 
          end: "2:30 AM",
          date: null,
        },
      ],
    };
  },
};
</script>