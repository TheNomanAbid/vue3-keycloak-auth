<template>
  <div class="User">
    <h2>User {{ User() }}</h2>
    <h2>Roles {{ UserRoles()?.join(" ") }}</h2>
    <h2>Access Token {{ AccessToken() }}</h2>
    <button @click="LogOut">Log Out</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import KeyCloakService from "../security/KeycloakService";

export default defineComponent({
  name: "HomePage",
  methods: {
    User() {
      return KeyCloakService.GetUserName();
    },
    AccessToken() {
      return KeyCloakService.GetAccesToken();
    },
    LogOut() {
      return KeyCloakService.CallLogOut();
    },
    UserRoles() {
      return KeyCloakService.GetUserRoles();
    },
  },
});
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