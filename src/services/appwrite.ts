// src/appwrite.js
import { Client, Account, OAuthProvider } from 'appwrite'

const client = new Client();
client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('6828ef12003de6fc6f02');

const account = new Account(client)
export { client, account, OAuthProvider }

