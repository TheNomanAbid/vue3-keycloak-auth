<template>
  <div class="User">
    <h2>HomePage</h2>
    <button @click="logout">Log Out</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  const keycloakUrl = 'http://localhost:8081';
  const realm = 'Vue';
  const redirectUri = encodeURIComponent(window.location.origin + '/login');
  const idTokenHint = localStorage.getItem('id_token');

  const logoutUrl = `${keycloakUrl}/realms/${realm}/protocol/openid-connect/logout?post_logout_redirect_uri=${redirectUri}&id_token_hint=${idTokenHint}`;
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('id_token');
  window.location.href = logoutUrl;
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