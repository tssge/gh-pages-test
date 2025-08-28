# GitHub Pages Test Repository

This is a GitHub Pages test repository using Jekyll for static site generation. The repository is designed for testing GitHub Pages deployment workflows and contains a fully functional Jekyll site with the Minima theme.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Bootstrap and Setup
1. Install Ruby gem dependencies:
   ```bash
   export PATH="$PATH:/home/runner/.local/share/gem/ruby/3.2.0/bin"
   bundle config set --local path 'vendor/bundle'
   bundle install  # Takes ~21 seconds. NEVER CANCEL. Set timeout to 60+ seconds.
   ```

2. Build the Jekyll site:
   ```bash
   bundle exec jekyll build  # Takes ~1 second. NEVER CANCEL. Set timeout to 30+ seconds.
   ```

3. Serve the site locally for development:
   ```bash
   bundle exec jekyll serve --host 0.0.0.0 --port 4000  # NEVER CANCEL. Server runs indefinitely until stopped.
   ```
   - Site will be available at `http://localhost:4000/`
   - Use `Ctrl+C` to stop the server

### Alternative Static Site Setup
For non-Jekyll workflows:
```bash
python3 -m http.server 8000  # Simple HTTP server for static files
# Site available at http://localhost:8000/
```

## Build Times and Expectations
- **Bundle install**: ~21 seconds (includes native gem compilation)
- **Jekyll build**: ~1 second for initial build, <1 second for incremental builds
- **Jekyll serve startup**: ~1 second, then runs continuously
- **NEVER CANCEL** any build or serve commands - they are designed to run to completion or indefinitely

## Validation Scenarios
After making changes to the site:

1. **Always build and serve the site locally**:
   ```bash
   bundle exec jekyll build
   bundle exec jekyll serve --host 0.0.0.0 --port 4000
   ```

2. **Test basic functionality**:
   - Verify homepage loads: `curl -s http://localhost:4000/ | head -10`
   - Check that navigation works
   - Verify CSS and styling renders correctly

3. **Validate GitHub Pages deployment**:
   - The repository includes GitHub Actions workflow at `.github/workflows/pages.yml`
   - Push to master branch triggers automatic deployment
   - GitHub Pages deployment typically takes 1-2 minutes

## Repository Structure
```
/home/runner/work/gh-pages-test/gh-pages-test/
├── .github/
│   └── workflows/
│       └── pages.yml          # GitHub Pages deployment workflow
├── .bundle/                   # Bundle configuration (ignore)
├── .jekyll-cache/            # Jekyll cache (ignore)
├── _posts/                   # Blog posts directory
├── _site/                    # Generated site (ignore - build output)
├── vendor/                   # Ruby gems (ignore)
├── 404.html                  # Custom 404 page
├── _config.yml               # Jekyll configuration
├── about.markdown            # About page
├── index.markdown            # Homepage
├── Gemfile                   # Ruby dependencies
└── Gemfile.lock             # Locked dependency versions
```

## Available Tools and Versions
- **Ruby**: 3.2.3
- **Node.js**: v20.19.4  
- **npm**: 10.8.2
- **Python**: 3.12.3
- **Jekyll**: 4.4.1 (via bundle)

## Common Tasks

### Adding New Content
1. **Add a new blog post**:
   - Create file in `_posts/` with format: `YYYY-MM-DD-title.markdown`
   - Include YAML front matter with title, date, and categories

2. **Modify site configuration**:
   - Edit `_config.yml`
   - **IMPORTANT**: Restart Jekyll serve after config changes (not auto-reloaded)

3. **Add new pages**:
   - Create `.markdown` or `.html` files in root directory
   - Include YAML front matter for proper processing

### Development Workflow
1. Make changes to content files
2. Jekyll serve automatically rebuilds (except `_config.yml` changes)
3. Refresh browser to see changes
4. Commit and push to trigger GitHub Pages deployment

## Error Handling and Troubleshooting

### Ruby/Bundle Issues
- **Permission errors**: Ensure `bundle config set --local path 'vendor/bundle'` is set
- **Missing gems**: Run `bundle install` to install dependencies
- **Path issues**: Always export `PATH="$PATH:/home/runner/.local/share/gem/ruby/3.2.0/bin"`

### Jekyll Issues  
- **Build failures**: Check syntax in YAML front matter and `_config.yml`
- **Sass deprecation warnings**: These are expected with Minima theme, site will still build
- **Server won't start**: Check if port 4000 is already in use

### GitHub Pages Deployment
- **Deployment failures**: Check GitHub Actions tab for build logs
- **404 errors**: Verify `baseurl` in `_config.yml` matches repository name if using project pages

## Files to Ignore
These files/directories are generated and should not be committed:
- `_site/` (Jekyll build output)
- `.jekyll-cache/` (Jekyll cache)
- `vendor/` (Ruby gems)
- `.bundle/` (Bundle configuration)

## Critical Reminders
- **NEVER CANCEL** build or serve commands - let them complete naturally
- **ALWAYS** test locally before pushing to production
- **RESTART** Jekyll serve after `_config.yml` changes
- **SET TIMEOUTS** of 60+ seconds for bundle install, 30+ seconds for builds
- **PATH SETUP** is required for Ruby gems to work correctly