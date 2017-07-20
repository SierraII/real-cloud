from flask import Flask, request
import requests
from flask.ext.cors import CORS
app = Flask(__name__)
cors = CORS(app)

@app.route('/news/get-all', methods=['GET'])
def getNews():
    symbol = request.args.get("symbol")
    return requests.get('https://www.google.co.uk/finance/company_news?q=NASDAQ:' + symbol + '&output=rss').content

if __name__ == '__main__':
    app.run(debug=True)
