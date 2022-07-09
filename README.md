# Guess Songs King

<p align=center>
    <a target="_blank" href="https://opensource.org/licenses/MIT" title="License: MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg"></a>
    <a target="_blank" href="http://makeapullrequest.com" title="PRs Welcome"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg"></a>
</p>

An interactive game platform deployed on **AWS EC2** combines the concepts of "Kahoot!" and "song guessing".

## Features
<mark>↓  Click the triangle to toggle the demo GIF</mark>
<details>
<summary>Game host registers on the platform</summary>
<br>
<img src="demo/1.gif" width="800">
</details>

<details>
<summary>Game host creates a song-guessing party and then song audio files process in the background</summary>
<br>
<img src="demo/2.gif" width="800">
</details>

<details>
<summary>Game host deletes a song-guessing party and sees the detail of another</summary>
<br>
<img src="demo/3.gif" width="800">
</details>

<details>
<summary>Game host hosts a game and players join the game to play (just like Kahoot!)</summary>
<br>
<img src="demo/4.gif" width="800">
</details>

## Powered by

- **Back-End:** Node.js, Express, Flask, NGINX
- **Front-End:** React, Chakra UI, SweetAlert2
- **Database:** MySQL
- **Cloud Service:** AWS EC2
- **Third-Party API:** KKBOX OpenAPI
- **Open Source Tools** Socket.IO

## How to Run

### Front-End
```bash
cd frontend/
npm start
```

### Audio Processor
```bash
cd song-processor/
pipenv shell
flask run --host=0.0.0.0
```

### Back-End
```bash
cd backend/
nodemon bin/www
```