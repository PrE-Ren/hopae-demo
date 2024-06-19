## Description

호패 데모용 백엔드 시스템을 사용하는 방법

## UserManual

### 1. Package 설치

```bash
$ npm install
```

### 2. DB 띄우기

다음 스펙을 만족하는 DB가 있는 mysql 서버를 port 3306에 로컬호스트로 띄워주세요.

```
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=team_w
DB_PASSWORD=password_w
DB_NAME=dev_db
```

### 3. Docker로 Dock-Substrate-Blockchain Node 로컬에 띄우기

\*dock network : Did SSI 시스템을 다루기 위해 만들어진 블록체인 네트워크
docker를 통해, docknetwork의 testnet을 dev모드로 실행해야 한다.

- dev모드로 해야 transaction fee 없이 할 수 있음.

```bash
$ docker run -p 9944:9944 -p 30333:30333 docknetwork/dock-substrate:testnet --dev --ws-external --enable-offchain-indexing=true
```

- 여기까지 왔으면 dock node에 9944번 포트를 통해 접속이 가능한 것임.

### 4. 서버 실행

별다른 문제가 없다면 8000번 포트 locahost에 띄워집니다.

```bash
# 개발모드로 실행해서 콘솔 값을 보자 (데모용)
$ npm run start:dev
```

### 5. 주요 행위자 미리 셋업 - init api 사용

post 요청을 통해 init (issuer 2개, holder 1개)

- mysql 서버에 각 행위자의 정보 저장
- dock chain에 각 행위자의 did doc register

```bash
curl -X POST localhost:8000/init/all
```
