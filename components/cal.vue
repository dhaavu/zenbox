<template>
  <div class="timeGrid" ref="timeGrid">
    <div class="time">
      <div v-for="(time, index) in timeIntervals" :key="index">
        <div class="slot">
          {{ time }}
        </div>
      </div>
    </div>
    <div class="lines" ref="lines">
      <div
        v-for="line in calcLines"
        :key="line.id"
        :id="line.id"
        class="line"
        :style="{ background: line.background }"
        :ref="line.reference"
      >
        &nbsp;
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeGrid {
  display: flex;

  max-height: 100vh;
  overflow: auto;
}

.time {
  width: 100px;
  background: rgba(0, 0, 0, 0.598);
  text-align: center;
  overflow: auto;
}
.time::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}
.slot {
  height: 49px;
  border-top: 1px solid rgb(74, 74, 74);
  padding: 5px;
  display: flex;
  align-items: center;
}
.lines {
  flex: 1;
  /* background: rgba(0, 0, 0, 0.598); */
  /* max-height: 100vh; */
  overflow: auto;
  position: relative;
}
.line {
  border-top: 1px solid rgb(74, 74, 74);
  min-height: 59px;
  display: flex;
  align-items: center;
}
</style>

<script>
import Sortable from "sortablejs";
export default {
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
        lines.push({
          type: "line",
          id: i,
          name: i,
          reference: i==this.startslot ? "startSlot" : "line",
          background:
            i <= this.startslot + 18 && i >= this.startslot
              ? "rgb(3 68 120 / 50%)"
              : "rgba(0, 0, 0, 0.598)",
        });
      }
      return lines;
    },
  },

  methods: {
    handleDrop(event) {
      const draggedElement = event.item;
      console.log(event)
      console.log("dragged element - ",draggedElement.offsetTop, draggedElement.offsetHeight);
    },

    handleResize(event) {
      console.log(event);
      console.log(event[0].target.parentElement.className);
      console.log(event[0].contentRect.height);
    },
  },
  mounted() {
    console.log(this.$refs.startSlot)
   this.$refs.startSlot[0].scrollIntoView({ block: "start", inline: "start" })

    new Sortable(this.$refs.lines, {
      ghostClass: "dragging",
      group: "hello",
      onEnd: this.handleDrop,
    });

    const timeGrid = this.$refs.timeGrid;
    const timeElement = timeGrid.querySelector(".time");
    const linesElement = timeGrid.querySelector(".lines");
    console.log(linesElement)
    timeElement.addEventListener("scroll", () => {
      // Synchronize the scroll position of .time and .lines
      linesElement.scrollTop = timeElement.scrollTop;
    });

    linesElement.addEventListener("scroll", () => {
      // Synchronize the scroll position of .lines and .time
      timeElement.scrollTop = linesElement.scrollTop;
    });
    window.scrollTo(0, 0);
  },
  data() {
    return {
      resizeObserver: null,
      startslot: 16,
      tasks: [
        {
          id: "1",
          title: "Complete vue",
          status: "",
          descreption: "",
          due: "",
          start: "1:00 AM",
          priority: "",
          end: "2:30 AM",
          date: null,
        },
        {
          id: "2",
          title: "Complete react",
          status: "",
          descreption: "",
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