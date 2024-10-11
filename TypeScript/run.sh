#!/bin/bash

if tmux has-session -t "Edt-2000" 2>/dev/null; then
    echo "Reconnecting...."
    tmux attach-session -t "Edt-2000"
else
    tmux new-session -d -s "Edt-2000"

    tmux split-window -h
    tmux split-window -h
    tmux split-window -t 1
    tmux split-window -t 3

    tmux send-keys -t 0 'cd Edt-Sledt && npm run start' C-m
    tmux send-keys -t 1 'cd Edt-Vidt && npm run start' C-m
    tmux send-keys -t 2 'cd Edt-Controller && npm run start' C-m
    tmux send-keys -t 3 'cd Edt-Launchpad && npm run start:0' C-m
    tmux send-keys -t 4 'cd Edt-Launchpad && npm run start:1' C-m

    tmux attach-session -t "Edt-2000"
fi
