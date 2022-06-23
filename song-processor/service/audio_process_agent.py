import os
import random
import librosa
from scipy.io.wavfile import write
import numpy as np

class AudioProcessAgent(object):
    def __init__(self):
        self.audio_folder = './static/audio'
        self.create_audio_folder()

    def create_audio_folder(self):
        if not os.path.exists(self.audio_folder):
            os.mkdir(self.audio_folder)

    def normalize_new(self, audio_filename):
        y, sr = librosa.load(f'{self.audio_folder}/{audio_filename}', mono=False, sr=None)
        if y.shape[0] == 2:   # stereo
            left, right = y
            left = librosa.util.normalize(left) * 0.5
            right = librosa.util.normalize(right) * 0.5
            # https://stackoverflow.com/questions/3637350/how-to-write-stereo-wav-files-in-python
            y = np.vstack((left, right))
            write(f'{self.audio_folder}/{audio_filename}', sr, y.T)
        else:   # mono
            y = librosa.util.normalize(y) * 0.5
            write(f'{self.audio_folder}/{audio_filename}', sr, y)

    def segment_it_new(self, audio_filename, start_point=None, segment_length=None):
        y, sr = librosa.load(f'{self.audio_folder}/{audio_filename}', mono=False, sr=None)
        seconds = len(y[0]) // sr
        segment_length = segment_length if segment_length else 30   # FIXME:
        begin = sr * start_point if start_point != None else sr * random.randint(0, seconds-1-segment_length)
        end = begin + sr * segment_length
        new_y = y[:, begin:end]

        if new_y.shape[0] == 2:   # stereo
            write(f'{self.audio_folder}/{audio_filename}', sr, new_y.T)
        else:   # mono
            write(f'{self.audio_folder}/{audio_filename}', sr, new_y)

    # ==============================

    def normalize(self, audio_filename):
        y, sr = librosa.load(f'{self.audio_folder}/{audio_filename}', mono=False, sr=None)
        if y.shape[0] == 2:   # stereo
            left, right = y
            left = librosa.util.normalize(left) * 0.5
            right = librosa.util.normalize(right) * 0.5
            # https://stackoverflow.com/questions/3637350/how-to-write-stereo-wav-files-in-python
            y = np.vstack((left, right))
            write(f'{self.audio_folder}/normalized - {audio_filename}', sr, y.T)
        else:   # mono
            y = librosa.util.normalize(y) * 0.5
            write(f'{self.audio_folder}/normalized - {audio_filename}', sr, y)


    def get_audio_length(self, audio_filename):
        y, sr = librosa.load(f'{self.audio_folder}/{audio_filename}', mono=False, sr=None)
        seconds = len(y[0]) // sr
        return seconds


    def get_audio_status(self, audio_filename):
        return os.path.isfile(os.path.abspath(f'{self.audio_folder}/{audio_filename}'))


    def segment_it(self, audio_filename, start_point=None, segment_length=None):
        y, sr = librosa.load(f'{self.audio_folder}/{audio_filename}', mono=False, sr=None)
        seconds = len(y[0]) // sr
        segment_length = segment_length if segment_length else 30   # FIXME:
        begin = sr * start_point if start_point != None else sr * random.randint(0, seconds-1-segment_length)
        end = begin + sr * segment_length
        new_y = y[:, begin:end]

        if new_y.shape[0] == 2:   # stereo
            write(f'{self.audio_folder}/segment - {audio_filename}', sr, new_y.T)
        else:   # mono
            write(f'{self.audio_folder}/segment - {audio_filename}', sr, new_y)