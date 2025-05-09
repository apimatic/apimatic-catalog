# APIMatic Catalog

The **APIMatic Catalog** is a curated collection of API developer portals presented in a user-friendly, categorized interface. Each portal entry includes key details such as description, logo, supported SDKs, screenshots, and a link to the actual documentation. This project supports both development and production environments and integrates with an Azure deployment pipeline.

---

## 🔧 Project Setup

### 1. Clone the Repository

Start by cloning the GitHub repository locally:

```bash
git clone git@github.com:apimatic/apimatic-catalog.git
cd apimatic-catalog
```

---

## 🗂️ Directory Structure

Navigate to the following folder to manage portal entries:

```bash
cd src/lib
```

Here, the main file of interest is:

* `portals.ts` — contains all portal metadata that appears on the site.

---

## ✏️ Adding or Updating a Portal

To add a new portal or update an existing one, follow these steps:

### 1. Edit `portals.ts`

Each portal is represented as a JSON-like object inside the exported array. Here’s a sample entry:

```ts
{
  name: "maxio",
  url: "https://developers.maxio.com/http/getting-started/overview",
  logoUrl: "https://img.logo.dev/www.maxio.com/?token=pk_C1elIw7HR2yyKFwdqgPYHA",
  description: "API portal for Maxio",
  category: "Fintech",
  status: "NEWEST ADDITION",
  sdks: ["Python", "TypeScript", "C#", "PHP", "Go", "Java", "Ruby"],
  addedAt: "2025-03-12",
  screenshotUrl: "/assets/banners/maxio.webp"
}
```

### 2. Update Screenshot

Make sure to add a screenshot for the portal to the `/public/assets/banners` folder in WebP format.

> You can use the `make-banners.py` script to automate this process. It uses Selenium to take screenshots of portals listed in `portals.csv`.

---

## 🚀 Deployment Flow

### 1. Create a Pull Request

Once your changes to `portals.ts` (and optionally screenshot banners) are complete:

* Push your changes.
* Open a pull request.
* After peer review, merge it to the main branch.

### 2. Azure Pipeline Trigger

Merging changes to the main branch triggers an **Azure Pipeline** which:

* Deploys the updated catalog to the development environment:
  **[https://catalog.dev.apimatic.io](https://catalog.dev.apimatic.io)**

* After QA approval, the site can be promoted to the production environment:
  **[https://catalog.apimatic.io](https://catalog.apimatic.io)**

---

## 🌐 Managing Portal Static Site Files

Each portal corresponds to a subfolder on the Azure Storage container that serves static site files. The URL structure must follow this pattern:

```
https://catalog.apimatic.io/<folder-name>
```

⚠️ The **folder name must match the portal’s name** and **cannot be updated manually**.

---

## 🔁 Generating and Uploading Portal Files

To upload or update a portal's static site files:

### 1. Generate Portal Files

Use the **APIMatic Async API** to generate static portal files for the required portal. Output them into a local folder named after the portal.

### 2. Upload Using PowerShell Script

Use the PowerShell script below to upload the folder to the correct Azure Blob Storage container.

> The script supports easy login and uploads directly to the root of the given container.

#### 📄 `upload-portal.ps1`

```powershell
param (
  [string]$storageAccountName = "<YourStorageAccount>",
  [string]$containerName = "<YourContainerName>",
  [string]$folderPath = "<PathToYourPortalFolder>"
)

# Login interactively
az login

# Set Azure Storage context
$context = az storage account show --name $storageAccountName --query "id" -o tsv
az storage container create --account-name $storageAccountName --name $containerName

# Upload files from the folder
az storage blob upload-batch `
  --destination $containerName `
  --source $folderPath `
  --account-name $storageAccountName `
  --overwrite
```

> Replace `<YourStorageAccount>`, `<YourContainerName>`, and `<PathToYourPortalFolder>` with actual values. Use the correct storage account for dev or prod environments.

Once uploaded, the portal will be accessible at:

```
https://catalog.dev.apimatic.io/<folder-name>
```

or

```
https://catalog.apimatic.io/<folder-name>
```

You should use this final URL as the `url` value in the `portals.ts` entry.

---

## 🖼️ Screenshot Management (Optional)

### Capture Screenshots Automatically

To capture screenshots of portal URLs and convert them into `.webp` format:

```bash
python scripts/make-banners.py
```

* Reads from `portals.csv` (name, URL, docs URL).
* Uses Selenium + Chrome Headless to capture screenshots.
* Stores screenshots at: `public/assets/banners/`.

### Generate or Update Portal Entries

To automatically update `portals.ts` with screenshot URLs:

```bash
python scripts/make-portals.py
```

This script:

* Loads all portals from `portals.ts`.
* Adds or updates `screenshotUrl` field based on available banners.
* Falls back to a placeholder image if a banner is missing.

---

## ✅ QA and Promotion

Once deployed to the dev environment, QA should verify:

* Portal loads correctly at `baseurl/foldername`.
* Metadata and screenshot are accurate.
* All SDK links and documentation are functional.

Upon approval, the site is promoted to the production environment.

---

## 📌 Notes

* Always ensure folder names are **lowercase**, **URL-safe**, and match the portal name in `portals.ts`.
* Never manually edit or rename folders in the blob storage.
* Use the correct Azure Storage account for **dev** vs **prod** environments.

