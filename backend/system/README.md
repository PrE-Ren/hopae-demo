## Description

호패 데모용 백엔드 시스템을 사용하는 방법

## UserManual

#### node version 은 20.13.1로 맞춰주세요!

### 1. Package 설치

```bash
$ npm install
```

### 2. DB 띄우기

- MySQL 설치 후 실행

  - windows: https://kimhongsi.tistory.com/entry/MySQL-MYSQL-%EC%84%A4%EC%B9%98-%EA%B3%BC%EC%A0%95-%EC%A0%95%EB%A6%AC-%EB%B0%8F-%EC%8B%A4%ED%96%89-%ED%99%95%EC%9D%B8
  - mac OS:

    ```bash
    $ brew install mysql
    $ mysql.server start
    $ mysql_secure_installation //비밀번호 설정
    $ mysql -u root -p //위에서 설정한 비밀번호 입력

    ```

- MySQL 콘솔 접속 후 아래 명령어 실행

  ```bash
  # 현재 mysql 서버에 존재하는 db 목록 확인
  SHOW DATABASES;
  # Database "dev_db" 생성
  CREATE DATABASE dev_db;
  # 유저 생성
  CREATE USER 'team_w'@'localhost' identified by 'password_w';
  # 권한 부여
  GRANT ALL PRIVILEGES ON dev_db.* TO 'team_w'@'localhost'
  ```

- port 3306에 해당 Database 를 띄운다.

### 3. Docker로 Dock-Substrate-Blockchain Node 로컬에 띄우기

\*dock network : did SSI 시스템을 다루기 위해 만들어진 블록체인 네트워크
docker를 통해, docknetwork의 testnet을 실행해야 한다.

```bash
$ docker run -p 9944:9944 -p 30333:30333 docknetwork/dock-substrate:testnet --dev --ws-external --enable-offchain-indexing=true
```

- 이제 dock node에 9944번 포트를 통해 접속이 가능하다.

### 4. 서버 실행 (port: 8000)

```bash
$ cd backend/system
$ npm run start:dev
```

### 5. POST /init/all : 월렛 앱 holder, 증명서 issuer 행위자 생성

- mysql DB에 각 행위자의 정보가 저장된다.
- dock chain에 각 행위자의 did doc 등록된다.

```bash
curl -X POST localhost:8000/init/all
```

### 6. DB 에 근무 이력, 유전자 검사 결과 등록

- MySQL 콘솔 접속 후 아래 명령어 실행

  ```bash
  # db 선택
  USE dev_db;
  # holder DID 가져오기
  SELECT did FROM testHolderEntity ORDER BY id ASC LIMIT 1;
  # 근무 이력 생성하기
  INSERT INTO careerIssuerEmployee (did, department, position, salary, `join`, `leave`, createdAt, updatedAt, deletedAt) VALUES ('{위에서 얻은 holder DID}', '영업부', '대리', 5000, '2024-01-01', '2024-12-31', '2024-06-20 12:34:56', '2024-06-20 12:34:56', NULL);
   # 유전자 검사 결과 생성하기
  INSERT INTO geneticTestIssuerResult (did, hairLossGeneHeritability, dermatitisGeneHeritability, stomachCancerRisk, lungsCancerRisk, liverCancerRisk, pancreasCancerRisk, createdAt, updatedAt, deletedAt) VALUES ('{위에서 얻은 holder DID}', 75, 60, 15, 20, 10, 5, '2024-06-20 12:34:56', '2024-06-20 12:34:56', NULL);

  ```
