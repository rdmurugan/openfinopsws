#!/usr/bin/env python3
"""Script to add copyright headers to HTML, CSS, and JS files."""

import os

HTML_COPYRIGHT = '''<!--
Copyright (c) 2025 Infinidatum
Author: Duraimurugan Rajamanickam

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->
'''

CSS_JS_COPYRIGHT = '''/*
 * Copyright (c) 2025 Infinidatum
 * Author: Duraimurugan Rajamanickam
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'''

def add_html_copyright(filepath):
    """Add copyright to HTML file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'Copyright' in content or 'Infinidatum' in content:
        print(f"  Skipped (already has copyright): {filepath}")
        return False
    
    # Add after <!DOCTYPE html> or at the beginning
    if '<!DOCTYPE html>' in content:
        content = content.replace('<!DOCTYPE html>', '<!DOCTYPE html>\n' + HTML_COPYRIGHT, 1)
    elif '<html' in content:
        idx = content.find('<html')
        content = HTML_COPYRIGHT + '\n' + content
    else:
        content = HTML_COPYRIGHT + '\n' + content
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"  Added copyright to: {filepath}")
    return True

def add_css_js_copyright(filepath):
    """Add copyright to CSS or JS file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'Copyright' in content or 'Infinidatum' in content:
        print(f"  Skipped (already has copyright): {filepath}")
        return False
    
    content = CSS_JS_COPYRIGHT + content
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"  Added copyright to: {filepath}")
    return True

def main():
    count = 0
    
    # Process HTML files
    for root, dirs, files in os.walk('.'):
        # Skip hidden directories and node_modules
        dirs[:] = [d for d in dirs if not d.startswith('.') and d != 'node_modules']
        
        for file in files:
            filepath = os.path.join(root, file)
            
            if file.endswith('.html'):
                if add_html_copyright(filepath):
                    count += 1
            elif file.endswith('.css'):
                if add_css_js_copyright(filepath):
                    count += 1
            elif file.endswith('.js'):
                if add_css_js_copyright(filepath):
                    count += 1
    
    print(f"\n✅ Added copyright to {count} files")

if __name__ == '__main__':
    main()
