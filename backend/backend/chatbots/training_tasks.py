from celery import shared_task
from .models import Chatbot
from .services.scraping_service import scrape_website_content
from .services.process_data_with_langchain_service import process_content_with_langchain
from .services.generate_questions_service import generate_dataset
from .services.augment_data_service import augment_data
from .services.validate_dataset_service import validate_dataset_format
from .services.upload_dataset_service import upload_dataset_file
from .services.fine_tune_service import start_fine_tunning_job, check_training_status

system_message = "You are an assistant that generates reformulated questions based on the provided content."

@shared_task
def start_scraping(chatbot_id):
    print("Starting scraping")
    chatbot = Chatbot.objects.get(id=chatbot_id)
    chatbot.training_step = "scraping"
    chatbot.save()
    content = scrape_website_content(chatbot.website_url)
    print("Scraping done")
    return content

@shared_task
def process_content(chatbot_id, content):
    print("Starting processing")
    chatbot = Chatbot.objects.get(id=chatbot_id)
    chatbot.training_step = "processing"
    chatbot.save()
    processed_content = process_content_with_langchain(content)
    print("Processing done")
    return processed_content

@shared_task
def extract_qa_pairs(chatbot_id, content):
    print("Starting extraction")
    chatbot = Chatbot.objects.get(id=chatbot_id)
    chatbot.training_step = "extraction"
    chatbot.save()
    processed_content = generate_dataset(content)
    print("Extraction done")
    return processed_content

@shared_task
def augment_dataset(chatbot_id, content, user_id):
    print("Starting dataset augmentation")
    chatbot = Chatbot.objects.get(id=chatbot_id)
    chatbot.training_step = "augmentation" 
    chatbot.save()
    dataset_path = augment_data(content, system_message, user_id)
    chatbot.dataset_file_path = dataset_path
    chatbot.save()
    print("Augmentation done")
    return dataset_path

@shared_task
def validate_dataset(chatbot_id, dataset_path):
    print("Starting dataset validation")
    chatbot = Chatbot.objects.get(id=chatbot_id)
    chatbot.training_step = "validation"
    chatbot.save()
    validated_dataset_format = validate_dataset_format(dataset_path)
    print("Validation done")
    return validated_dataset_format

@shared_task
def upload_dataset(chatbot_id, dataset_path):
    print("Starting dataset upload")
    chatbot = Chatbot.objects.get(id=chatbot_id)
    chatbot.training_step = "upload"
    chatbot.save()
    print("dataset_path", dataset_path)
    dataset_id = upload_dataset_file(dataset_path)
    chatbot.dataset_file_id = dataset_id
    chatbot.save()
    print("Upload done")
    return dataset_id

@shared_task
def start_training(chatbot_id, dataset_id):
    print("Starting fine tuning job")
    chatbot = Chatbot.objects.get(id=chatbot_id)
    chatbot.training_step = "training"
    chatbot.save()
    job_id = start_fine_tunning_job(dataset_id)
    chatbot.openai_job_id = job_id
    chatbot.save()
    return job_id

@shared_task
def check_fine_tuning_status(chatbot_id, job_id):
    print("Checking fine tuning status")
    chatbot = Chatbot.objects.get(id=chatbot_id)
    model_id = check_training_status(job_id)
    if (model_id != None):
        chatbot.training_step = "completed"
        chatbot.status = "trained"
        chatbot.openai_model_id = model_id
        chatbot.save()
    return model_id



from celery import chain

# @shared_task
# def start_training_pipeline(chatbot_id, user_id):
#     chain(
#         start_scraping.s(chatbot_id) |
#         process_content.s(chatbot_id) |
#         extract_qa_pairs.s(chatbot_id) |
#         augment_data.s(chatbot_id, user_id)
#     ).apply_async()

@shared_task
def start_training_pipeline(chatbot_id, user_id):
    content = start_scraping(chatbot_id)
    processed_content = process_content(chatbot_id, content)
    questions_answers = extract_qa_pairs(chatbot_id, processed_content)
    dataset_path = augment_dataset(chatbot_id, questions_answers, user_id)
    validate_dataset_path = validate_dataset(chatbot_id, dataset_path)
    uploaded_dataset_id = upload_dataset(chatbot_id, validate_dataset_path)
    job_id = start_training(chatbot_id, uploaded_dataset_id)
    model_id = check_fine_tuning_status(chatbot_id, job_id)
    print(f"Training successful with model id: {model_id}")
    print("done")

    # validated = validate_training_file(question_responses)
    # if validated:
    #     model_id = train_model(question_responses)
    #     chatbot = Chatbot.objects.get(id=chatbot_id)
    #     chatbot.model_id = model_id
    #     chatbot.training_step = "Training Completed"
    #     chatbot.save()
    # else:
    #     # Handle validation failure
    #     pass
