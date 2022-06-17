# -*- coding: utf-8 -*-

import requests
import random
from . import credentials

class KkboxAgent(object):
    def __init__(self):
        self.access_token = None
        self.init_access_token()

    def init_access_token(self):
        ''' Init access token for future use '''

        url = 'https://account.kkbox.com/oauth2/token'
        headers = {
            'Host': 'account.kkbox.com',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        data = {
            'grant_type': 'client_credentials',
            'client_id': credentials.kkbox['client_id'],
            'client_secret': credentials.kkbox['client_secret']
        }

        self.access_token = requests.post(url, headers=headers, data=data).json()['access_token']


    # https://docs-en.kkbox.codes/#get-/charts
    def get_chart_playlists(self, N):

        playlists = []

        url = 'https://api.kkbox.com/v1.1/charts'
        headers = {
            'accept': 'application/json',
            'authorization': f'Bearer {self.access_token}'
        }
        params = {
            'territory': 'TW',    # Allowed: HK, JP, MY, SG, TW
            'offset': 0,
            'limit': 30
        }

        response = requests.get(url, headers=headers, params=params)
        result = response.json()["data"]
        for item in result:
            playlists.append((item['id'], item['title']))

        return random.sample(playlists, k=N)


    # https://docs-en.kkbox.codes/#get-/charts/{playlist_id}/tracks
    def get_tracks_of_chart_playlist(self, playlist_id, N):

        tracks = []

        url = f'https://api.kkbox.com/v1.1/charts/{playlist_id}/tracks'
        headers = {
        'accept': 'application/json',
        'authorization': f'Bearer {self.access_token}'
        }
        params = {
        'territory': 'TW',    # Allowed: HK, JP, MY, SG, TW
        'offset': 0,
        'limit': 30           # TODO: can modify this!
        }

        response = requests.get(url, headers=headers, params=params)
        result = response.json()["data"]
        for item in result:
            tracks.append((
                self.get_cleaner_name(item['album']['artist']['name']),
                self.get_cleaner_name(item['name'])
            ))

        return random.sample(tracks, k=N)


    def get_cleaner_name(self, name):

        cleaner_name = name

        # turn
        # "想見你想見你想見你 (Miss You 3000) - 電視劇<想見你>片尾曲"
        # to
        # "想見你想見你想見你 (Miss You 3000)"
        cleaner_name = cleaner_name.split(' -')[0]

        # turn
        # "想見你想見你想見你 (Miss You 3000)"
        # to
        # "想見你想見你想見你"
        cleaner_name = cleaner_name.split(' (')[0]

        return cleaner_name


    # ==============================
    # for testing
    # ==============================

    def get_access_token(self):
        return self.access_token