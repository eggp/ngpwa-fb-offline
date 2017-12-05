#!/bin/bash
clear

# NG build
ng build --prod

# firebase http2 push
./node_modules/firebase-http2-push-config/generate-http2-push.js

# firebase deploy
firebase deploy --only hosting
