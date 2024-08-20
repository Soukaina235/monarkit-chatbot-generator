import requests
from bs4 import BeautifulSoup

def extract_website_content(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Extract all text content from the page
    text = soup.get_text(separator=' ')
    return text

# url = "https://monarkit.net/"
# website_content = extract_website_content(url)

# print(website_content)