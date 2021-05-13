watch:
	npm run build:watch
apptest:
	npm run build
	rm -rf testapp
	node lib/cli.js "github.com" --verbose --name testapp --tray start-in-tray --arch arm64 --max-width 1600 --max-height 900 --browserwindow-options '{ "titleBarStyle": "customButtonsOnHover", "frame": false, "alwaysOnTop": true }' out
	./out/testapp-darwin-arm64/testapp.app/Contents/MacOS/testapp --verbose
