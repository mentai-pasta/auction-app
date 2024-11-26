```
npm install
npm run dev
```

```
open http://localhost:3000
```

## envの設定方法

### 1. サンプルからenvをコピー

```bash
cp .env.sample .env
```

### 2. envの設定

Dockerで動かす場合はhostにPostgreSQLのコンテナ名を入れる

```
DATABASE_URL = postgres://<user>:<password>@<host>:<port>/<database>

```
