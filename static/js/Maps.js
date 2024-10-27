let currentMap = 'main'; // 채팅 기능에서 사용하려고

// 힙합맵 씬 class
class HipHopMap extends BaseMap
{
    // 힙합 맵의 키 -> 'hiphop'
    constructor() { super('hiphop'); }

    create()
    {
        this.createPlayer();

        // 포탈 테스트 ---
        const portal = this.physics.add.sprite(416, 620, 'portal').setDisplaySize(60, 32);
        this.physics.add.overlap(player, portal, () => {
            console.log('힙합맵에서 포탈에 부딛힘');
            removeAllOtherPlayers();
            currentMap = 'lobby';
            this.scene.start('lobby');  // 메인 맵으로로 이동 -> 테스트
            setChatRoomTitle('Soundscape Passage'); // 임시 힙합 방 타이틀
            clearChatMessages();
            socket.emit('player_left_room', {room: this.scene.key, nickname: playerId}); // 임시
        });
        // ---
        this.setupSocketEvents();

    }
    
    createTileMap() 
    {
        // 여기서 힙합 맵 타일 생성
        createHiphopTileMap.call(this);
    }
}

// 락맵 씬 class
class RockMap extends BaseMap
{
    // 락 맵의 키 -> 'rock'
    constructor() { super('rock'); }

    create()
    {
        this.createPlayer();

        // 포탈 테스트 ---
        const portal = this.physics.add.sprite(416, 620, 'portal').setDisplaySize(60, 32);
        this.physics.add.overlap(player, portal, () => {
            console.log('락맵에서 포탈에 부딛힘');
            removeAllOtherPlayers();
            currentMap = 'lobby';
            this.scene.start('lobby');  // 메인 맵으로로 이동 -> 테스트
            setChatRoomTitle('Soundscape Passage'); // 임시 락 방 타이틀
            clearChatMessages();
            socket.emit('player_left_room', {room: this.scene.key, nickname: playerId});
            
        });
        // ---
        this.setupSocketEvents();

    }
    
    createTileMap() 
    {
        // 여기서 힙합 맵 타일 생성
        createRockTileMap.call(this);
    }
}

// 발라드맵 씬 class
class BalladMap extends BaseMap
{
    // 발라드 맵의 키 -> 'ballad'
    constructor() { super('ballad'); }

    create()
    {
        this.createPlayer();

        // 포탈 테스트 ---
        const portal = this.physics.add.sprite(416, 620, 'portal').setDisplaySize(60, 32);
        this.physics.add.overlap(player, portal, () => {
            console.log('발라드맵에서 포탈에 부딛힘');
            removeAllOtherPlayers();
            currentMap = 'lobby';
            this.scene.start('lobby');  // 메인 맵으로로 이동 -> 테스트
            setChatRoomTitle('Soundscape Passage'); // 임시 발라드 방 타이틀
            clearChatMessages();
            socket.emit('player_left_room', {room: this.scene.key, nickname: playerId});

        });
        // ---
        this.setupSocketEvents();

    }
    
    createTileMap() 
    {
        // 여기서 힙합 맵 타일 생성
        createBalladTileMap.call(this);
    }
}

// 인디맵 씬 class
class IndiMap extends BaseMap
{
    // 인디 맵의 키 -> 'indi'
    constructor() { super('indi'); }

    create()
    {
        this.createPlayer();

        // 포탈 테스트 ---
        const portal = this.physics.add.sprite(416, 620, 'portal').setDisplaySize(60, 32);
        this.physics.add.overlap(player, portal, () => {
            console.log('인디맵에서 포탈에 부딛힘');
            removeAllOtherPlayers();
            currentMap = 'lobby';
            this.scene.start('lobby');  // 메인 맵으로로 이동 -> 테스트
            setChatRoomTitle('Soundscape Passage'); // 임시 로비 방 타이틀
            clearChatMessages();
            socket.emit('player_left_room', {room: this.scene.key, nickname: playerId});
        });
        // ---
        this.setupSocketEvents();

    }
    
    createTileMap() 
    {
        // 여기서 힙합 맵 타일 생성
        createIndiTileMap.call(this);
    }
}

// 로비맵 씬 class
class LobbyMap extends BaseMap
{
    // 로비 맵의 키 -> 'lobby'
    constructor() { super('lobby'); }

    create()
    {
        this.createPlayer();

        // 포탈 테스트 ---
        const hiphopPortal = this.physics.add.sprite(96, 81, 'hiphopPortal').setDisplaySize(60, 32);
        this.physics.add.overlap(player, hiphopPortal, () => 
        {
            console.log('로비맵에서 힙합방으로 가는 포탈에 부딛힘');
            removeAllOtherPlayers();
            currentMap = 'hiphop';
            this.scene.start('hiphop');
            setChatRoomTitle('Rhythm & Rhyme');
            clearChatMessages();
            socket.emit('player_left_room', {room: this.scene.key, nickname: playerId});
        });

        const rockPortal = this.physics.add.sprite(224, 81, 'rockPortal').setDisplaySize(60, 32);
        this.physics.add.overlap(player, rockPortal, () => 
        {
            console.log('로비맵에서 락방으로 가는 포탈에 부딛힘');
            removeAllOtherPlayers();
            currentMap = 'rock';
            this.scene.start('rock');
            setChatRoomTitle('Volume Up Lounge');
            clearChatMessages();
            socket.emit('player_left_room', {room: this.scene.key, nickname: playerId});
        });

        const balladPortal = this.physics.add.sprite(352,81, 'balladPortal').setDisplaySize(60, 32);
        this.physics.add.overlap(player, balladPortal, () => 
        {
            console.log('로비맵에서 발라드방으로 가는 포탈에 부딛힘');
            removeAllOtherPlayers();
            currentMap = 'ballad';
            this.scene.start('ballad');
            setChatRoomTitle('Waves of Emotion');
            clearChatMessages();
            socket.emit('player_left_room', {room: this.scene.key, nickname: playerId});
        });

        const indiPortal = this.physics.add.sprite(480, 81, 'indiPortal').setDisplaySize(60, 32);
        this.physics.add.overlap(player, indiPortal, () => 
        {
            console.log('로비맵에서 인디방으로 가는 포탈에 부딛힘');
            removeAllOtherPlayers();
            currentMap = 'indi';
            this.scene.start('indi');
            setChatRoomTitle('The Sound Nook');
            clearChatMessages();
            socket.emit('player_left_room', {room: this.scene.key, nickname: playerId});
        });

        const mainPortal = this.physics.add.sprite(288, 204, 'mainPortal').setDisplaySize(60, 32);
        this.physics.add.overlap(player, mainPortal, () => 
        {
            console.log('로비맵에서 메인맵으로 가는 포탈에 부딛힘');
            removeAllOtherPlayers();
            currentMap = 'main';
            this.scene.start('main');
            setChatRoomTitle("Echo Park");
            clearChatMessages();
            socket.emit('player_left_room', {room: this.scene.key, nickname: playerId});
        });
        // ---

        this.setupSocketEvents();

    }
    
    createTileMap() 
    {
        // 여기서 힙합 맵 타일 생성
        createLobbyTileMap.call(this);
    }
}


// 메인 맵 씬 class
class MainMap extends BaseMap
{
    // 메인 맵의 키 -> 'main'
    constructor() { super('main'); }

    create()
    {
        this.createPlayer();

        // 포탈 테스트
        const portal = this.physics.add.sprite(480, 272, 'portal').setDisplaySize(60, 32);
        this.physics.add.overlap(player, portal, () => 
        {
            console.log('메인맵에서 로비맵으로 가는 포탈에 부딛힘');
            removeAllOtherPlayers();
            currentMap = 'lobby';
            this.scene.start('lobby');  // 로비 맵으로로 이동 -> 테스트
            setChatRoomTitle("Soundscape Passage"); // 임시 메인맵 타이틑
            clearChatMessages();
            socket.emit('player_left_room', {room: this.scene.key, nickname: playerId});
            //removeAllOtherPlayers(); // 맵 이동했으니 모든 플레이어 삭제하기
            // 힙합맵에 있는 캐릭터 정보들 받아오는 루틴 추가해야함
        });

        this.setupSocketEvents();
    }

    createTileMap() 
    {
        // 여기서 힙합 맵 타일 생성
        createMainTileMap.call(this);
    }
}