<template>
  <nav class="navbar">
    <h1 class="main-title">Business FullStack</h1>
    <h1 class="seperator">|</h1>
    <router-link class="route" to="/">Home</router-link>
    <router-link class="route" to="/departments">Department</router-link>
    <router-link class="route" :to="{ name: 'employees' }"
      >Employee</router-link
    >
  </nav>

  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

.navbar {
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 20px;
  background-color: white;
  border-bottom: 1px solid #ccc;
}

.main-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: black;
  margin-right: 30px;
}

.route {
  text-decoration: none;
  display: flex;
  color: #000000;
  font-size: 24px;
  padding: 20px;
  border: 0;
  border-radius: 20px;
}

.route:hover {
  background-color: #ccc;
  transform: scale(1.05);
}
</style>
