import requests
import os

from utils import tools
from base.sys import cache

from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

@app.route('/news/get', methods=['GET'])
def get_news():

    symbol = request.args.get('symbol')
    news = cache.get(symbol)

    if news is None:
        news = requests.get('https://www.google.co.uk/finance/company_news?output=rss&q=NASDAQ:' + symbol).content
        cache.set(symbol, news, 5)

    return news


if __name__ == '__main__':

    watch_files = tools.get_directory_files(['./src/api/']);

    app.run(debug=True, threaded=True, extra_files=watch_files)
