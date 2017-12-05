#!/bin/bash
clear

# NG build
ng build --prod

# firebase deploy
firebase deploy --only hosting
