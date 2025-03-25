import re
import json
import os
import ast

# Paths
PORTALS_FILE = "portals.ts"
BANNERS_DIR = "../public/assets/banners"
PLACEHOLDER_URL = "https://placehold.co/600x400/f0f0f0/555555?text={name}+API+Portal"

class Portal:
    def __init__(self, name, url, logoUrl, description, category, status, sdks, addedAt, screenshotUrl=None):
        self.name = name
        self.url = url
        self.logoUrl = logoUrl
        self.description = description
        self.category = category
        self.status = status
        self.sdks = sdks
        self.addedAt = addedAt
        self.screenshotUrl = screenshotUrl

    def to_dict(self):
        return self.__dict__

# Fixed approach using a more reliable parsing method
def load_portals():
    print("Loading portals from file...")
    with open(PORTALS_FILE, "r", encoding="utf-8") as f:
        content = f.read()
    
    print("Searching for portals array in the file...")
    # Find the array declaration
    array_match = re.search(r'export\s+const\s+portals\s*:?\s*Portal\[\]\s*=\s*\[', content)
    if not array_match:
        raise ValueError("Could not find portals array in the file")
    
    # Get the start position of the array
    start_idx = array_match.end()
    
    # Find matching closing bracket for the array
    bracket_count = 1  # We've already found one opening bracket
    end_idx = start_idx
    
    for i in range(start_idx, len(content)):
        if content[i] == '[':
            bracket_count += 1
        elif content[i] == ']':
            bracket_count -= 1
            if bracket_count == 0:  # Found the matching closing bracket
                end_idx = i
                break
    
    if bracket_count != 0:
        raise ValueError("Unbalanced brackets in the array")
    
    # Get the array content
    array_content = content[start_idx-1:end_idx+1]  # Include both brackets
    print(f"Array content length: {len(array_content)} characters")
    
    # Find all portal objects within the array
    # We need to find all objects between braces {}
    portals_data = []
    current_pos = 0
    
    # Loop to find all objects
    while True:
        # Find the start of an object
        obj_start = array_content.find('{', current_pos)
        if obj_start == -1:
            break  # No more objects found
        
        # Find the matching closing brace
        brace_count = 1
        obj_end = obj_start + 1
        
        for i in range(obj_start + 1, len(array_content)):
            if array_content[i] == '{':
                brace_count += 1
            elif array_content[i] == '}':
                brace_count -= 1
                if brace_count == 0:  # Found the matching closing brace
                    obj_end = i + 1
                    break
        
        if brace_count != 0:
            raise ValueError(f"Unbalanced braces in object starting at position {obj_start}")
        
        # Extract the object string
        obj_str = array_content[obj_start:obj_end]
        print(f"Found object with length {len(obj_str)} characters")
        
        # Parse the object properties
        name_match = re.search(r'name:\s*"([^"]+)"', obj_str)
        if name_match:
            portal_name = name_match.group(1)
            print(f"Found portal: {portal_name}")
            
            # Extract other properties
            url_match = re.search(r'url:\s*"([^"]+)"', obj_str)
            logoUrl_match = re.search(r'logoUrl:\s*"([^"]+)"', obj_str)
            description_match = re.search(r'description:\s*"([^"]+)"', obj_str)
            category_match = re.search(r'category:\s*"([^"]+)"', obj_str)
            status_match = re.search(r'status:\s*"([^"]+)"', obj_str)
            addedAt_match = re.search(r'addedAt:\s*"([^"]+)"', obj_str)
            screenshotUrl_match = re.search(r'screenshotUrl:\s*"([^"]+)"', obj_str)
            
            # Extract the sdks array
            sdks_match = re.search(r'sdks:\s*\[(.*?)\]', obj_str, re.DOTALL)
            sdks = []
            if sdks_match:
                sdks_str = sdks_match.group(1)
                # Find all quoted strings in the array
                sdk_items = re.findall(r'"([^"]+)"', sdks_str)
                sdks = sdk_items
                print(f"Found {len(sdks)} SDKs: {sdks}")
            
            # Create portal data dictionary
            portal_data = {
                "name": portal_name,
                "url": url_match.group(1) if url_match else "",
                "logoUrl": logoUrl_match.group(1) if logoUrl_match else "",
                "description": description_match.group(1) if description_match else "",
                "category": category_match.group(1) if category_match else "",
                "status": status_match.group(1) if status_match else "",
                "sdks": sdks,
                "addedAt": addedAt_match.group(1) if addedAt_match else "",
                "screenshotUrl": screenshotUrl_match.group(1) if screenshotUrl_match else ""
            }
            
            portals_data.append(portal_data)
            print(f"Portal {portal_name} parsed successfully")
        
        # Move to the next position
        current_pos = obj_end
    
    print(f"All portals loaded successfully. Found {len(portals_data)} portals.")
    return portals_data

# Update screenshot URLs
def update_screenshots(portals):
    print("Updating screenshot URLs...")
    if not os.path.exists(BANNERS_DIR):
        os.makedirs(BANNERS_DIR, exist_ok=True)
        print(f"Created directory: {BANNERS_DIR}")
        banner_files = set()
    else:
        banner_files = set(os.listdir(BANNERS_DIR))
        print(f"Found existing banner files: {banner_files}")
    
    for portal in portals:
        banner_name = f"{portal['name']}.webp"
        if banner_name in banner_files:
            portal["screenshotUrl"] = f"/assets/banners/{banner_name}"
            print(f"Updated screenshot URL for {portal['name']} to existing banner.")
        else:
            portal["screenshotUrl"] = PLACEHOLDER_URL.format(name=portal['name'].capitalize())
            print(f"Set placeholder screenshot URL for {portal['name']}.")
    
    print("Screenshot URLs updated.")
    return portals

# Convert Python dict back to TypeScript format
def format_as_typescript(data):
    print("Formatting data as TypeScript...")
    result = "[\n"
    
    for i, portal in enumerate(data):
        result += "  {\n"
        for key, value in portal.items():
            if key == "sdks":
                sdks_str = json.dumps(value, ensure_ascii=False)
                result += f"    {key}: {sdks_str},\n"
            else:
                if isinstance(value, str):
                    result += f'    {key}: "{value}",\n'
                else:
                    result += f"    {key}: {value},\n"
        result += "  },\n"
    
    result += "]"
    print("Data formatted as TypeScript.")
    return result

# Save updated portals.ts
def save_portals(portals):
    print("Saving updated portals to file...")
    ts_header = 'import { Portal } from "./portal-types";\n\nexport const portals: Portal[] = '
    ts_data = ts_header + format_as_typescript(portals)
    
    with open(PORTALS_FILE, "w", encoding="utf-8") as f:
        f.write(ts_data)
    print("Portals saved successfully.")

if __name__ == "__main__":
    try:
        print("Starting script...")

        portals = load_portals()
        print(f"Successfully loaded {len(portals)} portals.")
        
        updated_portals = update_screenshots(portals)
        
        save_portals(updated_portals)
        
        print(f"✅ portals.ts updated successfully! Updated {len(updated_portals)} portals.")
    except Exception as e:
        import traceback
        print(f"❌ Error: {str(e)}")
        print(traceback.format_exc())