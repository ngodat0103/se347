resource "google_compute_address" "default" {
  name = var.name
  region = var.region
  address_type = "EXTERNAL"
  network = var.network
  subnetwork= var.subnetwork 
}

resource "google_compute_instance" "default" {
  name         = var.name
  machine_type = var.machine_type
  zone         = var.zone
  tags         = ["http-server", "https-server"]
  boot_disk {
    initialize_params {
      image = var.image
      size  = var.boot_disk_size
    }
  }
  network_interface {
    network = var.network
    subnetwork = var.subnetwork
    access_config {
      nat_ip = google_compute_address.default.address
    }
  }
  metadata = {
    ssh-keys = "ubuntu:${file(var.pub_key_path)}"
  }
  metadata_startup_script = <<-EOT
    #!/bin/bash
    git clone https://github.com/ngodat0103/scripts.git
    chmod +x ./script/docker-installation.sh
    ./script/docker-installation.sh
  EOT
}