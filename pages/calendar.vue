<template>
  <div>
    <div class="grid">
      <div class="sidebar" ref="sidebar">
        <div v-for="task in tasks" :key="task.id" :id="task.id" class="tasker">
          {{ task.name }}
        </div>
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
          <div class="lines" ref="lines">
            <div v-for="line in calcLines" :key="line.id">
              <div
                ref="tasker"
                v-if="line.type == 'task'"
                class="tasker"
                :style="{ height: `${line.height}px` }"
              >
                {{ line.name }}
              </div>
              <div v-else class="slot">
                &nbsp; {{ line.type }} - {{ line.name }}
              </div>
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
.time::-webkit-scrollbar-thumb {
  background-color: transparent; /* Set the thumb color */
}
.time::-webkit-scrollbar {
  width: 6px; /* Set the width of the scrollbar */
}

.time::-webkit-scrollbar-thumb {
  background-color: transparent; /* Set the thumb color */
}

.time::-webkit-scrollbar-track {
  background-color: transparent; /* Set the track color */
}
.slot {
  height: 24px;
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
.tasker {
  resize: vertical;
  overflow: auto;
  height: 35px;
  background: rgb(92, 92, 227);
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
</style>

<script>
import Sortable from "sortablejs";

export default {
  computed: {
    timeIntervals() {
      const intervals = [];
      for (let i = 0; i < 24; i++) {
        //     const hours = i < 24 ? i : i - 24; // Handle hours correctly for PM
        //   //  console.log(i%2);
        //     const minutes = i % 2 === 0 ? "00" : "30";
        //     const amPm = hours < 12 ? "AM" : "PM";
        //     intervals.push(`${hours % 12 || 12}:${minutes} ${amPm}`);
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

      this.tasks.forEach((task) => {
        if (task.start != null) {
          var slotData = this.calculateTimeSlots(task.start, task.end);

          const data = lines.splice(slotData.startingSlot, slotData.span);
          console.log(slotData.span);
          lines.splice(slotData.startingSlot, 0, {
            type: "task",
            id: slotData.startingSlot,
            name: task.name,
            height: (slotData.span + 1) * 35,
          });
        }
      });
      return lines;
    },
  },
  methods: {
    handleDrop(event) {
      console.log(event.item.clientHeight);

      if(event.from.className=='sidebar')
      {
        const id = event.item.id; 
        const slotHeight = event.item.clientHeight; 
        
      }
      
    },
    calculateTimeSlots(startTime, endTime) {
      // Convert times to minutes
      const startMinutes = this.convertTimeToMinutes(startTime);
      const endMinutes = this.convertTimeToMinutes(endTime);

      // Ensure start time is before end time
      if (startMinutes > endMinutes) {
        throw new Error("Start time must be before end time");
      }

      // Calculate starting slot
      const startingSlot = Math.floor(startMinutes / 30);

      // Calculate number of slots spanned
      const span = Math.ceil((endMinutes - startMinutes) / 30);

      return { startingSlot, span };
    },
    convertTimeToMinutes(timeString) {
      const [hours, minutes] = timeString.split(":");
      const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
      return totalMinutes;
    },
    handleResize(event){
     const tasker = event[0].target;    
    console.log(tasker); 
    console.log(tasker.offsetHeight)
    // Calculate the new height in increments of 35px
    const currentHeight = tasker.offsetHeight;
    const newHeight = Math.round(currentHeight / 35) * 35;

    // Set the new height
    tasker.style.height = `${newHeight}px`;

    console.log("Tasker resized:", event);
    }, 
     replaceObjectById(array, id, replacementObject) {
  const newArray = array.map((item) => {
    if (item.id === id) {
      // Replace the object with a matching ID
      return { ...item, ...replacementObject };
    }
    return item;
  });

  return newArray;
}
  },

  mounted() {
    this.resizeObserver = new ResizeObserver(this.handleResize);
    console.log(this.$refs.tasker)
    this.$refs.tasker.forEach((task)=> {
        this.resizeObserver.observe(task)
    })
    
    var elSidebar = this.$refs.sidebar;
    var sidebar = Sortable.create(elSidebar, {
      group: "hello",
      clone:false, 
      onEnd: this.handleDrop,
    });
    var elLines = this.$refs.lines;
    var lines = Sortable.create(elLines, { group: "hello",sort:true });
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
      slotFrequency: 30,
      tasks: [
        {
          id: "1",
          name: "Complete vue",
          start: "1:00 AM",
          end: "2:30 AM",
          date: null,
        },
        {
          id: "2",
          name: "Complete java",
          start: null,
          end: null,
          date: null,
        },
      ],
    };
  },
};
</script>