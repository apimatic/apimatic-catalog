#!/usr/bin/env bash

# Loop over all folders in the current directory
for folder in */; do
  # Ensure we're only processing directories
  if [ -d "$folder" ]; then
    # Extract subfolder name (folder name without trailing slash)
    subfolder_name=$(basename "$folder")
    
    # Define paths for toc.yml and APIMATIC-BUILD.json
    toc_file="$folder/BuildFiles/content/toc.yml"
    build_json_file="$folder/BuildFiles/APIMATIC-BUILD.json"
    
    # Check if the toc.yml file exists
    if [ -f "$toc_file" ]; then
      # Overwrite toc.yml with the specified content
      cat <<EOL > "$toc_file"
toc:
- group: APIMATIC
  items:
  - generate: Step by Step Tutorial
    from: getting-started
  - group: APIMATIC Disclaimer
    items:
      - page: Disclaimer
        file: disclaimer.md
- generate: API Endpoints
  from: endpoints
- generate: Models
  from: models
EOL
      echo "Updated $toc_file"
    else
      echo "toc.yml not found in $folder/BuildFiles/content/"
    fi

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
