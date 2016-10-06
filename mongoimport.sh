#!/bin/bash
mongoimport --db koa2-boilerplate --collection users --drop --file data/users.json --jsonArray
