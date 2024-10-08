from openai import OpenAI
from dotenv import load_dotenv
import os
import json
from django.conf import settings
from datetime import datetime
from ..models import Chatbot

load_dotenv()
openai_api_key = os.getenv('OPENAI_API_KEY')
client = OpenAI(api_key=openai_api_key)

def get_augmented_data(chatbot_id, data, system_message):

    # print(input_jsonl)

    # with open(input_jsonl, 'r') as file:
    #     data = file.readlines()

    augmented_data = []

    try:
        chatbot = Chatbot.objects.get(id=chatbot_id)
    except Chatbot.DoesNotExist:
        return "Chatbot not found"
    chatbot_name = chatbot.name
    chatbot_company = chatbot.owner.company_name
    system_message = f"You are {chatbot_name}, a virtual assistant dedicated to the {chatbot_company} company. The user can ask questions about products, customer support, or any other information related to our company. For topics outside our domain, you will inform the user that you focus solely on {chatbot_company}."

    # for line in data:
    #     item = json.loads(line)
    for i in range(len(data)):
        question = data[i]['question']
        answer = data[i]['answer']
        # response = item["messages"][2]["content"]

        # Create a prompt for GPT-4*
        prompt = (f"You are given a question and a response. Your task is to generate 15 different reformulations of the given question while keeping the response the same.\n\n"
          f"Question: \"{question}\"\n"
          f"Response: \"{answer}\"\n\n"
          f"Please consider the following when generating reformulated questions:\n"
          f"- Use synonyms and different expressions.\n"
          f"- Vary the sentence structure (e.g., direct questions, indirect questions).\n"
          f"- Incorporate different contexts or levels of formality (e.g., using 'your', 'the company's', 'company_name's').\n"
          f"- Change the tone or perspective (e.g., first person, third person).\n\n"
          f"Generate 15 different reformulated questions based on the above example, while keeping the response the same.\n\n"
          f"Return your response as a list of 15 JSON objects, each with 'question' and 'answer' keys, where 'answer' is the same for all objects.")

        # prompt = (f"You are given a question and a response. Your task is to generate 15 different reformulations of the given question while keeping the response the same.\n\n"
        #           f"Question: \"{question}\"\n"
        #           f"Response: \"{answer}\"\n\n"
        #           f"Generate 7 different reformulated questions based on the above example, while keeping the response the same.\n\n"
        #           f"Return your response in the form of a list of questions and answers in the form of a JSON object with keys 'question' and 'answer'")

        # Call GPT-4 to generate reformulated questions
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": prompt}
            ]
        )

        # # Parse the response
        parsed_response = json.loads(response.choices[0].message.content)
        
        for question_answer_pair in parsed_response:
            question = question_answer_pair["question"]
            answer = question_answer_pair["answer"]

            message_object = {
                "messages": [
                    {"role": "system", "content": system_message},
                    {"role": "user", "content": question},
                    {"role": "assistant", "content": answer}
                ]
            }
            # Convert the dictionary to a JSON string and add it to the lines list
            augmented_data.append(json.dumps(message_object))

    
    return '\n'.join(augmented_data)

def save_to_jsonl_file(jsonl_content, file_path):
    with open(file_path, 'w') as file:
        file.write(jsonl_content)

def get_file_path(user_id):
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    directory = os.path.join(settings.MEDIA_ROOT, 'datasets', str(user_id))
    if not os.path.exists(directory):
        os.makedirs(directory)
    
    # Define the file path
    filename = f"{timestamp}.jsonl"
    file_path = os.path.join(directory, filename)
    return {'full_path': file_path, 'file_name': filename}

def augment_data(chatbot_id, dataset, system_message, user_id):
    augmented_data = get_augmented_data(chatbot_id, dataset, system_message)
    file_path = get_file_path(user_id)
    full_path = file_path['full_path']
    save_to_jsonl_file(augmented_data, full_path)
    # file_name = file_info['file_name']
    return file_path
