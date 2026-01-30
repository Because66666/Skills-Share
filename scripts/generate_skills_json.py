import os
import json
import re
import zipfile
from datetime import datetime

def parse_frontmatter(content):
    """
    Parse the YAML-like frontmatter from the content.
    Assumes frontmatter is between the first two '---' lines.
    """
    match = re.search(r'^---\s*\n(.*?)\n---\s*\n', content, re.DOTALL)
    if not match:
        return {}
    
    frontmatter_str = match.group(1)
    frontmatter = {}
    
    for line in frontmatter_str.split('\n'):
        if ':' in line:
            key, value = line.split(':', 1)
            frontmatter[key.strip()] = value.strip()
            
    return frontmatter

def create_zip(source_dir, output_filename):
    """
    Zip the contents of source_dir into output_filename.
    """
    with zipfile.ZipFile(output_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(source_dir):
            for file in files:
                file_path = os.path.join(root, file)
                # Calculate relative path to preserve directory structure inside zip
                arcname = os.path.relpath(file_path, source_dir)
                zipf.write(file_path, arcname)

def main():
    # Base paths
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    skills_dir = os.path.join(base_dir, 'skills')
    public_dir = os.path.join(base_dir, 'public')
    public_zip_dir = os.path.join(public_dir, 'zip')
    output_file = os.path.join(public_dir, 'skills.json')

    # Ensure public directories exist
    if not os.path.exists(public_dir):
        os.makedirs(public_dir)
    if not os.path.exists(public_zip_dir):
        os.makedirs(public_zip_dir)

    skills = []

    # Iterate over subdirectories in skills folder
    if os.path.exists(skills_dir):
        for folder_name in os.listdir(skills_dir):
            folder_path = os.path.join(skills_dir, folder_name)
            
            if os.path.isdir(folder_path):
                skill_md_path = os.path.join(folder_path, 'SKILL.md')
                
                if os.path.exists(skill_md_path):
                    try:
                        with open(skill_md_path, 'r', encoding='utf-8') as f:
                            content = f.read()
                            
                        frontmatter = parse_frontmatter(content)
                        
                        # Create ZIP file
                        zip_filename = f"{folder_name}.zip"
                        zip_filepath = os.path.join(public_zip_dir, zip_filename)
                        create_zip(folder_path, zip_filepath)
                        
                        # Get ZIP file size
                        zip_size = os.path.getsize(zip_filepath)

                        # Map fields and add defaults
                        skill = {
                            "id": folder_name,
                            "title": frontmatter.get('name', folder_name),
                            "description": frontmatter.get('description', ''),
                            "author": frontmatter.get('author', 'Unknown'),
                            "version": frontmatter.get('version', '1.0'),
                            "trigger": frontmatter.get('trigger', ''),
                            "output_format": frontmatter.get('output_format', ''),
                            # Default fields for frontend compatibility
                            "content": content, # Optionally include full content
                            "tags": [{"id": "t1", "name": frontmatter.get('tag', '')}], # Default tag
                            "downloadCount": 0,
                            "rating": 5.0,
                            "publishDate": datetime.now().strftime("%Y-%m-%d"),
                            "icon": "Code", # Default icon
                            "color": "blue", # Default color
                            "status": "approved",
                            "user": {
                                "id": "id",
                                "name": frontmatter.get('author', 'Unknown'),
                                "avatar": ""
                            },
                            "comments": [],
                            "ratings": [],
                            "attachments": [
                                {
                                    "id": f"zip-{folder_name}",
                                    "originalName": zip_filename,
                                    "fileName": zip_filename,
                                    "mimeType": "application/zip",
                                    "size": zip_size,
                                    "path": f"/zip/{zip_filename}"
                                }
                            ]
                        }
                        
                        skills.append(skill)
                        print(f"Processed skill: {folder_name} (Zip created: {zip_filename}, Size: {zip_size} bytes)")
                        
                    except Exception as e:
                        print(f"Error processing {folder_name}: {e}")

    # Write to JSON file
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(skills, f, ensure_ascii=False, indent=2)
    
    print(f"Successfully generated {output_file} with {len(skills)} skills.")

if __name__ == "__main__":
    main()
