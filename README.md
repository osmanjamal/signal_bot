# Signal Bot

Connect TradingView signals with Binance trading platform automatically.
npm start
npm run install:all
npm run docker:up


```dockerfile
# docker/backend.Dockerfile
FROM node:16-alpine

# Working directory
WORKDIR /app

# Copy package files
COPY ./backend/package*.json ./

# Install dependencies
RUN npm install --production

# Copy source code
COPY ./backend ./

# Expose API port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]

## Overview

Signal Bot is a web application that allows you to receive TradingView strategy alerts via webhooks and automatically execute trades on Binance based on those signals. This eliminates the need for manual intervention when your TradingView strategies generate trading signals.

## Features

- **User Authentication**: Secure user accounts with JWT authentication
- **Bot Management**: Create and manage multiple signal bots
- **Webhook Integration**: Receive signals from TradingView strategies
- **Binance Integration**: Execute trades automatically on Binance
- **Dashboard**: Monitor account balance and trading activity
- **Signals Log**: Track received signals and their execution status

## Project Structure

The project is organized into two main parts:

- **Backend**: Node.js/Express API server
- **Frontend**: React-based web interface

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB
- Binance account with API access

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/signal-bot.git
   cd signal-bot
   
   
PS C:\Users\OSMAN\signal-bot> tree /f
Folder PATH listing
Volume serial number is E406-E5A6
C:.
│   .env.example
│   .gitignore
│   package.json
│   README.md
│
├───backend
│   │   package.json
│   │   README.md
│   │
│   └───src
│       │   app.js
│       │   server.js
│       │
│       ├───api
│       │   ├───controllers
│       │   │       auth.controller.js
│       │   │       bot.controller.js
│       │   │       user.controller.js
│       │   │       webhook.controller.js
│       │   │
│       │   ├───middlewares
│       │   │       auth.middleware.js
│       │   │       error.middleware.js
│       │   │       webhook.middleware.js
│       │   │
│       │   ├───routes
│       │   │       auth.routes.js
│       │   │       bot.routes.js
│       │   │       user.routes.js
│       │   │       webhook.routes.js
│       │   │
│       │   └───validations
│       │           auth.validation.js
│       │           bot.validation.js
│       │           user.validation.js
│       │
│       ├───config
│       │       default.js
│       │       development.js
│       │       production.js
│       │
│       ├───models
│       │       Bot.js
│       │       Signal.js
│       │       Trade.js
│       │       User.js
│       │
│       ├───services
│       │       binance.service.js
│       │       crypto.service.js
│       │       signal.service.js
│       │       tradingview.service.js
│       │
│       └───utils
│               constants.js
│               logger.js
│               uuid.js
│               validators.js
│
├───docker
│       backend.Dockerfile
│       docker-compose.yml
│       frontend.Dockerfile
│
└───frontend
    │   package.json
    │   README.md
    │
    ├───public
    │   │   favicon.ico
    │   │   index.html
    │   │
    │   └───assets
    └───src
        │   App.js
        │   config.js
        │   index.js
        │
        ├───components
        │   ├───Auth
        │   │       AuthForm.js
        │   │       Login.js
        │   │       Register.js
        │   │
        │   ├───Bot
        │   │       BotCard.js
        │   │       BotForm.js
        │   │       BotList.js
        │   │       WebhookInfo.js
        │   │
        │   ├───Common
        │   │       Alert.js
        │   │       Header.js
        │   │       Loader.js
        │   │       Sidebar.js
        │   │
        │   ├───Dashboard
        │   │       Balance.js
        │   │       Dashboard.js
        │   │       OpenTrades.js
        │   │       SignalLog.js
        │   │
        │   └───Settings
        │           ApiSettings.js
        │           Profile.js
        │           Settings.js
        │
        ├───services
        │       api.js
        │       auth.service.js
        │       binance.service.js
        │       bot.service.js
        │       signal.service.js
        │
        ├───store
        │   │   index.js
        │   │
        │   ├───actions
        │   │       authActions.js
        │   │       binanceActions.js
        │   │       botActions.js
        │   │       signalActions.js
        │   │       userActions.js
        │   │
        │   └───reducers
        │           authReducer.js
        │           binanceReducer.js
        │           botReducer.js
        │           signalReducer.js
        │           userReducer.js
        │
        └───utils
                constants.js
                formatters.js
                validators.js