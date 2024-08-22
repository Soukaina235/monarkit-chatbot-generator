from openai import OpenAI
from dotenv import load_dotenv
import os
import json

# Load environment variables from .env file
load_dotenv()

# Access the environment variable
openai_api_key = os.getenv('OPENAI_API_KEY')

client = OpenAI(api_key=openai_api_key)

def augment_data_with_gpt4(input_jsonl, output_jsonl):

    with open(input_jsonl, 'r') as file:
        data = file.readlines()

    augmented_data = []

    for line in data:
        item = json.loads(line)
        question = item["messages"][1]["content"]
        response = item["messages"][2]["content"]

        # Create a prompt for GPT-4
        prompt = (f"You are given a question and a response. Your task is to generate 7 different reformulations of the given question while keeping the response the same.\n\n"
                  f"Question: \"{question}\"\n"
                  f"Response: \"{response}\"\n\n"
                  f"Generate 7 different reformulated questions based on the above example, while keeping the response the same.\n\n"
                  f"Return your response in the form of a list of questions and answers in the form of a JSON object with keys 'question' and 'answer'")

        # Call GPT-4 to generate reformulated questions
        response = client.chat.completions.create(
            
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are an assistant that generates reformulated questions based on the provided content."},
                {"role": "user", "content": prompt}
            ]
        )

        # # Parse the response
        # generated_questions = response.choices[0].message.content

        parsed_response = json.loads(response.choices[0].message.content)

        system_message = "You are AionChat, a virtual assistant dedicated to the MonarkIT agency. The user can ask questions about products, customer support, or any other information related to our company. For topics outside of our domain, you will inform the user that you focus solely on MonarkIT."
        
        for question_answer_pair in parsed_response:
            # print("Generated question: ", question_answer_pair)
            # print("Answer: ", question_answer_pair["answer"])
            # print("Question: ", question_answer_pair["question"])
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

    # # Save the augmented data to a JSONL file
    # with open(output_jsonl, 'w') as file:
    #     for item in augmented_data:

    #         file.write(json.dumps(item) + '\n')

def save_to_jsonl_file(filename, jsonl_content):
    with open(filename, 'w') as file:
        file.write(jsonl_content)


# Example usage:
input_jsonl = 'output2.jsonl'
output_jsonl = 'augmented_output.jsonl'
augmented_data = augment_data_with_gpt4(input_jsonl, output_jsonl)
save_to_jsonl_file(output_jsonl, augmented_data)
