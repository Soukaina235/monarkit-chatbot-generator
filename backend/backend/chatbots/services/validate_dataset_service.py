import json
import tiktoken
import numpy as np
from collections import defaultdict

# Format error checks
# provides a default value for the key that does not exist
# In this case, int is provided as the default factory function for the defaultdict: in this case the default value is 0
def validate_dataset_format(dataset_path):
# Load the dataset
    with open(dataset_path, 'r', encoding='utf-8') as f:
        dataset = [json.loads(line) for line in f]

    # Initial dataset stats
    print("Num examples:", len(dataset))
    print("First example:")
    for message in dataset[0]["messages"]:
        print(message)

    print('--------------------------------------------------------------------------------------')

    format_errors = defaultdict(int)

    for ex in dataset:
        if not isinstance(ex, dict):
            format_errors["data_type"] += 1
            continue
            
        messages = ex.get("messages", None)
        if not messages:
            format_errors["missing_messages_list"] += 1
            continue
            
        for message in messages:
            if "role" not in message or "content" not in message:
                format_errors["message_missing_key"] += 1
            
            if any(k not in ("role", "content", "name", "function_call", "weight") for k in message):
                format_errors["message_unrecognized_key"] += 1
            
            # if the role key is not found: return None instead
            if message.get("role", None) not in ("system", "user", "assistant", "function"):
                format_errors["unrecognized_role"] += 1
                
            content = message.get("content", None)
            function_call = message.get("function_call", None)
            
            # if no content is specified and no function call too, or if the content is specified and isn't a string => error
            if (not content and not function_call) or not isinstance(content, str):
                format_errors["missing_content"] += 1
        
        # if the assistant message is not present
        if not any(message.get("role", None) == "assistant" for message in messages):
            format_errors["example_missing_assistant_message"] += 1

    if format_errors:
        print("Found errors:")
        for k, v in format_errors.items():
            print(f"{k}: {v}")
        raise ValueError("Dataset format validation failed.")

    else:
        print("No errors found")
        return dataset_path

