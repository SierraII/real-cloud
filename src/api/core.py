from utils import tools
from base.sys import cache
from base.news import feed as news_feed
from base.stocks import feed as stocks_feed

import environment

from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

@app.route('/news/get', methods=['GET'])
def get_stock_news():

    symbol = request.args.get('symbol')

    return news_feed.get_feed(symbol)


@app.route('/stocks/get', methods=['GET'])
def get_stock_prices():

    symbol = request.args.get('symbol')
    interval = request.args.get('interval')

    return stocks_feed.get_stock_prices(symbol, interval)


@app.route('/cache/flush', methods=['GET'])
def flush_cache():
    cache.flush_all()
    return 'True'


if __name__ == '__main__':

    watch_files = tools.get_directory_files(['./src/api/']);

    app.run(debug=True, threaded=True, extra_files=watch_files)
