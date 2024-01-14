<template>
    <div>
         <div class="slotContainer" >
            <div class="interval">
              {{ toHoursAndMinutes(start) }} ({{start}}) -
              {{ toHoursAndMinutes(end) }} ({{end}})
              ----{{currentMinutes}}
            </div>
            <div class="slot" :class="currenttimeclass" :style="{'min-height': minHeight}">
              <div  :id="id" ref="draggableContainer2" class="timeslot"  :class="{'offWork':outsideOfWorkHours, 'current': currenttimeclass}"></div>
              <div class="controls">
                <span class="resize-minus" @click="minus"> - </span>
                <span class="resize-plus" @click="plus"> + </span>
              </div>
            </div>
          </div>
    </div>
</template>
<script>
import Sortable from "sortablejs";

export default {
    name:'timeslot', 
    props: {
            start:Number, 
            end:Number, 
            id:String
        }, 
    data() {
      return {
        currentMinutes:0
      }
    },
    computed:{
      outsideOfWorkHours(){
        return this.start < 480 || this.end > 1020 ? true : false
      }, 
      minHeight(){
        return (this.end-this.start)/30*62 + "px"
      }, 
      currenttimeclass(){
        var dt =new Date(); 
        var currentMinutes = (dt.getHours()*60) + (dt.getMinutes()); 
        this.currentMinutes = currentMinutes; 
        if( currentMinutes >=this.start && currentMinutes <= this.end-1 )
        return true
        else 
        return false
      }

    }, 
    mounted(){
      var el2 = this.$refs.draggableContainer2;
      //console.log(el2);
      if (el2) {
       
          Sortable.create(el2, { group: "hello" });
        }
    }, 
    methods: {
       toHoursAndMinutes(totalMinutes) {
      var hours = Math.floor(totalMinutes / 60);
      var minutes = totalMinutes % 60;
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (hours > 12) {
        hours = hours-12;
        return hours + ":" + minutes + " PM";
      }
      if (hours < 10) {
        return "0" + hours + ":" + minutes + " AM";
      }
      return hours + ":" + minutes + " AM";
    },
    plus(){
      var data = {id: this.id, start: this.start, end: this.end}
      this.$emit('timelineChangePlus', data); 
    }, 
    minus(){
      var data = {id: this.id, start: this.start, end: this.end}
      this.$emit('timelineChangeMinus', data); 
    }
    }
}
</script>

<style scoped>
.timeslot {
  background: #236486eb;
  padding: 10px;
  margin: 5px 0px;
  flex-grow: 1;
}
.slot {
  display: flex;
}

.timeslots {
  height: 90vh;
  overflow: scroll;
  padding:10px; 
  margin:10px 0px; 
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
.offWork{
  background: grey;
}
.current{
  border-left:15px solid brown; 
}
</style>