# Portal Catalog Repository

This repository is designed to manage all the static portals generated against build files using the APIMatic DocsGen flow. Each portal is contained in its own directory, with separate subdirectories for build files and it's generated content. The repository uses GitHub Actions to automate the process of building and deploying the portals to Cloudflare.

## Directory Structure

The repository should be structured as follows:

```
apimatic-catalog
├── Portal1/
│   └── BuildFiles/
├── Portal2/
│   └── BuildFiles/
├── Portal3/
│   └── BuildFiles/
└── .github/
    └── workflows/
        └── create-and-deploy-portals.yml
```

## Deployment workflow

The GitHub Action in this repository automates the process of creating and deploying portals based on the defined directory structure. It collects directories that have changed, zips the build files, sends them to APIMatic recieves the portal files and deploys them on Cloudflare Pages.

## Action Trigger

This action is triggered on a `push` to the `main` branch.

### Important Note:
- The action runs on the **LATEST commit**. If multiple changes are being added, ensure they are squashed into **ONE commit** before pushing to the `main` branch. The action activates only for directories that have changes; it cannot be run manually.

### Usage Instructions

1. **Make changes** to any of the Portal directories (e.g., `Portal1`, `Portal2`, or `Portal3`).
2. **Add changes to Git**:
   ```bash
   git add .
   ```
3. **Commit the changes**:
   ```bash
   git commit -m "Your commit message"
   ```
4. **Push to the main branch**:
   ```bash
   git push origin main
   ```

## Usage Warnings

- Do **NOT** update cloudflare repository secrets without first being aware of the consequences.
- **Warning:** Uppercase characters are **NOT allowed** in your portal directory naming. The action will fail if uppercase letters are used in your directory naming.
- **APIMATIC Versioning:** Versioned build files are **not supported**. Only add the build files from the **latest version** you want to upload into the `PortalName/BuildFiles/` directory.
- Ensure that commits include only changes relevant to the portal's build files to avoid unnecessary deployment runs.


## Action Workflow

This workflow consists of several jobs:

1. **Collect Changed Directories**:
   - Checks out the code and collects directories that have changed.
   
2. **Build and Deploy**:
   - Zips the build files in the changed directories.
   - Sends the zipped files to APIMatic for processing.
   - Checks for an existing Cloudflare project and creates it if necessary.
   - Deploys the portal to Cloudflare Pages.

3. **Update README**:
   - Truncates the existing README file and appends filtered subdomains.
   - Commits and pushes the updated README back to the repository.

## Required Secrets

The following secrets are used in this deployment repository:

- `APIMATIC_API_KEY`: API key for authentication with APIMatic.
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare account ID.
- `CLOUDFLARE_API_TOKEN`: Cloudflare API token with appropriate permissions.
- `GITHUB_TOKEN`: Provided automatically by GitHub Actions.


This action facilitates efficient integration with the development workflow, ensuring that changes to portals are quickly reflected in production.

## Published Portals
Here is the list of all the portals that are currently published to cloudflare from this `apimatic-catalog` repository:
\
* <http://kudosity-apimatic-catalog.pages.dev>
* <http://izettle-apimatic-catalog-b2z.pages.dev>
* <http://paxos-apimatic-catalog.pages.dev>
* <http://bambora-apimatic-catalog.pages.dev>
* <http://clickatell-apimatic-catalog.pages.dev>
* <http://uniswap-apimatic-catalog-dwv.pages.dev>
* <http://inxpress-apimatic-catalog.pages.dev>
* <http://fastspring-apimatic-catalog.pages.dev>
* <http://global-freight-solutions-apimatic-catalog.pages.dev>
* <http://bandwidth-apimatic-catalog.pages.dev>* <http://heymarket-apimatic-catalog.pages.dev>
* <http://truelayer-apimatic-catalog.pages.dev>
* <http://the-bank-of-london-apimatic-catalog.pages.dev>
* <http://teya-apimatic-catalog.pages.dev>
* <http://symphony-apimatic-catalog.pages.dev>
* <http://snapdocs-apimatic-catalog.pages.dev>
* <http://neon-apimatic-catalog.pages.dev>
* <http://paystand-apimatic-catalog.pages.dev>
* <http://solaris-apimatic-catalog.pages.dev>
* <http://taxbit-apimatic-catalog.pages.dev>
