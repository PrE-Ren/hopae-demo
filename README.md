# hopae-demo

SNU-hopae demo project

## User Manual

### 1. 서버 사이드 세팅하기

backend/system/README.md 대로 세팅한다.

위 과정을 진행하면

- DB에 주요 행위자의 정보가 생성되어 들어간다.
- verifiable registry(dock network)에 주요 행위자의 did doc이 등록되어 있다.

### 2. 웹 실행

```bash
$ cd frontend/web
$ npm run dev
```

- ngrok 를 사용하여 localhost 3000과 8000을 public URL로 포워딩한다.

  - ngrok를 설치하고 (검색 통해 설치법 확인 요망 - os 따라 설치법이 다름)
  - 쉘에서 아래 작업 순차적으로 실행

    ```shell
      # $ 회원가입한 뒤 마이페이지에서 확인할 수 있는 AUTH_TOKEN을 아래 넣어 커맨드 실행
      $ ngrok config add-authtoken {AUTH_TOKEN}
      # 백엔드 localhost forwarding
      $ ngrok http 8000
      # 프론트엔드 웹 localhost forwarding
      $ ngrok http 3000
    ```

- 프로젝트 코드에서 `frontendHostingUrl`, `backendHostingURL` 위 과정에서 확인할 수 있는 public Url로 갈아낀다.
  - `backendHostingURL` in /frontend/web/common/config.ts
  - `frontendHostingUrl` in /app/wallet/src/common.ts

### 3. 앱 사이드 데이터 세팅하기

- /app/wallet/src/common/const.ts 에서 서버 사이드 세팅을 통해 생성된 DB 의 testHolderEntity 테이블의 did, privateKey 칼럼 값으로 `holderDid`, `holderPrivateKey` 를 변경한다.

- 기기를 연결하거나 에뮬레이터를 실행하면 월렛 앱이 켜진다.
