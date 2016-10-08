.PHONY: test
test:
	@NODE_ENV=test mocha \
		--compilers js:babel-register \
		--harmony \
		--reporter spec \
		--require should \
		src/test/*.js
