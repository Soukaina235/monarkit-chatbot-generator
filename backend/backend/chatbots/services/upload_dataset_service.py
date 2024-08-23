from openai import OpenAI
from dotenv import load_dotenv
import os

 # Load environment variables from .env file
openai_api_key = os.getenv('OPENAI_API_KEY')
client = OpenAI(api_key=openai_api_key)


def open_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as infile:
        return infile.read()

def upload_dataset_file(dataset_path):
    # Assuming the file name is 'processed_data.jsonl'
    with open(dataset_path, "rb") as file:
        response = client.files.create(
            file=file,
            purpose='fine-tune'
        )

    file_id = response.id
    print(f"File uploaded successfully with ID: {file_id}")
    return file_id