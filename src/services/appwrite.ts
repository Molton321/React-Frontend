// src/appwrite.js
import { Client, Account, OAuthProvider } from 'appwrite'

const client = new Client()
client
    .setEndpoint('https://fra.cloud.appwrite.io/v1') // The Appwrite API endpoint
    .setProject('6828ef12003de6fc6f02') // Your Appwrite project IDexport 

const account = new Account(client)
export { client, account, OAuthProvider }

