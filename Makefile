port = 3000

dev:
	export NODE_OPTIONS=--openssl-legacy-provider && yarn dev --port $(port)

replace-vue-leaflet:
	yarn --ignore-engines remove vue2-leaflet
	yarn --ignore-engines add nielsklazenga/vue2-leaflet-fix-uppercase
