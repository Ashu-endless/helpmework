import json

data = ['data:image/jpeg;base64,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','data:image/jpeg;base64,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']

print(json.dumps(data)[0])