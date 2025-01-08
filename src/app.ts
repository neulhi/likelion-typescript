// --------------------------------------------------------------------------
// TypeScript + Express.js를 활용해 간단한 API 서버 구성
// --------------------------------------------------------------------------
//
// 라우팅은 특정 엔드포인트에 대한 클라이언트 요청에 애플리케이션이 어떻게 응답할지 결정하는 것을 말하며,
// 이는 URI(또는 경로)와 특정 HTTP 요청 메서드(GET, POST, PUT, PATCH, DELETE 등)입니다.
// 각 경로에는 하나 이상의 핸들러 함수가 있을 수 있으며, 이 함수는 경로가 일치할 때 실행됩니다.
//
// 이미지, 스타일, 스크립트 파일과 같은 정적 파일을 제공하려면 기본 제공되는 미들웨어 함수를 사용합니다.
// 여러 정적 에셋 디렉토리를 사용하려면 express.static 미들웨어 함수를 여러 번 호출합니다.
//
// --------------------------------------------------------------------------
import 'dotenv/config';
import express from 'express';
import type { Express, Request } from 'express';
import { RequestUser, User } from './types/user';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';


/* CONFIG. ------------------------------------------------------------------ */

const app: Express = express();

// for Windows Users  process.env.HOSTNAME이 DESKTOP- 으로 시작하는 경우
const HOSTNAME = 'localhost';
// const HOSTNAME = process.env.HOSTNAME ?? 'localhost';
const PORT = Number(process.env.PORT) ?? 4000;
const MESSAGE = `웹 서버 구동 : http://${HOSTNAME}:${PORT}`;

/* Middleware ------------------------------------------------------------------ */

// app.use(greetingMessage);
app.use(express.static(resolve(__dirname, '../public')));
app.use(express.json());

/* Routing ------------------------------------------------------------------ */
//
// 라우팅은 특정 엔드포인트에 대한 클라이언트 요청에 애플리케이션이 어떻게 응답할지 결정하는 것을 말하며,
// 이는 URI(또는 경로)와 특정 HTTP 요청 메서드(GET, POST, PUT, PATCH, DELETE 등)입니다.
// 각 경로에는 하나 이상의 핸들러 함수가 있을 수 있으며, 이 함수는 경로가 일치할 때 실행됩니다.
//
// --------------------------------------------------------------------------

// GET
// app.get('/', entryHandler);

// POST
/*app.post('/', (request, response) => {
  // 클라이언트 요청 URL
  console.log(request.url);

  // 서버 -> 클라이언트 응답
  response.status(201 /~ Created ~/).send({
    message: 'POST 요청이 홈페이지로부터 주어졌습니다.',
  });
});*/

/* Users API ---------------------------------------------------------------- */

// CREATE (POST) ---------------------------------------------------------------- */
// 'POST /api/users'
app.post('/api/users', async (request: Request<{}, {}, RequestUser>, response) => {
  // 클라이언트 요청(JSON)
  console.log(request.body);
	
	// 서버에서 프로그래밍
	// data/users.json 파일 읽기
	// fsPromises.readFile() 
	const usersString = await readFile(resolve(__dirname, './data/users.json'), { encoding: 'utf-8' });

	// JSON format string - [JSON.parse(jsonString)] -> JavaScript Object
	const usersJSON: User[] = JSON.parse(usersString);

	console.log(usersJSON); 

	// data/users.json 파일에 쓰기
	// fsPromises.writeFile()

  // 클라이언트에 응답

	// 성공한 경우
  response.status(201).json({});

	// 실패한 경우
});

// READ (GET) ---------------------------------------------------------------- */
// 'GET /api/users'
app.get('/api/users', (request, response) => {
  // Response (to Client)
  // response.status(200).json(dummyUserList);
});

// 'GET /api/users/:id'

// UPDATE (PUT or PATCH) ---------------------------------------------------------------- */
// 'PUT /api/users/:id'
// 'PATCH /api/users/:id'

// DELETE (DELETE) ---------------------------------------------------------------- */
// 'DELETE /api/users/:id'

/* Listening ---------------------------------------------------------------- */

app.listen(PORT, HOSTNAME, () => {
  console.log(MESSAGE);
});
