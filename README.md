Documentation for Setting Up and Configuring Keycloak with Vue.js and Django
Overview
This guide covers the steps required to set up and configure Keycloak for use with a Vue.js frontend and a Django backend. This includes setting up Keycloak, configuring it for PKCE (Proof Key for Code Exchange), and integrating the authentication flow in your application.

Prerequisites
A running instance of Keycloak.
Vue.js project for the frontend.
Django project for the backend.
Keycloak Setup
Create a Realm:

Log in to the Keycloak admin console.
Click on Add realm and enter a name, e.g., Vue.
Create a Client:

Go to Clients and click Create.
Set Client ID to vuejs.
Set Client Protocol to openid-connect.
Set Access Type to confidential.
Click Save.
Configure Client:

Under the Settings tab:
Set Valid Redirect URIs to http://localhost:8080/*.
Set Web Origins to * or http://localhost:8080.
Enable Authorization Enabled.
Under the Advanced Settings tab:
Set Proof Key for Code Exchange Code Challenge Method to S256.
Under the Credentials tab:
Copy the Client Secret.
Configure Content Security Policy:

Add frame-ancestors 'self' http://localhost:8080; to allow iframe embedding.
