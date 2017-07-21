import requests

from werkzeug.contrib.cache import SimpleCache
from flask import Flask, request
from flask_cors import CORS


app = Flask(__name__)
cors = CORS(app)
cache = SimpleCache()

# FLASK_APP=core.py FLASK_DEBUG=1 python -m flask run --with-threads
@app.route('/news/get', methods=['GET'])
def get_news():

    symbol = request.args.get('symbol')
    news = cache.get(symbol)

    if news is None:
        news = requests.get('https://www.google.co.uk/finance/company_news?output=rss&q=NASDAQ:' + symbol).content
        cache.set(symbol, news, timeout= 5*60)

    return news


if __name__ == '__main__':
    app.run(debug=True, threaded=True)
