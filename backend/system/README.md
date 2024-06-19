## Description

호패 데모용 백엔드 시스템을 사용하는 방법

## UserManual

### 1. Package 설치

```bash
$ npm install
```

### 2. DB 띄우기

mysql database 와 user 를 아래와 같이 생성하고 port 3306에 띄운다.

```
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=team_w
DB_PASSWORD=password_w
DB_NAME=dev_db
```

### 3. Docker로 Dock-Substrate-Blockchain Node 로컬에 띄우기

\*dock network : did SSI 시스템을 다루기 위해 만들어진 블록체인 네트워크
docker를 통해, docknetwork의 testnet을 실행해야 한다.

```bash
$ docker run -p 9944:9944 -p 30333:30333 docknetwork/dock-substrate:testnet --dev --ws-external --enable-offchain-indexing=true
```

- 이제 dock node에 9944번 포트를 통해 접속이 가능하다.

### 4. 서버 실행 (port: 8000)

```bash
$ cd /backend/system
$ npm run start:dev
```

### 5. POST /init/all : 월렛 앱 holder, 증명서 issuer 행위자 생성

- mysql DB에 각 행위자의 정보가 저장된다.
- dock chain에 각 행위자의 did doc 등록된다.

```bash
curl -X POST localhost:8000/init/all
```
