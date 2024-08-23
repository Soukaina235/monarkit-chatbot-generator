import requests
from bs4 import BeautifulSoup


def scrape_website_content(url):
    # try:
    response = requests.get(url)
    # except requests.exceptions.RequestException as e:
    #     return f"An error occurred: {e}"
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Extract all text content from the page
    text = soup.get_text(separator=' ')
    return text
