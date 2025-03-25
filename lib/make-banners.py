import os
import csv
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from PIL import Image  # Import Pillow for image conversion

def close_popups(driver):
    try:
        # Look for buttons with common popup-related text and click them
        popup_buttons = WebDriverWait(driver, 5).until(
            EC.presence_of_all_elements_located((
                By.XPATH,
                "//button[contains(text(), 'Accept') or contains(text(), 'Agree') or contains(text(), 'OK') or contains(text(), 'Okay') or contains(text(), 'Opt-out') or contains(text(), 'Close') or contains(text(), 'Dismiss') or contains(text(), 'Yes') or contains(text(), 'Yes,') or contains(text(), 'Allow')]"
            ))
        )
        for button in popup_buttons:
            try:
                button.click()
                print("Popup closed!")
            except Exception as e:
                print(f"Failed to click a popup button: {e}")
    except:
        print("No popups found.")

    try:
        # Look for links with common popup-related text and click them
        popup_links = WebDriverWait(driver, 5).until(
            EC.presence_of_all_elements_located((
                By.XPATH,
                "//a[contains(text(), 'Accept') or contains(text(), 'Agree') or contains(text(), 'OK') or contains(text(), 'Okay') or contains(text(), 'Opt-out') or contains(text(), 'Close') or contains(text(), 'Dismiss') or contains(text(), 'Yes') or contains(text(), 'Yes,') or contains(text(), 'Allow')]"
            ))
        )
        for link in popup_links:
            try:
                link.click()
                print("Popup link closed!")
            except Exception as e:
                print(f"Failed to click a popup link: {e}")
    except:
        print("No popup links found.")

    try:
        # Look for divs or spans with close icons (e.g., 'X') and click them
        close_icons = WebDriverWait(driver, 5).until(
            EC.presence_of_all_elements_located((
                By.XPATH,
                "//div[contains(@aria-label, 'Close') or contains(@class, 'close') or contains(@class, 'dismiss') or contains(@role, 'button') and contains(text(), '×')]"
            ))
        )
        for icon in close_icons:
            try:
                icon.click()
                print("Close icon clicked!")
            except Exception as e:
                print(f"Failed to click a close icon: {e}")
    except:
        print("No close icons found.")

def capture_screenshot(target_url):
    try:
        driver.get(target_url)
        time.sleep(15)  # Wait
        close_popups(driver)

        # Save screenshot as PNG
        temp_png_path = os.path.join(OUTPUT_DIR, f"{name}.png")
        driver.save_screenshot(temp_png_path)

        # Convert PNG to WebP
        webp_path = os.path.join(OUTPUT_DIR, f"{name}.webp")
        with Image.open(temp_png_path) as img:
            img.save(webp_path, "WEBP")
        os.remove(temp_png_path)  # Remove the PNG file

        print(f"✅ Saved: {webp_path}")
        return True
    except Exception as e:
        print(f"Failed to capture screenshot for {target_url}: {e}")
        return False

# Constants
CSV_FILE = "portals.csv"  # CSV file containing portal names and URLs
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "../public/assets/banners")  # Output directory for screenshots

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Set up headless Chrome
chrome_options = Options()
chrome_options.add_argument("--window-size=1920,1080")  # Full HD screenshots
chrome_options.add_argument("--headless=new")  # Run in headless mode
chrome_options.add_argument("--no-sandbox")  # Bypass sandbox for WSL
chrome_options.add_argument("--disable-dev-shm-usage")  # Prevent memory issues

homedir = os.path.expanduser("~")
chrome_options.binary_location = f"{homedir}/chrome-linux64/chrome"
webdriver_service = Service(f"{homedir}/chromedriver/stable/chromedriver")

# Choose Chrome Browser
driver = webdriver.Chrome(service=webdriver_service, options=chrome_options)

# Read CSV and process URLs
with open(CSV_FILE, "r", encoding="utf-8") as file:
    reader = csv.reader(file)
    try:
        next(reader)  # Header
    except StopIteration:
        print("CSV file is empty or has no rows.")
        driver.quit()
        exit()

    for row in reader:
        if len(row) < 2:
            print(f"Skipping invalid row: {row}")
            continue

        name, url, documentation_url = row[0].strip(), row[1].strip(), row[2].strip()
        if not name or not url:
            print(f"Skipping empty: {row}")
            continue

        print(f"Processing: {name}")

        # Try url first, then fallback to documentation_url
        if url and capture_screenshot(url):
            continue
        elif capture_screenshot(url):
            continue

        print(f"❌ Skipped: {name} (both URLs failed)")

# Close the browser
driver.quit()
print("All screenshots captured successfully!")
