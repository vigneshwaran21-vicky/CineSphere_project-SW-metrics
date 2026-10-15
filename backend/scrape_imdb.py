import urllib.request
import urllib.parse
import re

movies = ['K.G.F: Chapter 2', 'Pushpa: The Rise', 'Vikram 2022 tamil movie', 'Jailer 2023 tamil movie', 'Dangal 2016 film', 'Pathaan film', 'Jawan 2023 film', 'Baahubali 2 The Conclusion']

for m in movies:
    try:
        search_url = 'https://html.duckduckgo.com/html/?q=' + urllib.parse.quote(m + ' site:imdb.com/title/')
        req = urllib.request.Request(search_url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        html = urllib.request.urlopen(req).read().decode('utf-8')
        
        imdb_url_match = re.search(r'(https://www\.imdb\.com/title/tt\d+/)', html)
        if imdb_url_match:
            imdb_url = imdb_url_match.group(1)
            req2 = urllib.request.Request(imdb_url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
            imdb_html = urllib.request.urlopen(req2).read().decode('utf-8')
            img_match = re.search(r'meta property="og:image" content="([^"]+)"', imdb_html)
            if img_match:
                print(f'{m} = {img_match.group(1)}')
            else:
                print(f'{m} = IMG NOT FOUND')
        else:
            print(f'{m} = IMDB NOT FOUND')
    except Exception as e:
        print(f'{m} = ERROR {e}')
