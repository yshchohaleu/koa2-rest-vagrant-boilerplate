#!/bin/bash

PD="$1"

mkdir -p "/etc/puppet/modules";
if [ ! -d "/etc/puppet/modules/apt" ]; then
    puppet module install puppetlabs/apt --force
fi

if [ ! -d "/etc/puppet/modules/nodejs" ]; then
    puppet module install puppetlabs/nodejs --force
fi

cp -a "$PD/puppet/modules/." "/etc/puppet/modules/";


