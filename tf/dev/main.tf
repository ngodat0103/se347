provider "google" {
  credentials = file("~/.config/gcloud/application_default_credentials.json")
  project     = var.project_id
  region      = var.region
  zone        = var.zone
}

module "firewall_rules" {
  source       = "terraform-google-modules/network/google//modules/firewall-rules"
  project_id   = var.project_id
  network_name = var.network
  rules = [{
    name                    = "allow-http-https"
    description             = "Allow HTTP and HTTPS traffic"
    direction               = "INGRESS"
    source_ranges           = ["0.0.0.0/0"]
    target_tags             = ["http-server", "https-server"]
    allow = [{
      protocol = "tcp"
      ports    = ["80"],
      },
      {
        protocol = "tcp"
        ports    = ["443"],
      }
    ]
    }
  ]
}



module "instance" {
  source         = "../modules/instance"
  environment    = var.environment
  machine_type   = "e2-micro"
  startup_script = <<-EOT
    #!/bin/bash
    cd /tmp
    git clone https://github.com/ngodat0103/scripts.git
    chmod +x ./scripts/docker-installation.sh
    ./scripts/docker-installation.sh
    mkdir -p /opt/se347
    cd /opt
    git clone https://github.com/ngodat0103/se347.git
    cd se347/backend
    docker compose --profile all up -d
  EOT
}
