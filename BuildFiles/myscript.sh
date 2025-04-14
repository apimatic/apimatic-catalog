#!/usr/bin/env bash

# Loop over all folders in the current directory
for folder in */; do
  # Ensure we're only processing directories
  if [ -d "$folder" ]; then
    # Extract subfolder name (folder name without trailing slash)
    subfolder_name=$(basename "$folder")
    
    # Define paths for APIMATIC-BUILD.json
    build_json_file="$folder/BuildFiles/APIMATIC-BUILD.json"

    # Check if the APIMATIC-BUILD.json file exists
    if [ -f "$build_json_file" ]; then
      # Update line 188 with the new navTitle
      # Using sed to replace line 188. We'll need to back up the file to avoid data loss
      sed -i '188s/.*/    "navTitle": "'"$subfolder_name"'",/' "$build_json_file"
      echo "Updated line 188 of $build_json_file"
    else
      echo "APIMATIC-BUILD.json not found in $folder/BuildFiles/"
    fi
  fi
done
