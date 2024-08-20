from langchain_core.output_parsers.json import SimpleJsonOutputParser
from langchain_openai import ChatOpenAI
from langchain import PromptTemplate, LLMChain
from extract_website_content import extract_website_content

from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Access the environment variable
openai_api_key = os.getenv('OPENAI_API_KEY')

# Initialize the OpenAI model
model = ChatOpenAI(api_key=openai_api_key, model_name="gpt-4")

# Define the prompt template
prompt_template = PromptTemplate.from_template(
    "Extract key information from the following content: {content}"
)

# Create the LLMChain
chain = LLMChain(
    llm=model,
    prompt=prompt_template,
)

def process_content_with_langchain(text):
    response = chain.run({"content": text})
    return response

# Example URL
# url = "https://monarkit.net/"
# website_content = extract_website_content(url)
# processed_content = process_content_with_langchain(website_content)

# print(processed_content)
