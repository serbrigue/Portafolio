provider "google" {
  project = var.project_id
  region  = var.region
  zone    = var.zone
}

resource "google_compute_network" "vpc_network" {
  name = "portfolio-network"
}

resource "google_compute_firewall" "default" {
  name    = "portfolio-allow-http"
  network = google_compute_network.vpc_network.name

  allow {
    protocol = "tcp"
    ports    = ["80", "22"] # Removed 5000 (API is strictly internal now)
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["http-server"]
}

resource "google_compute_instance" "vm_instance" {
  name         = "portfolio-vm"
  machine_type = "e2-micro"
  tags         = ["http-server"]

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }

  network_interface {
    network = google_compute_network.vpc_network.name
    access_config {
      // Ephemeral public IP
    }
  }

  metadata_startup_script = templatefile("startup.tpl", {
    secret_key = var.secret_key
  })

  service_account {
    scopes = ["cloud-platform"]
  }
}
