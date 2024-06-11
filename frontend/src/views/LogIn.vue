<template>
  <div v-if="keycloakUrl && !checkAuthenticated()" class="login-container">
    <iframe
      :src="keycloakUrl"
      frameborder="0"
      class="login-iframe"
    ></iframe>
  </div>
  <div v-else><h2>Signed In.</h2></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';

const keycloakUrl = ref('');

const generateRandomString = (): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < 128; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const codeVerifier = generateRandomString();
const codeChallenge = sha256(codeVerifier).toString(Base64)
  .replace(/\+/g, '-')
  .replace(/\//g, '_')
  .replace(/=+$/, '');

const getLoginUrl = () => {
  const baseUrl = 'http://localhost:8081';
  const realm = 'Vue';
  const clientId = 'vuejs';
  const redirectUri = encodeURIComponent(window.location.origin);

  keycloakUrl.value = `${baseUrl}/realms/${realm}/protocol/openid-connect/auth?client_id=${clientId}&redirect_uri=${redirectUri}/callback&response_type=code&scope=openid&code_challenge=${codeChallenge}&code_challenge_method=S256`;

  // Save the code verifier to sessionStorage for later use
  sessionStorage.setItem('pkce_code_verifier', codeVerifier);
};

const checkAuthenticated = () => {
  return localStorage.getItem('access_token')
}

onMounted(() => {
  getLoginUrl();
  checkAuthenticated();
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