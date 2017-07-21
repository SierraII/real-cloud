import json

def get_settings():
    with open('./src/settings.json') as data_file:
        return json.load(data_file)
