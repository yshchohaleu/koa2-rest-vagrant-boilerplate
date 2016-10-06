.PHONY: test
test:
	@NODE_ENV=test mocha \
		--compilers js:babel-register \
		--harmony \
		--reporter spec \
		--require should \
		test/*.js
