from openai import OpenAI
from dotenv import load_dotenv
import os
import json

from extract_website_content import extract_website_content
from process_data_with_langchain import process_content_with_langchain

# Load environment variables from .env file
load_dotenv()

# Access the environment variable
openai_api_key = os.getenv('OPENAI_API_KEY')

client = OpenAI(api_key=openai_api_key)

# Function to split the text into manageable chunks
def split_text(text, max_tokens=7500):
    chunks = []
    while len(text) > max_tokens:
        split_point = text[:max_tokens].rfind(' ')
        chunks.append(text[:split_point])
        text = text[split_point:].strip()
    chunks.append(text)
    return chunks

# Function to process each chunk with GPT-4
def process_with_gpt4(chunks):
    responses = []
    for chunk in chunks:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are an assistant that generates questions and answers based on the provided content."},
                {"role": "user", "content": f"Analyze the following content and generate a list of question and answer json objects: {chunk}"}
            ]
        )
        responses.append(response.choices[0].message.content)
    return responses

# Function to format the responses into the desired JSON structure
def format_as_ljson(responses, system_message):
    messages = []
    for response in responses:
        # Parse the response into question-answer pairs
        pairs = response.split("\n")
        for pair in pairs:
            if pair.strip():  # Ensure there is content
                question, answer = pair.split("Answer:", 1)
                question = question.strip()
                answer = answer.strip()
                messages.append({"role": "system", "content": system_message})
                messages.append({"role": "user", "content": question})
                messages.append({"role": "assistant", "content": answer})
    return {"messages": messages}

def save_to_json(data, filename):
    with open(filename, 'w') as file:
        json.dump(data, file, indent=4)


# Split the processed content into chunks

url = "https://leyton.com/ma/"
website_content = extract_website_content(url)
processed_content = process_content_with_langchain(website_content)
text_chunks = split_text(processed_content)

text_chunks = split_text(processed_content)

# Get GPT-4 responses for each chunk
gpt4_responses = process_with_gpt4(text_chunks)

data = {
    "questions_and_responses": gpt4_responses
}

# Save to a JSON file
save_to_json(data, 'questions_and_responses2.json')

print("Data has been saved to 'questions_and_responses.json'")

# Combine or use the responses as needed
combined_response = "\n".join(gpt4_responses)
print(combined_response)


# Function to process each chunk with GPT-4
def transform_to_ljson(data):
    responses = []
    for chunk in chunks:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are an assistant that generates questions and answers based on the provided content."},
                {"role": "user", "content": f"Analyze the following content and generate a list of question and answer json objects: {chunk}"}
            ]
        )
        responses.append(response.choices[0].message.content)
    return responses