# -*- mode: ruby -*-
# vi: set ft=ruby :

require 'yaml'

current_dir = File.dirname(File.expand_path(__FILE__))
configs = YAML.load_file("#{current_dir}/vagrant.yaml")

Vagrant.configure("2") do |config|
    config.vm.box = "ubuntu/trusty64"

    config.vm.network "forwarded_port", guest: 80, host: configs['configs']['ports']['http']
    config.vm.network "forwarded_port", guest: 3000, host: configs['configs']['ports']['http_node']
    config.vm.network "forwarded_port", guest: 27017, host: configs['configs']['ports']['debug_node']
    config.vm.network "public_network"

    config.vm.synced_folder ".", configs['configs']['path']['project']
    config.vm.provider "virtualbox" do |v|
        v.memory = 2048
        v.cpus = 1
    end

    # fix tty issue
    config.vm.provision "fix-no-tty", type: "shell" do |s|
        s.privileged = false
        s.inline = "sudo sed -i '/tty/!s/mesg n/tty -s \\&\\& mesg n/' /root/.profile"
    end

    config.vm.provision "shell", path: "puppet/install_modules.sh", args: configs['configs']['path']['project']

    config.vm.provision :puppet do |puppet|
      puppet.manifests_path = "puppet/manifests"
      puppet.manifest_file = "server.pp"
      #puppet.module_path = "puppet/modules"
    end

end
