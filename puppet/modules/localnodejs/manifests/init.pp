$app_path = '/var/www/words'

include ::apt

class localnodejs {
  ensure_packages(['apt-transport-https', 'ca-certificates'])

  apt::source { 'nodesource':
    include  => {
      'src' => true,
    },
    key      => {
      'id'     => '9FD3B784BC1C6FC31A8A0A1C1655A0AB68576280',
      'source' => 'https://deb.nodesource.com/gpgkey/nodesource.gpg.key',
    },
    location => "https://deb.nodesource.com/node_6.x",
    repos    => 'main',
    require  => [
      Package['apt-transport-https'],
      Package['ca-certificates'],
    ],
  }

  package { 'nodejs':
    ensure   => present,
    require  => [Exec['apt-get update']]
  }

  package { 'bower':
    ensure   => present,
    provider => 'npm',
    require  => Package['nodejs'],
  }

  package { 'mocha':
    ensure   => present,
    provider => 'npm',
    require  => Package['nodejs'],
  }

  package { 'nodemon':
    ensure   => present,
    provider => 'npm',
    require  => Package['nodejs'],
  }

  exec { 'npm install --no-bin-links' :
    cwd  => $app_path,
    user => 'vagrant',
    path => ['/usr/local/node/node-default/bin', '/bin', '/usr/bin']
  }
}

