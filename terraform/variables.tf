variable "project_id" {
  description = "affable-alpha-484206-c6"
  type        = string
}

variable "region" {
  description = "GCP Region"
  default     = "us-central1"
}

variable "zone" {
  description = "GCP Zone"
  default     = "us-central1-a"
}

variable "secret_key" {
  description = "Peitohermosa123."
  type        = string
  sensitive   = true
}
