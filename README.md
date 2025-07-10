```
/src
├── bin/                 # 실행 가능 애플리케이션 (page-level 컴포넌트 또는 진입점)
│   └── main.tsx         # 애플리케이션 진입점 (ReactDOM.render)
│
├── boot/                # 부트로더 (앱 초기화, 프로바이더 설정 등)
│   └── App.tsx
│
├── usr/                 # 사용자 공간, 유저 앱, UI 관련 파일
│   ├── components/      # UI 컴포넌트 (atoms, molecules 등)
│   ├── layouts/         # 레이아웃
│   ├── views/           # 실제 페이지 뷰들
│   └── themes/          # 스타일 테마 설정
│
├── etc/                 # 설정 파일들 (env, router, config)
│   ├── config.ts        # 앱 설정
│   ├── routes.tsx       # 라우터 정의
│   └── constants.ts     # 상수 정의
│
├── var/                 # 가변 데이터, 캐시, 상태 저장소 등
│   ├── store/           # 상태 관리 (Zustand, Redux 등)
│   ├── cache/           # 로컬스토리지, 세션
│   └── logs/            # (선택) 로그 기록 유틸
│
├── sys/                 # 시스템 자원 (API 통신, 서비스, 유틸 등)
│   ├── api/             # Axios 등 API 정의
│   ├── services/        # AuthService, UserService 등
│   └── utils/           # 공통 유틸 함수
│
├── lib/                 # 외부 라이브러리 및 래퍼 모듈
│   └── i18n.ts          # 다국어 설정 등
│
└── dev/                 # 개발 전용 툴, 모의 데이터, 테스트 등
├── mocks/           # Mock API 데이터
└── tools/           # 개발용 유틸
