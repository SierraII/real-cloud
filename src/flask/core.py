from flask import Flask, request
import requests
from flask_cors import CORS
from werkzeug.contrib.cache import SimpleCache

app = Flask(__name__)
cors = CORS(app)
cache = SimpleCache()

@app.route('/news/get-all', methods=['GET'])
def getNews():
    symbol = request.args.get('symbol')

    news = cache.get(symbol)

    print 'GET request for ' + symbol

    if news is None:

        print 'no news for ' + symbol + '. Getting...'

        news = requests.get('https://www.google.co.uk/finance/company_news?q=NASDAQ:' + symbol + '&output=rss').content
        cache.set(symbol, news, timeout= 5*60)
    else:
        print 'news in cache for ' + symbol + '. Serving...'

    return news

if __name__ == '__main__':
    app.run(debug=True)
