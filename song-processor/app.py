from threading import Thread
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import urllib.parse
from service.kkbox_agent import KkboxAgent
from service.youtube_agent import YoutubeAgent
from service.pytube_agent import PytubeAgent
from service.audio_process_agent import AudioProcessAgent

app = Flask(__name__)
# https://stackoverflow.com/questions/25594893/how-to-enable-cors-in-flask
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

kkbox = KkboxAgent()
youtube = YoutubeAgent()
pytube = PytubeAgent()
audio_process = AudioProcessAgent()

@app.route('/api/v1/playlists_new', methods=['POST'])
@cross_origin()
def get_playlists_new():
    num_playlists = int(request.get_json().get('num_playlists'))
    playlists = kkbox.get_chart_playlists(num_playlists)
    return jsonify(
        data=playlists
    )

@app.route('/api/v1/remove_track', methods=['POST'])
@cross_origin()
def remove_track():
    track_id = int(request.get_json().get('track_id'))
    audio_process.remove_track(track_id)
    return jsonify(
        data='Request sent!'
    )

@app.route('/api/v1/3_urls', methods=['POST'])
@cross_origin()
def get_3_urls_of_track():
    query = request.get_json().get('query')
    # artist_name = request.get_json().get('artist_name')
    # track_name = request.get_json().get('track_name')
    video_urls = pytube.get_3_urls_of_track(query)
    # video_urls = pytube.get_3_urls_of_track(artist_name, track_name)
    return jsonify(
        data=video_urls
    )

@app.route('/api/v1/tracks_new', methods=['POST'])
@cross_origin()
def get_tracks_new():
    playlist_id = request.get_json().get('playlist_id')
    num_tracks = int(request.get_json().get('num_tracks'))
    tracks = kkbox.get_tracks_of_chart_playlist(playlist_id, num_tracks)
    return jsonify(
        data=tracks
    )

@app.route('/api/v1/download_and_process', methods=['POST'])
def download_and_process():
    track_id = request.get_json().get('track_id')
    artist_name = request.get_json().get('artist_name')
    track_name = request.get_json().get('track_name')
    q_type = int(request.get_json().get('q_type'))
    # video_url = youtube.get_url_of_track(artist_name, track_name)
    video_url = pytube.get_url_of_track(artist_name, track_name)

    # https://stackoverflow.com/questions/48994440/execute-a-function-after-flask-returns-response
    def download_job(video_url, track_id, q_type):
        ''' 給 YouTube 影片網址，取得音檔 '''
        print('\n下載中請稍等⋯⋯')
        audio_filename = pytube.download_as_wav_new(video_url, track_id)
        print('成功取得音檔！')

        print('\n音檔處理中請稍等⋯⋯')
        # TODO:
        if q_type == 1:
            # 播一首歌
            audio_process.do_nothing(audio_filename)
        elif q_type == 2:
            # 倒著播
            audio_process.speed_up(audio_filename)
        elif q_type == 3:
            # 倒著播
            audio_process.reverse(audio_filename)
        print('音檔處理完畢！')

        ''' 音檔做音量上的 normalization '''
        print('\n音量正規化中請稍等⋯⋯')
        if q_type == 2:
            # audio_process.louder(audio_filename)
            pass
        else:
            audio_process.normalize_new(audio_filename)
        print('音量正規化完畢！')

        audio_process.segment_it_new(audio_filename)
        print('擷取完畢！')

    thread = Thread(target=download_job, kwargs={
        'video_url': video_url,
        'track_id': track_id,
        'q_type': q_type
    })
    thread.start()
    return jsonify(
        data='Request sent!'
    )

@app.route('/api/v1/audio_status_new', methods=['POST'])
def get_audio_status_new():
    track_id = request.get_json().get('track_id')
    audio_filename = f'{track_id}.wav'
    audio_status = audio_process.get_audio_status(audio_filename)
    return jsonify(
        status=audio_status
    )

# ==============================

@app.route('/api/v1/playlists', methods=['GET'])
def get_playlists():
    num_playlists = int(request.get_json().get('num_playlists'))
    playlists = kkbox.get_chart_playlists(num_playlists)
    return jsonify(
        data=playlists
    )

@app.route('/api/v1/tracks', methods=['GET'])
def get_tracks():
    playlist_id = request.get_json().get('playlist_id')
    num_tracks = int(request.get_json().get('num_tracks'))
    tracks = kkbox.get_tracks_of_chart_playlist(playlist_id, num_tracks)
    return jsonify(
        data=tracks
    )

@app.route('/api/v1/video_url', methods=['GET'])
def get_video_url():
    artist_name = request.get_json().get('artist_name')
    track_name = request.get_json().get('track_name')
    # video_url = youtube.get_url_of_track(artist_name, track_name)
    video_url = pytube.get_url_of_track(artist_name, track_name)
    return jsonify(
        data=video_url
    )

@app.route('/api/v1/audio', methods=['POST'])
def post_audio():

    # https://stackoverflow.com/questions/48994440/execute-a-function-after-flask-returns-response
    def download_job(video_url, artist_name, track_name):
        ''' 給 YouTube 影片網址，取得音檔 '''
        print('\n下載中請稍等⋯⋯')
        audio_filename = pytube.download_as_wav(video_url, artist_name, track_name)
        print('成功取得音檔！')

        ''' 音檔做音量上的 normalization '''
        print('\n處理中請稍等⋯⋯')
        audio_process.normalize(audio_filename)
        print('處理完畢！')

    thread = Thread(target=download_job, kwargs={
        'video_url': request.get_json().get('video_url'),
        'artist_name': request.get_json().get('artist_name'),
        'track_name': request.get_json().get('track_name')
    })
    thread.start()
    return jsonify(
        data='Request sent!'
    )

@app.route('/api/v1/audio_status', methods=['GET'])
def get_audio_status():
    artist_name = request.get_json().get('artist_name')
    track_name = request.get_json().get('track_name')
    audio_filename = f'{artist_name} - {track_name}.wav'
    audio_status = audio_process.get_audio_status(audio_filename)
    return jsonify(
        data=audio_status
    )

@app.route('/api/v1/audio_length', methods=['GET'])
def get_audio_length():
    artist_name = request.get_json().get('artist_name')
    track_name = request.get_json().get('track_name')
    audio_filename = f'{artist_name} - {track_name}.wav'
    audio_length = audio_process.get_audio_length(audio_filename)
    return jsonify(
        data=audio_length
    )

@app.route('/api/v1/audio_trim', methods=['POST'])
def post_audio_trim():

    # https://stackoverflow.com/questions/48994440/execute-a-function-after-flask-returns-response
    def trim_job(artist_name, track_name, start_point, segment_length):
        audio_filename = f'{artist_name} - {track_name}.wav'
        audio_filename = f'normalized - {audio_filename}'   # TODO:
        if start_point != None and segment_length != None:
            audio_process.segment_it(audio_filename, int(start_point), int(segment_length))
        else:
            audio_process.segment_it(audio_filename)
        print('擷取完畢！')

    thread = Thread(target=trim_job, kwargs={
        'artist_name': request.get_json().get('artist_name'),
        'track_name': request.get_json().get('track_name'),
        'start_point': request.get_json().get('start_point'),
        'segment_length': request.get_json().get('segment_length')
    })
    thread.start()
    return jsonify(
        data='Request sent!'
    )

@app.route('/api/v1/audio_path', methods=['GET'])
def get_audio_path():
    artist_name = request.get_json().get('artist_name')
    track_name = request.get_json().get('track_name')
    # TODO:
    audio_filename = f'segment - normalized - {artist_name} - {track_name}.wav'
    audio_status = audio_process.get_audio_status(audio_filename)
    # TODO:
    audio_path = 'Audio not exist!' if audio_status == False else f'http://127.0.0.1:5000/static/audio/{urllib.parse.quote(audio_filename)}'
    return jsonify(
        data=audio_path
    )