import urllib.request
import re

movies = [
    'K.G.F: Chapter 2', 'Pushpa: The Rise', 'Vikram 2022 film', 'Jailer 2023 film', 
    'Spider-Man 2002 film', 'The Dark Knight', 'Inception', 'Interstellar', 
    'Dangal film', 'Pathaan film', 'Jawan film', '3 Idiots', 'Baahubali 2', 
    'Spirited Away', 'Your Name', 'Demon Slayer Mugen Train', 'Parasite 2019 film', 
    'Train to Busan', 'All Quiet on the Western Front 2022 film'
]

for m in movies:
    try:
        url = 'https://en.wikipedia.org/wiki/Special:Search?search=' + urllib.parse.quote(m)
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req).read().decode('utf-8')
        match = re.search(r'class="infobox-image".*?src="(//upload\.wikimedia\.org/wikipedia/en/thumb/[^"]+)"', html)
        if match:
            print(f'{m}: https:{match.group(1)}')
        else:
            print(f'{m}: NOT FOUND')
    except Exception as e:
        print(f'{m}: ERROR {e}')
