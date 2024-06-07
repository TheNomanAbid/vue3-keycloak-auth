<template>
    <div class="login-container">
      <iframe
        v-if="keycloakUrl"
        :src="keycloakUrl"
        frameborder="0"
        class="login-iframe"
      ></iframe>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'LogIn',
    data() {
      return {
        keycloakUrl: ''
      };
    },
    created() {
      this.getLoginUrl();
    },
    methods: {
      getLoginUrl() {
        const baseUrl = 'http://localhost:8081';
        const realm = 'Vue';
        const clientId = 'vuejs';
        const redirectUri = encodeURIComponent(window.location.origin);
  
        this.keycloakUrl = `${baseUrl}/realms/${realm}/protocol/openid-connect/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_mode=fragment&response_type=code&scope=openid`;
      }
    }
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