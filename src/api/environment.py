import json

with open('../settings.json') as data_file:
    data = json.load(data_file)
    print data
