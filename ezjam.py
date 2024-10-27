# ezjam.py
from flask import Flask, render_template, request, redirect, url_for, session
from flask_socketio import SocketIO, emit
from community import community_profile
from modules import DB
from modules import LoadJSON
import session_handle as shand

app = Flask('EzJam')
app.secret_key = 'zoo@123456'
socketio = SocketIO(app)

app.register_blueprint(community_profile)

# 플레이어 정보 저장하는 딕셔너리
players_main = {} # 메인맵 접속해있는 플레이어 정보
players_lobby = {} # 로비 접속해있는 플레이어 정보
players_hiphop = {} # 힙합 맵 접속해있는 플레이어 정보
players_rock = {} # 락 맵 접속해있는 플레이어 정보
players_ballad = {} # 발라드 맵 접속해있는 플레이어 정보
players_indi = {} # 인디 맵 접속해있는 플레이어 정보

# 타일맵(stage) 데이터를 저장하는 변수
stage_data = {}
tilesets_data = {}


# 서버 시작 시 JSON 데이터 불러오기
tilesetsData = LoadJSON.loadMapTilesetsData()
mainMapData = LoadJSON.loadMapJsonData('main')
lobbyMapData = LoadJSON.loadMapJsonData('lobby')
hiphopMapData = LoadJSON.loadMapJsonData('hiphop')
balladMapData = LoadJSON.loadMapJsonData('ballad')
rockMapData = LoadJSON.loadMapJsonData('rock')
indiMapData = LoadJSON.loadMapJsonData('indi')


@app.route('/game')
def startGame():
    if not shand.isUserLoggedIn():
        return redirect(url_for('community.login'))
    else:
        return render_template("game.html")

@socketio.on('getNickNameAndSex')
def ret_nickname():
    emit('nickNameAndSex', {'nickName': str(DB.get_nickname_with_id(shand.getUserId())), 'sex': str(DB.get_sex_with_id(shand.getUserId()))} )

# 메인 맵에 새로운 플레이어가 접속할 때 처리 -- > 임시
@socketio.on('main_new_player')
def handle_main_new_player(data):
    if shand.isUserLoggedIn():
        print('메인방에 캐릭터가 입장했습니다')
        player_id = str(DB.get_nickname_with_id(shand.getUserId())) # 플레이어 ID 가져오기
        player_sex = str(DB.get_sex_with_id(shand.getUserId()))
        print('아이디: ', player_id, '성별:', player_sex)
        session['userNickname'] = player_id  # 세션에 닉네임 저장 (웹 소켓에서 필요하지 않음)
        
        # 플레이어 정보 players 딕셔너리에 저장
        players_main[player_id] = {'x': data['x'], 'y': data['y'], 'sid': request.sid, 'sex': player_sex}
        
        emit('main_existing_players', players_main, room=request.sid)  # 현재 플레이어에게 다른 플레이어 정보 전송
        emit('main_map_data', {'stage': mainMapData, 'tilesets': tilesetsData}, room=request.sid) # 맵 데이터 전송
        emit('main_new_player', data, broadcast=True, include_self=False)  # 다른 플레이어에게 새 플레이어 정보 전송

        # 임시 출력
        print('메인  : ', players_main)
        print('로비  : ', players_lobby)
        print('힙합  : ', players_hiphop)
        print('락   : ', players_rock)
        print('발라드 : ', players_ballad)
        print('인디  : ', players_indi)
    else:
        return redirect(url_for('community.login'))

# 로비 맵에 새로운 플레이어가 접속할 때 처리 -- > 임시
@socketio.on('lobby_new_player')
def handle_lobby_new_player(data):
    if shand.isUserLoggedIn():
        print('로비방에 캐릭터가 입장했습니다')
        player_id = str(DB.get_nickname_with_id(shand.getUserId())) # 플레이어 ID 가져오기
        player_sex = str(DB.get_sex_with_id(shand.getUserId()))
        session['userNickname'] = player_id  # 세션에 닉네임 저장 (웹 소켓에서 필요하지 않음)
        
        # 플레이어 정보 players 딕셔너리에 저장
        players_lobby[player_id] = {'x': data['x'], 'y': data['y'], 'sid': request.sid, 'sex': player_sex}
        
        emit('lobby_existing_players', players_lobby, room=request.sid)  # 현재 플레이어에게 다른 플레이어 정보 전송
        emit('lobby_map_data', {'stage': lobbyMapData, 'tilesets': tilesetsData}, room=request.sid) # 맵 데이터 전송
        emit('lobby_new_player', data, broadcast=True, include_self=False)  # 다른 플레이어에게 새 플레이어 정보 전송
         # 임시 출력
        print('메인  : ', players_main)
        print('로비  : ', players_lobby)
        print('힙합  : ', players_hiphop)
        print('락   : ', players_rock)
        print('발라드 : ', players_ballad)
        print('인디  : ', players_indi)
    else:
        return redirect(url_for('community.login'))

# 힙합 맵에 새로운 플레이어가 접속할 때 처리 -- > 임시
@socketio.on('hiphop_new_player')
def handle_hiphop_new_player(data):
    if shand.isUserLoggedIn():
        print('힙합방에 캐릭터가 입장했습니다')
        player_id = str(DB.get_nickname_with_id(shand.getUserId())) # 플레이어 ID 가져오기
        player_sex = str(DB.get_sex_with_id(shand.getUserId()))
        session['userNickname'] = player_id  # 세션에 닉네임 저장 (웹 소켓에서 필요하지 않음)
        
        # 플레이어 정보 players 딕셔너리에 저장
        players_hiphop[player_id] = {'x': data['x'], 'y': data['y'], 'sid': request.sid, 'sex': player_sex}
        
        emit('hiphop_existing_players', players_hiphop, room=request.sid)  # 현재 플레이어에게 다른 플레이어 정보 전송
        emit('hiphop_map_data', {'stage': hiphopMapData, 'tilesets': tilesetsData}, room=request.sid) # 맵 데이터 전송
        emit('hiphop_new_player', data, broadcast=True, include_self=False)  # 다른 플레이어에게 새 플레이어 정보 전송
         # 임시 출력
        print('메인  : ', players_main)
        print('로비  : ', players_lobby)
        print('힙합  : ', players_hiphop)
        print('락   : ', players_rock)
        print('발라드 : ', players_ballad)
        print('인디  : ', players_indi)
    else:
        return redirect(url_for('community.login'))

# 락 맵에 새로운 플레이어가 접속할 때 처리 -- > 임시
@socketio.on('rock_new_player')
def handle_rock_new_player(data):
    if shand.isUserLoggedIn():
        print('락방에 캐릭터가 입장했습니다')
        player_id = str(DB.get_nickname_with_id(shand.getUserId())) # 플레이어 ID 가져오기
        player_sex = str(DB.get_sex_with_id(shand.getUserId()))
        session['userNickname'] = player_id  # 세션에 닉네임 저장 (웹 소켓에서 필요하지 않음)
        
        # 플레이어 정보 players 딕셔너리에 저장
        players_rock[player_id] = {'x': data['x'], 'y': data['y'], 'sid': request.sid, 'sex': player_sex}
        
        emit('rock_existing_players', players_rock, room=request.sid)  # 현재 플레이어에게 다른 플레이어 정보 전송
        emit('rock_map_data', {'stage': rockMapData, 'tilesets': tilesetsData}, room=request.sid) # 맵 데이터 전송
        emit('rock_new_player', data, broadcast=True, include_self=False)  # 다른 플레이어에게 새 플레이어 정보 전송
         # 임시 출력
        print('메인  : ', players_main)
        print('로비  : ', players_lobby)
        print('힙합  : ', players_hiphop)
        print('락   : ', players_rock)
        print('발라드 : ', players_ballad)
        print('인디  : ', players_indi)
    else:
        return redirect(url_for('community.login'))

# 발라드 맵에 새로운 플레이어가 접속할 때 처리 -- > 임시
@socketio.on('ballad_new_player')
def handle_ballad_new_player(data):
    if shand.isUserLoggedIn():
        print('발라드방에 캐릭터가 입장했습니다')
        player_id = str(DB.get_nickname_with_id(shand.getUserId())) # 플레이어 ID 가져오기
        player_sex = str(DB.get_sex_with_id(shand.getUserId()))
        session['userNickname'] = player_id  # 세션에 닉네임 저장 (웹 소켓에서 필요하지 않음)
        
        # 플레이어 정보 players 딕셔너리에 저장
        players_ballad[player_id] = {'x': data['x'], 'y': data['y'], 'sid': request.sid, 'sex': player_sex}
        
        emit('ballad_existing_players', players_ballad, room=request.sid)  # 현재 플레이어에게 다른 플레이어 정보 전송
        emit('ballad_map_data', {'stage': balladMapData, 'tilesets': tilesetsData}, room=request.sid) # 맵 데이터 전송
        emit('ballad_new_player', data, broadcast=True, include_self=False)  # 다른 플레이어에게 새 플레이어 정보 전송
         # 임시 출력
        print('메인  : ', players_main)
        print('로비  : ', players_lobby)
        print('힙합  : ', players_hiphop)
        print('락   : ', players_rock)
        print('발라드 : ', players_ballad)
        print('인디  : ', players_indi)
    else:
        return redirect(url_for('community.login'))

# 인디 맵에 새로운 플레이어가 접속할 때 처리 -- > 임시
@socketio.on('indi_new_player')
def handle_indi_new_player(data):
    if shand.isUserLoggedIn():
        print('인디방에 캐릭터가 입장했습니다')
        player_id = str(DB.get_nickname_with_id(shand.getUserId())) # 플레이어 ID 가져오기
        player_sex = str(DB.get_sex_with_id(shand.getUserId()))
        session['userNickname'] = player_id  # 세션에 닉네임 저장 (웹 소켓에서 필요하지 않음)
        
        # 플레이어 정보 players 딕셔너리에 저장
        players_indi[player_id] = {'x': data['x'], 'y': data['y'], 'sid': request.sid, 'sex': player_sex}
        
        emit('indi_existing_players', players_indi, room=request.sid)  # 현재 플레이어에게 다른 플레이어 정보 전송
        emit('indi_map_data', {'stage': indiMapData, 'tilesets': tilesetsData}, room=request.sid) # 맵 데이터 전송
        emit('indi_new_player', data, broadcast=True, include_self=False)  # 다른 플레이어에게 새 플레이어 정보 전송
         # 임시 출력
        print('메인  : ', players_main)
        print('로비  : ', players_lobby)
        print('힙합  : ', players_hiphop)
        print('락   : ', players_rock)
        print('발라드 : ', players_ballad)
        print('인디  : ', players_indi)
    else:
        return redirect(url_for('community.login'))


# 플레이어의 움직임을 처리
@socketio.on('player_moved')
def handle_player_moved(data):
    player_sid = request.sid  # 소켓 ID로 플레이어 식별
    player_id = None

    # 임시 -> 무식한 방식으로 이동처리

    if data['playerAt'] == 'main':
        # request.sid로 플레이어 ID 찾기
        for pid, info in players_main.items():
            if info.get('sid') == player_sid:
                player_id = pid
                break

        if player_id:
            # 플레이어 위치 업데이트
            player_sex = players_main[player_id]['sex']
            players_main[player_id] = {'x': data['x'], 'y': data['y'], 'sid': request.sid, 'sex': player_sex}
            emit('main_player_moved', data, broadcast=True, include_self=False)  # 다른 클라이언트에 위치 전송

    if data['playerAt'] == 'lobby':
        # request.sid로 플레이어 ID 찾기
        for pid, info in players_lobby.items():
            if info.get('sid') == player_sid:
                player_id = pid
                break

        if player_id:
            # 플레이어 위치 업데이트
            player_sex = players_lobby[player_id]['sex']
            players_lobby[player_id] = {'x': data['x'], 'y': data['y'], 'sid': request.sid, 'sex': player_sex}
            emit('lobby_player_moved', data, broadcast=True, include_self=False)  # 다른 클라이언트에 위치 전송

    if data['playerAt'] == 'hiphop':
        # request.sid로 플레이어 ID 찾기
        for pid, info in players_hiphop.items():
            if info.get('sid') == player_sid:
                player_id = pid
                break

        if player_id:
            # 플레이어 위치 업데이트
            
            player_sex = players_hiphop[player_id]['sex']
            players_hiphop[player_id] = {'x': data['x'], 'y': data['y'], 'sid': request.sid, 'sex': player_sex}
            emit('hiphop_player_moved', data, broadcast=True, include_self=False)  # 다른 클라이언트에 위치 전송

    if data['playerAt'] == 'rock':
        # request.sid로 플레이어 ID 찾기
        for pid, info in players_rock.items():
            if info.get('sid') == player_sid:
                player_id = pid
                break

        if player_id:
            # 플레이어 위치 업데이트
            player_sex = players_rock[player_id]['sex']
            players_rock[player_id] = {'x': data['x'], 'y': data['y'], 'sid': request.sid, 'sex': player_sex}
            emit('rock_player_moved', data, broadcast=True, include_self=False)  # 다른 클라이언트에 위치 전송

    if data['playerAt'] == 'ballad':
        # request.sid로 플레이어 ID 찾기
        for pid, info in players_ballad.items():
            if info.get('sid') == player_sid:
                player_id = pid
                break

        if player_id:
            # 플레이어 위치 업데이트
            player_sex = players_ballad[player_id]['sex']
            players_ballad[player_id] = {'x': data['x'], 'y': data['y'], 'sid': request.sid, 'sex': player_sex}
            emit('ballad_player_moved', data, broadcast=True, include_self=False)  # 다른 클라이언트에 위치 전송

    if data['playerAt'] == 'indi':
        # request.sid로 플레이어 ID 찾기
        for pid, info in players_indi.items():
            if info.get('sid') == player_sid:
                player_id = pid
                break

        if player_id:
            # 플레이어 위치 업데이트
            player_sex = players_indi[player_id]['sex']
            players_indi[player_id] = {'x': data['x'], 'y': data['y'], 'sid': request.sid, 'sex': player_sex}
            emit('indi_player_moved', data, broadcast=True, include_self=False)  # 다른 클라이언트에 위치 전송


#임시 -> 플레이어가 방을 떠나 다른 방으로 이동했을 떄
@socketio.on('player_left_room')
def player_left(data):
    print('플레이어가 방을 떠남 ', end='')
    print(data['room'])
    if data['room'] == 'main':
        players_main.pop(data['nickname'])
        emit('main_remove_player', data['nickname'], broadcast=True, include_self=False)
    elif data['room'] == 'lobby':
        players_lobby.pop(data['nickname'])
        emit('lobby_remove_player', data['nickname'], broadcast=True, include_self=False)
    elif data['room'] == 'hiphop':
        players_hiphop.pop(data['nickname'])
        emit('hiphop_remove_player', data['nickname'], broadcast=True, include_self=False)
    elif data['room'] == 'rock':
        players_rock.pop(data['nickname'])
        emit('rock_remove_player', data['nickname'], broadcast=True, include_self=False)
    elif data['room'] == 'ballad':
        players_ballad.pop(data['nickname'])
        emit('ballad_remove_player', data['nickname'], broadcast=True, include_self=False)
    elif data['room'] == 'indi':
        players_indi.pop(data['nickname'])
        emit('indi_remove_player', data['nickname'], broadcast=True, include_self=False)


# 플레이어가 접속을 종료했을 때 처리
@socketio.on('disconnect')
def handle_disconnect():
    player_found = False
    player_id_to_remove = None
    event_prefix = ""

    # 맵별로 플레이어 정보 확인 및 삭제
    for map_name, players in {
        "main": players_main,
        "lobby": players_lobby,
        "hiphop": players_hiphop,
        "rock": players_rock,
        "ballad": players_ballad,
        "indi": players_indi
    }.items():
        for player_id, info in list(players.items()):
            if info.get('sid') == request.sid:
                player_id_to_remove = player_id
                del players[player_id]
                event_prefix = map_name
                player_found = True
                break
        if player_found:
            break

    # 해당 플레이어가 삭제되었다면 클라이언트에 알림 전송
    if player_id_to_remove and event_prefix:
        emit(f'{event_prefix}_remove_player', player_id_to_remove, broadcast=True)
        print(f"Player {player_id_to_remove} disconnected from {event_prefix} map")




# 이하 채팅 기능 테스트
@socketio.on('chat-send')
def chatMessageBroadcast(data):
    emit('chat-receive', data, broadcast=True, include_self=True)


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', debug=True)
