import os
import librosa
from scipy.io.wavfile import write
from pytube import YouTube

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