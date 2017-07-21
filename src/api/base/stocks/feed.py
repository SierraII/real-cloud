import json
import requests
import environment

from base.sys import cache
from collections import OrderedDict

def get_stock_prices(symbol, interval):

    cache_key = '{0}.{1}.{2}'.format(symbol, 'stocks', interval)

    prices = cache.get(cache_key)
    settings = environment.get_settings()

    api_url = settings['stocks-api']['address']
    api_key = settings['stocks-api']['api-key']
    api_mappings = settings['stocks-api']['api-mappings']

    if prices is None:

        api_map = {}

        for mapping in api_mappings:
            if mapping['id'] == interval:
                api_map = mapping
                break

        api_endpoint = 'function=TIME_SERIES_' + interval + '&symbol=' + symbol + '&apikey=' + api_key + '&interval=1min'

        content = requests.get(api_url + api_endpoint).content
        result = json.loads(content, object_pairs_hook=OrderedDict)

        mapped_prices = result[api_map['map']]

        prices = json.dumps(mapped_prices)

        cache.set(cache_key, prices, api_map['cache_time'])


    return prices
