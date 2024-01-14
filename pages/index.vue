<template>
  <div>
    <div class="brand">
      <h1>Zenbox</h1>
    </div>
  </div>
</template>
<script>
export default {
  setup() {
    definePageMeta({
      layout: false,
    });
  },

  mounted() {
     navigateTo('/' + this.getTodaysDate())
  },
  methods: {
    getTodaysDate() {
      const today = new Date();
      const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
      const day = today.getDate().toString().padStart(2, "0");
      const year = today.getFullYear();

      return `${month}${day}${year}`;
    },
  },
};
</script>

<style scoped>
@keyframes growText {
  0% {
    font-size: 14px;
  }
  100% {
    font-size: 100px;
  }
}

 h1 {
  font-size: 14px;
  animation: growText 3s linear;
}

.brand {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  height: 100vh;
  justify-content: center;
}

.brand h1 {
  font-family: Allerta Stencil;
  margin: 0;
  font-weight: 100;
}


</style>