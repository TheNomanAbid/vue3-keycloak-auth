<template>
    <div v-if="keycloakUrl" class="login-container">
      <h2>Sign in</h2>
      <iframe
        :src="keycloakUrl"
        frameborder="0"
        class="login-iframe"
      ></iframe>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue';
  
  const keycloakUrl = ref('');
  
  const getLoginUrl = () => {
    const baseUrl = 'http://localhost:8081';
    const realm = 'Vue';
    const clientId = 'vuejs';
    const redirectUri = encodeURIComponent(window.location.origin);
  
    keycloakUrl.value = `${baseUrl}/realms/${realm}/protocol/openid-connect/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_mode=fragment&response_type=code&scope=openid`;
  };
  
  onMounted(() => {
    getLoginUrl();
  });
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .login-iframe {
    width: 80%;
    height: 80%;
  }
  </style>