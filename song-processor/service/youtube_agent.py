# -*- coding: utf-8 -*-

from googleapiclient.discovery import build
from . import credentials

class YoutubeAgent(object):
    def __init__(self):
        self.youtube = None
        self.init_youtube()

    def init_youtube(self):
        youtube_api_key = credentials.youtube['api_key']
        # youtube_api_key = credentials.youtube['api_key_happy']
        self.youtube = build('youtube', 'v3', developerKey=youtube_api_key)

    def get_url_of_track(self, artist_name, track_name):
        ''' 想抓「某某」歌 => 用「某某 lyrics」當關鍵詞搜尋 YouTube => 找最相關的影片當作目標 '''
        request = self.youtube.search().list(
            part='snippet',
            q=f'{artist_name} {track_name} lyrics',
            type='video'
        )
        response = request.execute()
        first_video = response['items'][0]   # The video that is most relevant to the search query
        video_id = first_video['id']['videoId']
        video_url = f'https://www.youtube.com/watch?v={video_id}'

        return video_url