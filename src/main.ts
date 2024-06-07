import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import KeyCloakService from './security/KeycloakService';

const renderApp = () => {
  const app = createApp(App);
  app.use(router);
  app.mount('#app');
};

KeyCloakService.CallLogin(renderApp);