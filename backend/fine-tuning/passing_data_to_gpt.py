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
                {"role": "user", "content": f"Analyze the following content and generate a list of questions and answers in the form of a JSON object with keys 'question' and 'response': {chunk}"}
            ]
        )
        # Parse the response content and append it to the list
        parsed_response = json.loads(response.choices[0].message.content)
        for qa_pair in parsed_response:
            print("qa pair: ", qa_pair)
            break
            exit(0)
            responses.append({
                "question": qa_pair["question"],
                "response": qa_pair["answer"]
            })
    return responses

# Function to format the responses into the desired JSON structure
def format_as_jsonl(responses, system_message):
    lines = []
    for response in responses:
        # Convert the response string to a list of dictionaries
        question_answer_pairs = json.loads(response)
        for pair in question_answer_pairs:
            print(pair)
            break
            question = pair.get("question", "").strip()
            answer = pair.get("answer", "").strip()
            # Create JSON objects for each question-answer pair
            messages = [
                {"role": "system", "content": system_message},
                {"role": "user", "content": question},
                {"role": "assistant", "content": answer}
            ]
            # Append each message as a separate JSON object in lines
            lines.extend(messages)
    return lines

def save_to_json(data, filename):
    with open(filename, 'w') as file:
        json.dump(data, file, indent=4)

def save_to_jsonl(data, filename):
    with open(filename, 'w') as file:
        for item in data:
            file.write(json.dumps(item) + '\n')

# Split the processed content into chunks

url = "https://leyton.com/ma/"
website_content = extract_website_content(url)
processed_content = process_content_with_langchain(website_content)
text_chunks = split_text(processed_content)

# Get GPT-4 responses for each chunk
gpt4_responses = process_with_gpt4(text_chunks)
print(gpt4_responses)

# # Format the responses as JSONL
# system_message = "You are an assistant that answers questions based on the provided content."
# formatted_data = format_as_jsonl(gpt4_responses, system_message)


# # Save the formatted data to a JSONL file
# save_to_jsonl(formatted_data, 'questions_and_responses_formatted.jsonl')

# print("Data has been saved to 'questions_and_responses_formatted.jsonl'")

# # Save to a JSON file
# save_to_json(formatted_data, 'questions_and_responses_formatted.json')
