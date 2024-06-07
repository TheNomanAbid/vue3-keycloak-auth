<template>
  <div class="User">
    <h2>User {{ userName }}</h2>
    <h2>Roles {{ userRoles?.join(" ") }}</h2>
    <h2>Access Token {{ accessToken }}</h2>
    <button @click="logOut">Log Out</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KeyCloakService from '../security/KeycloakService';

const userName = ref(KeyCloakService.GetUserName());
const accessToken = ref(KeyCloakService.GetAccesToken());
const userRoles = ref(KeyCloakService.GetUserRoles());

const logOut = () => {
  KeyCloakService.CallLogOut();
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>