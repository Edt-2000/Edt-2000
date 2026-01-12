#!/usr/bin/env bash

# Detect the terminal emulator
detect_terminal() {
    if [[ -n "$GNOME_TERMINAL_SERVICE" ]] || [[ "$COLORTERM" == "gnome-terminal" ]]; then
        echo "gnome-terminal"
    elif [[ -n "$KONSOLE_VERSION" ]]; then
        echo "konsole"
    elif [[ "$TERM_PROGRAM" == "iTerm.app" ]]; then
        echo "iterm"
    elif [[ -n "$KITTY_WINDOW_ID" ]]; then
        echo "kitty"
    elif [[ -n "$ALACRITTY_SOCKET" ]] || [[ "$TERM" == "alacritty" ]]; then
        echo "alacritty"
    elif [[ "$TERM_PROGRAM" == "Apple_Terminal" ]]; then
        echo "apple-terminal"
    else
        echo "unknown"
    fi
}

TERMINAL=$(detect_terminal)
BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Detected terminal: $TERMINAL"
echo "Starting Edt-2000 applications in tabs..."

case "$TERMINAL" in
    gnome-terminal)
        # GNOME Terminal - opens a new window with multiple tabs
        gnome-terminal \
            --window --title="Edt-Sledt" --working-directory="$BASE_DIR/Edt-Sledt" -- zsh -c 'npm run start; exec zsh' \
            --tab --title="Edt-Vidt" --working-directory="$BASE_DIR/Edt-Vidt" -- zsh -c 'npm run start; exec zsh' \
            --tab --title="Edt-Controller" --working-directory="$BASE_DIR/Edt-Controller" -- zsh -c 'npm run start; exec zsh' \
            --tab --title="Edt-Launchpad-1" --working-directory="$BASE_DIR/Edt-Launchpad" -- zsh -c 'npm run start:1; exec zsh' \
            --tab --title="Edt-Launchpad-2" --working-directory="$BASE_DIR/Edt-Launchpad" -- zsh -c 'npm run start:2; exec zsh'
        ;;

    konsole)
        # KDE Konsole
        konsole --new-tab --workdir "$BASE_DIR/Edt-Sledt" -e bash -c "npm run start; exec zsh" &
        sleep 0.5
        konsole --new-tab --workdir "$BASE_DIR/Edt-Vidt" -e bash -c "npm run start; exec zsh" &
        sleep 0.5
        konsole --new-tab --workdir "$BASE_DIR/Edt-Controller" -e bash -c "npm run start; exec zsh" &
        sleep 0.5
        konsole --new-tab --workdir "$BASE_DIR/Edt-Launchpad" -e bash -c "npm run start:1; exec zsh" &
        sleep 0.5
        konsole --new-tab --workdir "$BASE_DIR/Edt-Launchpad" -e bash -c "npm run start:2; exec zsh" &
        ;;

    kitty)
        # Kitty terminal
        kitty @ launch --type=tab --tab-title "Edt-Sledt" --cwd "$BASE_DIR/Edt-Sledt" zsh -c "npm run start; exec zsh"
        kitty @ launch --type=tab --tab-title "Edt-Vidt" --cwd "$BASE_DIR/Edt-Vidt" zsh -c "npm run start; exec zsh"
        kitty @ launch --type=tab --tab-title "Edt-Controller" --cwd "$BASE_DIR/Edt-Controller" zsh -c "npm run start; exec zsh"
        kitty @ launch --type=tab --tab-title "Edt-Launchpad-1" --cwd "$BASE_DIR/Edt-Launchpad" zsh -c "npm run start:1; exec zsh"
        kitty @ launch --type=tab --tab-title "Edt-Launchpad-2" --cwd "$BASE_DIR/Edt-Launchpad" zsh -c "npm run start:2; exec zsh"
        ;;

    iterm)
        # iTerm2 (macOS)
        osascript <<EOF
tell application "iTerm"
    tell current window
        create tab with default profile
        tell current session
            write text "cd '$BASE_DIR/Edt-Sledt' && npm run start"
        end tell

        create tab with default profile
        tell current session
            write text "cd '$BASE_DIR/Edt-Vidt' && npm run start"
        end tell

        create tab with default profile
        tell current session
            write text "cd '$BASE_DIR/Edt-Controller' && npm run start"
        end tell

        create tab with default profile
        tell current session
            write text "cd '$BASE_DIR/Edt-Launchpad' && npm run start:0"
        end tell

        create tab with default profile
        tell current session
            write text "cd '$BASE_DIR/Edt-Launchpad' && npm run start:1"
        end tell
    end tell
end tell
EOF
        ;;

    apple-terminal)
        # macOS Terminal
        osascript <<EOF
tell application "Terminal"
    do script "cd '$BASE_DIR/Edt-Sledt' && npm run start"
    do script "cd '$BASE_DIR/Edt-Vidt' && npm run start"
    do script "cd '$BASE_DIR/Edt-Controller' && npm run start"
    do script "cd '$BASE_DIR/Edt-Launchpad' && npm run start:0"
    do script "cd '$BASE_DIR/Edt-Launchpad' && npm run start:1"
end tell
EOF
        ;;

    alacritty)
        # Alacritty doesn't support tabs natively, fall back to separate windows
        echo "Alacritty doesn't support tabs. Opening in separate windows..."
        alacritty --working-directory "$BASE_DIR/Edt-Sledt" -e zsh -c "npm run start; exec zsh" &
        alacritty --working-directory "$BASE_DIR/Edt-Vidt" -e zsh -c "npm run start; exec zsh" &
        alacritty --working-directory "$BASE_DIR/Edt-Controller" -e zsh -c "npm run start; exec zsh" &
        alacritty --working-directory "$BASE_DIR/Edt-Launchpad" -e zsh -c "npm run start:1; exec zsh" &
        alacritty --working-directory "$BASE_DIR/Edt-Launchpad" -e zsh -c "npm run start:2; exec zsh" &
        ;;

    *)
        echo "Unknown terminal emulator. Falling back to xterm..."
        xterm -T "Edt-Sledt" -e "cd '$BASE_DIR/Edt-Sledt' && npm run start; exec zsh" &
        xterm -T "Edt-Vidt" -e "cd '$BASE_DIR/Edt-Vidt' && npm run start; exec zsh" &
        xterm -T "Edt-Controller" -e "cd '$BASE_DIR/Edt-Controller' && npm run start; exec zsh" &
        xterm -T "Edt-Launchpad-1" -e "cd '$BASE_DIR/Edt-Launchpad' && npm run start:1; exec zsh" &
        xterm -T "Edt-Launchpad-2" -e "cd '$BASE_DIR/Edt-Launchpad' && npm run start:2; exec zsh" &
        ;;
esac

echo "All applications started!"
