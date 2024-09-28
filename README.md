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
* <http://fabric-apimatic-catalog.pages.dev>
* <http://keybank-apimatic-catalog.pages.dev>
* <http://luminor-apimatic-catalog.pages.dev>
* <http://finix-apimatic-catalog.pages.dev>
* <http://fnz-group-apimatic-catalog.pages.dev>
* <http://jumio-apimatic-catalog.pages.dev>
* <http://great-american-insurance-apimatic-catalog.pages.dev>
* <http://corpay-apimatic-catalog.pages.dev>
* <http://conekta-apimatic-catalog-88o.pages.dev>
* <http://deutsche-bank-apimatic-catalog.pages.dev>* <http://dojo-apimatic-catalog.pages.dev>
* <http://common-wealth-bank-apimatic-catalog.pages.dev>
* <http://check-apimatic-catalog.pages.dev>
* <http://dnb-apimatic-catalog.pages.dev>
* <http://bakkt-apimatic-catalog.pages.dev>
* <http://experian-apimatic-catalog.pages.dev>
* <http://chubb-apimatic-catalog.pages.dev>
* <http://bnp-paribas-apimatic-catalog.pages.dev>
* <http://dock-tech-apimatic-catalog.pages.dev>
* <http://cigna-apimatic-catalog.pages.dev>
