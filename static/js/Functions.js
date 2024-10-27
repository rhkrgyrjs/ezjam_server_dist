// 플레이어 애니메이션 생성 함수
function createPlayerAnimations() {
    const playerModels = ['playerBob', 'playerAmelia', 'playerNob'];
    const frames = [
        { direction: 'down', frames: [0, 1, 0, 2] },
        { direction: 'right', frames: [3, 4, 3, 5] },
        { direction: 'left', frames: [8, 7, 8, 6] },
        { direction: 'up', frames: [9, 10, 9, 11] }
    ];

    // 각 플레이어 모델에 대해 애니메이션 생성
    playerModels.forEach(model => {
        frames.forEach(animation => {
            this.anims.create({
                key: `${model}_${animation.direction}`, // 예: playerBob_down, playerAmelia_right
                frames: this.anims.generateFrameNumbers(model, { frames: animation.frames }),
                frameRate: 10,
                repeat: -1
            });
        });
    });
}


// 새로운 플레이어 추가
function addPlayer(id, x, y, map, sex) {
    console.log(id, '플레이어 캐릭터를 추가합니다..');
        if (!otherPlayers[id]) {
            let mapCode = 0;
            let modelKey;
            if (map == 'main') {mapCode = 0;}
            else if (map == 'lobby') {mapCode = 1;}
            else if (map == 'hiphop') {mapCode = 2;}
            else if (map == 'rock') {mapCode = 3;}
            else if (map == 'ballad') {mapCode = 4;}
            else if (map == 'indi') {mapCode = 5;}
            if (sex == 'M') { modelKey = 'playerBob'; }
            else if (sex == 'F') { modelKey = 'playerAmelia'; }
            else if (sex == 'O') { modelKey = 'playerNob'; }
            console.log('닉네임:', id, '맵:', map, '성별:', sex, '모델:', modelKey);
            otherPlayers[id] = game.scene.scenes[mapCode].physics.add.sprite(x, y, modelKey).setDisplaySize(25, 25);
            otherPlayersText[id] = game.scene.scenes[mapCode].add.text(x, y + 30, id, {
                fontSize: '10px',
                fill: '#ffffff'
            });
            otherPlayersText[id].setOrigin(0.5);  // 텍스트를 가운데 정렬
            otherPlayers[id].setDepth(1);
            otherPlayersText[id].setDepth(1);
        }
}

// 모든 플레이어 삭제하는 함수
function removeAllOtherPlayers() 
{
    console.log('다른 모든 플레이어를 삭제합니다..');
    // 모든 플레이어를 순회
    for (let id in otherPlayers) {
        if (otherPlayers.hasOwnProperty(id) && id !== playerId) {
            // 현재 플레이어의 id가 아닌 플레이어만 삭제
            otherPlayers[id].destroy();  // 스프라이트 삭제
            otherPlayersText[id].destroy();  // 텍스트 삭제
            delete otherPlayers[id];  // 플레이어 객체 삭제
            delete otherPlayersText[id];  // 텍스트 객체 삭제
        }
    }
}