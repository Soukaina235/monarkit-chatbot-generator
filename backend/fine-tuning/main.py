from extract_website_content import extract_website_content
from process_data_with_langchain import process_content_with_langchain
from passing_data_to_gpt import split_text, process_with_gpt4


# Main function
def main(url):
    website_content = extract_website_content(url)
    processed_content = process_content_with_langchain(website_content)
    text_chunks = split_text(processed_content)
    gpt4_responses = process_with_gpt4(text_chunks)
    combined_response = "\n".join(gpt4_responses)
    print(combined_response)

# Replace with your URL
#
url = "https://example.com"
main(url)




# import requests
# from bs4 import BeautifulSoup

# def extract_website_content(url):
#     response = requests.get(url)
#     soup = BeautifulSoup(response.content, 'html.parser')
    
#     # Extract all text content from the page
#     text = soup.get_text(separator=' ')
#     return text

# url = "https://monarkit.net/"
# website_content = extract_website_content(url)

# # print(website_content)




# from langchain import OpenAI, LLMChain
# from langchain.prompts import PromptTemplate

# # Initialize the OpenAI model
# llm = OpenAI(model_name="gpt-4")  # Use the appropriate model version

# # Define a LangChain prompt template
# prompt_template = "Extract key information from the following content: {content}"
# prompt = PromptTemplate(template=prompt_template, input_variables=["content"])

# # Create a LangChain processing pipeline
# chain = LLMChain(llm=llm, prompt=prompt)

# def process_content_with_langchain(text):
#     response = chain.run(content=text)
#     return response

# processed_content = process_content_with_langchain(website_content)



# import openai

# # Function to split the text into manageable chunks
# def split_text(text, max_tokens=7500):
#     chunks = []
#     while len(text) > max_tokens:
#         split_point = text[:max_tokens].rfind(' ')
#         chunks.append(text[:split_point])
#         text = text[split_point:].strip()
#     chunks.append(text)
#     return chunks

# # Function to process each chunk with GPT-4
# def process_with_gpt4(chunks):
#     responses = []
#     for chunk in chunks:
#         response = openai.Completion.create(
#             engine="gpt-4",
#             prompt=f"Analyze the following content: {chunk}",
#             max_tokens=300
#         )
#         responses.append(response.choices[0].text.strip())
#     return responses

# # Split the processed content into chunks
# text_chunks = split_text(processed_content)

# # Get GPT-4 responses for each chunk
# gpt4_responses = process_with_gpt4(text_chunks)

# # Combine or use the responses as needed
# combined_response = "\n".join(gpt4_responses)
# print(combined_response)



# import requests
# from bs4 import BeautifulSoup
# from langchain import OpenAI, LLMChain
# from langchain.prompts import PromptTemplate
# import openai

# # Step 1: Extract website content
# def extract_website_content(url):
#     response = requests.get(url)
#     soup = BeautifulSoup(response.content, 'html.parser')
#     return soup.get_text(separator=' ')

# # Step 2: Process content with LangChain
# def process_content_with_langchain(text):
#     llm = OpenAI(model_name="gpt-4")
#     prompt_template = "Extract key information from the following content: {content}"
#     prompt = PromptTemplate(template=prompt_template, input_variables=["content"])
#     chain = LLMChain(llm=llm, prompt=prompt)
#     response = chain.run(content=text)
#     return response

# # Step 3: Split content and process with GPT-4
# def split_text(text, max_tokens=7500):
#     chunks = []
#     while len(text) > max_tokens:
#         split_point = text[:max_tokens].rfind(' ')
#         chunks.append(text[:split_point])
#         text = text[split_point:].strip()
#     chunks.append(text)
#     return chunks

# def process_with_gpt4(chunks):
#     responses = []
#     for chunk in chunks:
#         response = openai.Completion.create(
#             engine="gpt-4",
#             prompt=f"Analyze the following content: {chunk}",
#             max_tokens=300
#         )
#         responses.append(response.choices[0].text.strip())
#     return responses




