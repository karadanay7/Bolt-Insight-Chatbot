# Bolt-Insight-Chatbot


## Overview

This project is a chatbot application that includes a server-side component and a client-side UI. The server handles session management, question generation, and routes for the chatbot, while the client provides a user interface for interacting with the chatbot.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Setup

### Server

1. Navigate to the `server` directory:
    ```sh
    cd server
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the `server` directory and add the necessary environment variables:
    ```env
    # Example .env file
    PORT=5001
    DATABASE_URL=mongodb+srv://username:password@cluster....
    OPENAI_API_KEY = sk--
    ```

4. Start the server:
    ```sh
    npm run start
    ```

### Client

1. Navigate to the `chatbot-ui` directory:
    ```sh
    cd chatbot-ui
    ```
    
2. Install the dependencies:
    ```sh
    npm install
    ```

3. Start the client:
    ```sh
    npm run start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000` to access the chatbot UI.
2. Interact with the chatbot through the user interface.


