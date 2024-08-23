from langchain_openai import ChatOpenAI
from langchain import PromptTemplate, LLMChain
from dotenv import load_dotenv
import os


load_dotenv() # Load environment variables from .env file

openai_api_key = os.getenv('OPENAI_API_KEY')

model = ChatOpenAI(api_key=openai_api_key, model_name="gpt-3.5-turbo-0125")

prompt_template = PromptTemplate.from_template(
    "Extract key information from the following content: {content}"
)

chain = LLMChain(
    llm=model,
    prompt=prompt_template,
)

def process_content_with_langchain(text):
    response = chain.run({"content": text})
    return response