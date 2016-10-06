class mongodb {
  package { 'mongodb':
    require => Exec['apt-get update'],
    ensure  => installed,
  }

  service { 'mongodb':
    ensure => running,
  }
}


