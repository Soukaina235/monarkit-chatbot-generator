from openai import OpenAI
from dotenv import load_dotenv
import os
import time

 # Load environment variables from .env file
openai_api_key = os.getenv('OPENAI_API_KEY')
client = OpenAI(api_key=openai_api_key)

# Define your hyperparameters
# hyperparameters = {
#   "learning_rate_multiplier": 0.5,
#   "batch_size": 4,
#   "n_epochs": 5,
#   # "validation_file": "file-WjHJIof7sJatxH3igyq9FSLq"
# }
# "sequence_length": 128,

# # Define a function to open a file and return its contents as a string
# def open_file(filepath):
#     with open(filepath, 'r', encoding='utf-8') as infile:
#         return infile.read()
    
# # Define a function to save content to a file
# def save_file(filepath, content):
#     with open(filepath, 'a', encoding='utf-8') as outfile:
#         outfile.write(content)
def start_fine_tunning_job(file_id):
    model_name = "gpt-3.5-turbo-0125"

    response = client.fine_tuning.jobs.create(
    training_file=file_id,
    model=model_name,
    suffix="first",
    )

    job_id = response.id
    print(f"Fine-tuning job created successfully with ID: {job_id}")
    return job_id


def check_training_status(job_id):
    while True:
        response = client.fine_tuning.jobs.retrieve(job_id)
        print(f"Job response{response}")
        status = response.status
        if status == 'succeeded':
            return response.fine_tuned_model # return the id of the fine-tuned-model
        elif status == 'failed':
            raise Exception('Training failed')
        time.sleep(60)  # wait for a minute before checking again