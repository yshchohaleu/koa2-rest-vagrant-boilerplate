## Install

* vagrant up
* vagrant provision

Connect via ssh to vagrant virtual machine (e.g `ssh vagrant@127.0.0.1 -p 2222` password _vagrant_)

* npm install
* npm test
* npm start

## To check REST service

* curl -XPOST -d '{ "name": "Foo Bar", "email": "foo@bar.com", password: "secretpassword"  }' localhost:3000/api/auth
