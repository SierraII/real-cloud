from werkzeug.contrib.cache import SimpleCache

SimpleCache = SimpleCache()

def set(key, data, expire_time_in_minutes):
    SimpleCache.set(key, data, timeout= expire_time_in_minutes * 60)


def get(key):
    SimpleCache.get(key)
