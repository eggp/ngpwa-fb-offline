#!/bin/bash
clear

# NG build
ng build --prod

# fix cli appshell (not published function)
# appshell generator, generated new index.html , and we generate new hash
OLD=`cat dist/ngsw.json | grep -e 'index.html": '`;
NEW=`./node_modules/ng-pwa-tools/bin/ngu-sw-manifest.js | grep -e 'index.html'`;
sed -i "s|$OLD|$NEW|g" dist/ngsw.json

# firebase http2 push
./node_modules/firebase-http2-push-config/generate-http2-push.js

# firebase deploy
firebase deploy --only hosting
