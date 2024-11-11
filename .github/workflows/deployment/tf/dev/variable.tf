variable "project_id" {
  description = "Project ID"
  type        = string
}
variable "region" {
  description = "Region for instances"
  type        = string
  default     = "asia-southeast2"
}
variable "zone" {
  description = "Zone for instances"
  type        = string
  default     = "asia-southeast2-a"
}
variable "environment" {
  description = "Environment for instances"
  type        = string
  default     = "dev"
}
variable "startup_script" {
    description = "Startup script for instances"
    type        = string
    default     = ""
}
variable "network" {
  description = "Network for instances"
  type        = string
  default     = "default"
}