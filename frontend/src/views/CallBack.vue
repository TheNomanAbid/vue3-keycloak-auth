<template>
  <div class="callback-container">
    <p>Authenticating...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleAuthorizationCode = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  if (code) {
    try {
      const codeVerifier = sessionStorage.getItem('pkce_code_verifier');
      const data = new URLSearchParams({
        client_id: 'vuejs',
        client_secret: process.env.VUE_APP_KEYCLOAK_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: window.location.origin + '/callback',
        code_verifier: codeVerifier || '',
      });

      const response = await axios.post('http://localhost:8081/realms/Vue/protocol/openid-connect/token', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const { access_token, refresh_token, id_token } = response.data;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('id_token', id_token);
      window.parent.location.href = window.parent.location.origin;
    } catch (error) {
      console.error('Failed to exchange code for token', error);
    }
  } else {
    console.error('No authorization code found');
  }
};

onMounted(() => {
  handleAuthorizationCode();
});
</script>

<style scoped>
.callback-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>