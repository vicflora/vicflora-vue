node_options = export NODE_OPTIONS=--openssl-legacy-provider
port = 3000

dev:
	$(node_options) && yarn dev --port $(port)
