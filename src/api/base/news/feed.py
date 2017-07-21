import requests
import environment

from base.sys import cache

def get_feed(symbol):

    cache_key = '{0}.{1}.{2}'.format(symbol, 'news', 'feed')

    news = cache.get(cache_key)
    news_url = environment.get_settings()['news-api']['address']

    if news is None:
        news = requests.get(news_url + symbol).content
        cache.set(cache_key, news, 5)

    return news
