<template>
    <div>
        <DxScheduler
            time-zone="America/Los_Angeles"
            :data-source="dataSource"
            :current-date="currentDate"
            :views="views"
            :height="730"
            :start-day-hour="8"
            current-view="day"
        />
        <div class="grid">
            <div class="sidebar" ref="sidebar">
                <div v-for="task in tasks" :key="task.id" class="task">{{task.name}}</div>
            </div>
            <div class="calendar" >
                <div class="timeline" >
                    <div v-for="slot in timeslots" :key="slot.id" class="timeslot">
                        {{slot.slot}}
                    </div>
                 </div>
                 <div class="taskArea" ref="timeline">

                 </div>
            </div>
            
        </div>
        
    </div>
</template>
<style>
    .task{
        resize:both; 
          overflow: auto;
    }
    .grid{
        display: grid;
        grid-template-columns: 20% 80%;
        height: 100vh;
        background:gray;
        gap:5px; 
    }
    .sidebar{
        background: rgb(58, 57, 57);
        height: 100vh;
    }
    .timeline{
        background: rgb(58, 57, 57);
        height: 100vh;
        padding:20px; 
       
        
    }
    .timeslot{
        padding:15px; 
        border-top:1px solid rgba(139, 138, 138, 0.257)
    }
    .calendar{
        display: grid;
        grid-template-columns: 20% 80%;
        overflow: scroll;
    }
    .taskArea{
        background: rgb(184, 59, 59);
    }
</style>

<script>
import Sortable from 'sortablejs'
import 'devextreme/dist/css/dx.light.css';
import DxScheduler from 'devextreme-vue/cjs/scheduler';

export default {
    components: {
       DxScheduler
    },
    methods: {
        
    },
    mounted() {
        var elSidebar = this.$refs.sidebar; 
        var sidebar =  Sortable.create(elSidebar, {group: "hello"})
         var elTimeline = this.$refs.timeline; 
        var timeline =  Sortable.create(elTimeline, {group: "hello"})
    },
    data() {
        return {
            currentDate: new Date(2021, 2, 28),
            views:  ['day', 'week', 'month'],
            tasks:[{
                id:"1", 
                name: "Complete vue"
            },
            {
                id:"2", 
                name: "Complete java"
            }], 
            dataSource:[
  {
    text: 'Website Re-Design Plan',
    startDate: new Date('2021-03-29T16:30:00.000Z'),
    endDate: new Date('2021-03-29T18:30:00.000Z'),
  }, {
    text: 'Book Flights to San Fran for Sales Trip',
    startDate: new Date('2021-03-29T19:00:00.000Z'),
    endDate: new Date('2021-03-29T20:00:00.000Z'),
    allDay: true,
  }, {
    text: 'Install New Router in Dev Room',
    startDate: new Date('2021-03-29T21:30:00.000Z'),
    endDate: new Date('2021-03-29T22:30:00.000Z'),
  }],
            timeslots: [
  { id: '1', slot: '00:00-00:30' },
  { id: '2', slot: '00:30-01:00' },
  { id: '3', slot: '01:00-01:30' },
  { id: '4', slot: '01:30-02:00' },
  { id: '5', slot: '02:00-02:30' },
  { id: '6', slot: '02:30-03:00' },
  { id: '7', slot: '03:00-03:30' },
  { id: '8', slot: '03:30-04:00' },
  { id: '9', slot: '04:00-04:30' },
  { id: '10', slot: '04:30-05:00' },
  { id: '11', slot: '05:00-05:30' },
  { id: '12', slot: '05:30-06:00' },
  { id: '13', slot: '06:00-06:30' },
  { id: '14', slot: '06:30-07:00' },
  { id: '15', slot: '07:00-07:30' },
  { id: '16', slot: '07:30-08:00' },
  { id: '17', slot: '08:00-08:30' },
  { id: '18', slot: '08:30-09:00' },
  { id: '19', slot: '09:00-09:30' },
  { id: '20', slot: '09:30-10:00' },
  { id: '21', slot: '10:00-10:30' },
  { id: '22', slot: '10:30-11:00' },
  { id: '23', slot: '11:00-11:30' },
  { id: '24', slot: '11:30-12:00' },
  { id: '25', slot: '12:00-12:30' },
  { id: '26', slot: '12:30-13:00' },
  { id: '27', slot: '13:00-13:30' },
  { id: '28', slot: '13:30-14:00' },
  { id: '29', slot: '14:00-14:30' },
  { id: '30', slot: '14:30-15:00' },
  { id: '31', slot: '15:00-15:30' },
  { id: '32', slot: '15:30-16:00' },
  { id: '33', slot: '16:00-16:30' },
  { id: '34', slot: '16:30-17:00' },
  { id: '35', slot: '17:00-17:30' },
  { id: '36', slot: '17:30-18:00' },
  { id: '37', slot: '18:00-18:30' },
  { id: '38', slot: '18:30-19:00' },
  { id: '39', slot: '19:00-19:30' },
  { id: '40', slot: '19:30-20:00' },
  { id: '41', slot: '20:00-20:30' },
  { id: '42', slot: '20:30-21:00' },
  { id: '43', slot: '21:00-21:30' },
  { id: '44', slot: '21:30-22:00' },
  { id: '45', slot: '22:00-22:30' },
  { id: '46', slot: '22:30-23:00' },
  { id: '47', slot: '23:00-23:30' },
  { id: '48', slot: '23:30-00:00' }
]

        }
    },
}
</script>