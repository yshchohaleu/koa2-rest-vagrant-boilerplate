# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
    config.vm.box = "ubuntu/trusty64"

    config.vm.network "forwarded_port", guest: 80, host: 8080
    config.vm.network "forwarded_port", guest: 3000, host: 3000
    config.vm.network "forwarded_port", guest: 27017, host: 27018
    config.vm.network "public_network"

    config.vm.synced_folder ".", "/var/www/koa2-boilerplate"
    config.vm.provider "virtualbox" do |v|
        v.memory = 2048
        v.cpus = 1
    end

    # fix tty issue
    config.vm.provision "fix-no-tty", type: "shell" do |s|
        s.privileged = false
        s.inline = "sudo sed -i '/tty/!s/mesg n/tty -s \\&\\& mesg n/' /root/.profile"
    end

    config.vm.provision :puppet do |puppet|
      puppet.manifests_path = "puppet/manifests"
      puppet.manifest_file = "server.pp"
      puppet.module_path = "puppet/modules"
    end

end
