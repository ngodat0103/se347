resource "google_compute_address" "ip-public-instance" {
  name = var.name
  region = var.region
  address_type = "EXTERNAL"
}

resource "google_compute_instance" "instance" {
  name         = var.name
  machine_type = var.machine_type
  zone         = var.zone
  labels ={
    environment = var.environment 
  }
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
      nat_ip = google_compute_address.ip-public-instance.address
    }
  }
  metadata = {
    ssh-keys = "ubuntu:${file("${var.pub_key_path}")}"
  }
  metadata_startup_script = var.startup_script
}