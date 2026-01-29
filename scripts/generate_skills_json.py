import os
import json
import re
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

def main():
    # Base paths
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    skills_dir = os.path.join(base_dir, 'skills')
    public_dir = os.path.join(base_dir, 'public')
    output_file = os.path.join(public_dir, 'skills.json')

    # Ensure public directory exists
    if not os.path.exists(public_dir):
        os.makedirs(public_dir)

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
                            "tags": [{"id": "t1", "name": "AI"}], # Default tag
                            "downloadCount": 0,
                            "rating": 5.0,
                            "publishDate": datetime.now().strftime("%Y-%m-%d"),
                            "icon": "Code", # Default icon
                            "color": "blue", # Default color
                            "status": "approved",
                            "user": {
                                "id": "admin",
                                "name": frontmatter.get('author', 'Unknown'),
                                "avatar": ""
                            },
                            "comments": [],
                            "ratings": [],
                            "attachments": []
                        }
                        
                        skills.append(skill)
                        print(f"Processed skill: {folder_name}")
                        
                    except Exception as e:
                        print(f"Error processing {folder_name}: {e}")

    # Write to JSON file
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(skills, f, ensure_ascii=False, indent=2)
    
    print(f"Successfully generated {output_file} with {len(skills)} skills.")

if __name__ == "__main__":
    main()
