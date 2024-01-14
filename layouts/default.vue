<template>


<div>
  <nav ref="navi" class="nav">
  <div class="brand">
    <div class="logo">
     <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
        <path fill="currentColor" stroke="white" stroke-width="0.25" d="M9 3V1h6v2zm2 11h2V8h-2zm1 8q-1.85 0-3.488-.712T5.65 19.35q-1.225-1.225-1.937-2.863T3 13q0-1.85.713-3.488T5.65 6.65q1.225-1.225 2.863-1.937T12 4q1.55 0 2.975.5t2.675 1.45l1.4-1.4l1.4 1.4l-1.4 1.4Q20 8.6 20.5 10.025T21 13q0 1.85-.713 3.488T18.35 19.35q-1.225 1.225-2.863 1.938T12 22m0-2q2.9 0 4.95-2.05T19 13q0-2.9-2.05-4.95T12 6Q9.1 6 7.05 8.05T5 13q0 2.9 2.05 4.95T12 20m0-7"/>
      </svg>

   </div>
    <h1>Zenbox</h1> 
  </div>
</nav>
  <slot></slot>
</div>

</template>
<style scoped>
.nav{
  display: flex;
  justify-content: center;
  padding:10px; 
 box-shadow: -2rem 0 3rem -2rem #000; 
  background:#0000005e; 
}
.brand{
  display:flex; 
  gap:.5rem; 
  align-items: center;

}

.brand h1{
    font-family: Allerta Stencil;
  font-size: 45px;
  margin:0; 
  font-weight: 100;
}

.brand span{
font-size: 50px;
}

.icon {
  font-weight: 300; /* Adjust value to achieve desired thinness */
  stroke-width: 1;
}
</style>