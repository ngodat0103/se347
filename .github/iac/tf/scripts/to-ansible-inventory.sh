#!/bin/bash
set -e
set -x

# Check if TF_ENVIRONMENT is set or prompt the user to enter it
if [ -z "$TF_ENVIRONMENT" ]; then
  read -p "TF_ENVIRONMENT not set. Please enter the environment (e.g., dev, prod): " TF_ENVIRONMENT
fi

# Validate the path for TF_ENVIRONMENT
ENV_PATH="../$TF_ENVIRONMENT"
if [ ! -d "$ENV_PATH" ]; then
  echo "Error: The specified environment directory '$ENV_PATH' does not exist."
  exit 1
fi

# Change to the environment directory
cd "$ENV_PATH"
instance_ip=$(terraform output -json | jq -r '.["ip-public-instance"].value')

# Validate if instance_ip was retrieved
if [ -z "$instance_ip" ]; then
  echo "Error: Unable to retrieve the instance IP from Terraform outputs."
  exit 1
fi

# Create or navigate to Ansible inventory directory and update instances.ini
ANSIBLE_INVENTORY_PATH="../../ansible/inventory"
mkdir -p "$ANSIBLE_INVENTORY_PATH"
cd "$ANSIBLE_INVENTORY_PATH"
touch instances.ini

# Write instance IP to instances.ini
echo "[instances]" > instances.ini
echo "$instance_ip" >> instances.ini

echo "Instance IP $instance_ip has been written to instances.ini successfully."
