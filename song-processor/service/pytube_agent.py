import os
import librosa
from scipy.io.wavfile import write
from pytube import YouTube, Search

# Turn off the warning "PySoundFile failed. Trying audioread instead."
import warnings
warnings.filterwarnings('ignore')

class PytubeAgent(object):
    def __init__(self):
        self.audio_folder = './static/audio'
        self.create_audio_folder()

    def create_audio_folder(self):
        if not os.path.exists(self.audio_folder):
            os.mkdir(self.audio_folder)

    def get_url_of_track(self, artist_name, track_name):
        ''' 想抓「某某」歌 => 用「某某 lyrics」當關鍵詞搜尋 YouTube => 找最相關的影片當作目標 '''
        s = Search(f'{artist_name} {track_name} lyrics')
        i = 0
        # FIXME: 長度可再調整
        while s.results[i].length > 600:
            print(s.results[i].length)
            i += 1
        video_url = s.results[i].watch_url

        return video_url

    def get_3_urls_of_track(self, query):
    # def get_3_urls_of_track(self, artist_name, track_name):
        s = Search(f'{query} lyrics')
        # s = Search(f'{artist_name} {track_name} lyrics')
        i = 0
        video_urls = []
        # FIXME: 長度可再調整
        while len(video_urls) < 3:
            # 防止 index out of range
            if i >= len(s.results):
                video_urls.append('dummy')
            elif s.results[i].length <= 600:
                # print(s.results[i].length)
                video_url = s.results[i].watch_url
                video_urls.append(video_url)
            i += 1

        return video_urls

    def download_as_wav_new(self, video_url, track_id):
        YouTube(video_url) \
            .streams \
            .filter(adaptive=True, only_audio=True) \
            .order_by('abr') \
            .last() \
            .download(output_path=self.audio_folder, filename=f'temp{track_id}')
        
        audio_filename = self.convert_to_wav_new(track_id)
        self.remove_temp_file_new(track_id)

        return audio_filename

    def convert_to_wav_new(self, track_id):
        y, sr = librosa.load(f'{self.audio_folder}/temp{track_id}', mono=False, sr=None)
        # TODO:
        # new_audio_filename = f'{track_id}.wav'
        new_audio_filename = f'temp{track_id}.wav'
        if y.shape[0] == 2:   # stereo
            write(f'{self.audio_folder}/{new_audio_filename}', sr, y.T)
        else:   # mono
            write(f'{self.audio_folder}/{new_audio_filename}', sr, y)
            
        return new_audio_filename

    def remove_temp_file_new(self, track_id):
        if os.path.exists(f'{self.audio_folder}/temp{track_id}'):
            os.remove(f'{self.audio_folder}/temp{track_id}')
        else:
            print('The file does not exist')
    
    # ==============================

    def download_as_wav(self, video_url, artist_name, track_name):
        YouTube(video_url) \
            .streams \
            .filter(adaptive=True, only_audio=True) \
            .order_by('abr') \
            .last() \
            .download(output_path=self.audio_folder, filename='temp')
        
        audio_filename = self.convert_to_wav(artist_name, track_name)
        self.remove_temp_file()

        return audio_filename


    def convert_to_wav(self, artist_name, track_name):
        y, sr = librosa.load(f'{self.audio_folder}/temp', mono=False, sr=None)
        new_audio_filename = f'{artist_name} - {track_name}.wav'
        if y.shape[0] == 2:   # stereo
            write(f'{self.audio_folder}/{new_audio_filename}', sr, y.T)
        else:   # mono
            write(f'{self.audio_folder}/{new_audio_filename}', sr, y)
            
        return new_audio_filename


    def remove_temp_file(self):
        if os.path.exists(f'{self.audio_folder}/temp'):
            os.remove(f'{self.audio_folder}/temp')
        else:
            print('The file does not exist')