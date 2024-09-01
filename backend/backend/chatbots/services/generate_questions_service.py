from openai import OpenAI
from dotenv import load_dotenv
import os
import json

# from extract_website_content import extract_website_content
# from process_data_with_langchain import process_content_with_langchain

load_dotenv()
openai_api_key = os.getenv('OPENAI_API_KEY')
client = OpenAI(api_key=openai_api_key)

def split_text(text, max_tokens=7500): # Function to split the text into manageable chunks
    chunks = []
    while len(text) > max_tokens:
        split_point = text[:max_tokens].rfind(' ')
        chunks.append(text[:split_point])
        text = text[split_point:].strip()
    chunks.append(text)
    return chunks


def generate_question_answer_pairs(chunks): # Function to process each chunk with GPT-4
    responses = []
    for chunk in chunks:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are an assistant that generates questions and answers based on the provided content."},
                {"role": "user", "content": f"""Analyze the following content and generate a list of questions and answers in the form of JSON objects. 
                    The output should be a valid JSON array, formatted like this:
                    [
                        {{
                            "question": "Your question here",
                            "answer": "The corresponding answer here"
                        }},
                        ...
                    ]
                    Do not include any additional text, explanations, or comments. Just return the JSON array directly: {chunk}"""
                }
            ]
        )
        # print("response of qa generation", response.choices[0].message.content)
        parsed_response = json.loads(response.choices[0].message.content.strip())
        responses.append(parsed_response)
    return responses[0]


# def format_as_jsonl(responses, system_message): # Function to format the responses into the desired JSON structure
#     lines = []
#     for response in responses:
#         question = response["question"]
#         answer = response["answer"]
#         message_object = {
#             "messages": [
#                 {"role": "system", "content": system_message},
#                 {"role": "user", "content": question},
#                 {"role": "assistant", "content": answer}
#             ]
#         }
#         lines.append(json.dumps(message_object)) # Convert the dictionary to a JSON string and add it to the lines list
#     return '\n'.join(lines) # Return the JSONL content

# def save_to_jsonl_file(filename, jsonl_content):
#     with open(filename, 'w') as file:
#         file.write(jsonl_content)

def generate_dataset(processed_content):
    text_chunks = split_text(processed_content)
    qa_pairs = generate_question_answer_pairs(text_chunks)
    # if (system_message == None):
    #     system_message = "You are an assistant that answers questions based on the provided content."
    # jsonl_output = format_as_jsonl(qa_pairs, system_message)
    return qa_pairs

# save_to_jsonl_file('output2.jsonl', jsonl_output)
# print(jsonl_output)
