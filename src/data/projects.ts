// 프로젝트 목록과 상세 내용입니다. 배열 순서대로 메인 화면에 표시됩니다.

export type Metric = {
  label: string;
  before?: string;
  after: string;
};

export type Troubleshooting = {
  title: string;
  problem: string;
  cause?: string;
  solution: string[];
  result?: string;
};

export type Project = {
  slug: string; // URL에 쓰이는 식별자 (/projects/{slug})
  title: string;
  summary: string;
  image?: string; // public/projects/ 아래 대표 화면
  period: string;
  team: string;
  stack: string[];
  overview: string; // 서비스 설명
  target: string; // 사용 대상
  features: string[]; // 서비스 전체 핵심 기능
  myWork: { title: string; details: string[] }[]; // 본인이 맡은 기능
  metrics?: Metric[];
  architecture?: string[]; // 요청 흐름 순서대로
  troubleshooting?: Troubleshooting[];
  learnings?: string;
  links?: { label: string; url: string }[];
};

export const projects: Project[] = [
  {
    slug: "starlight-letter",
    title: "별빛안부 · Starlight Letter",
    summary:
      "도림천 다리의 QR을 찍고 짧은 편지를 강물에 띄우는 모바일 웹 서비스. 직접 배포해 운영했고, 출시 전 k6 부하 테스트로 사이트를 멈추게 하던 장애 4건을 찾아 고쳤습니다.",
    image: "/projects/starlight-letter.png",
    period: "2026.09 – 2026.10",
    team: "2명",
    stack: ["Java 17", "Spring Boot 3.4", "PostgreSQL 16", "JdbcTemplate", "Flyway", "React", "TypeScript", "Docker Compose", "AWS EC2 · S3 · CloudFront", "Grafana Cloud", "k6", "JUnit5"],
    overview:
      "관악구 별빛내린천(도림천)의 세 다리에서 매주 바뀌는 질문에 1~150자 편지로 답해 강물에 띄우고, 다른 사람의 편지를 건져 읽는 서비스입니다. 읽기는 어디서나 되지만 쓰기는 그 다리의 QR을 찍은 사람만 3시간 동안 할 수 있어, 실제 산책길과 온라인을 잇습니다. 메모리 2GB짜리 서버 한 대에서 멈추지 않는 것을 목표로 만들었습니다.",
    target: "도림천을 산책하는 지역 주민",
    features: [
      "QR 작성 허가: 다리 포스터 QR로 3시간 통행권 발급, 열쇠는 주소창에서 바로 삭제",
      "강물과 유리병: 다리별 이번 주 질문의 편지가 흐르고, 안 본 편지가 약 20배 잘 뽑힘",
      "편지 쓰기: 하루 한 다리 3통 · 전체 10통 제한, 중복 제출 방지, 내용 검사",
      "위로 · 보관 · 신고 (5명 신고 시 임시 숨김), 주간 · 월간 베스트 서랍장",
      "업적 7개(북두칠성)와 업적으로 여는 유리병, 내가 쓴 편지 보관함",
      "이메일 없이 닉네임 · 비밀번호 가입, 복구 코드로 비밀번호 재설정",
      "운영자 콘솔 (TOTP 2단계 인증): 질문 예약, 신고 처리, 검사 규칙, QR 재발급, 지표, 감사 기록",
    ],
    myWork: [
      {
        title: "부하 테스트 · 성능 개선",
        details: [
          "k6로 11가지 케이스를 측정하고, 장애 4건을 회귀 테스트로 먼저 재현한 뒤 수정",
          "로그인 교착, 작성 제한 경쟁 조건, 해시 메모리 폭주, 서랍장 집계 지연 해결",
          "서랍장 베스트 조회 쿼리 개선과 인덱스 추가",
        ],
      },
      {
        title: "배포 · 모니터링",
        details: [
          "AWS EC2에 Docker Compose로 배포, 운영 설정 정리",
          "Grafana Alloy → Grafana Cloud 연결, 운영 대시보드와 알림 구성",
        ],
      },
      {
        title: "편지 정책 · 운영 기능",
        details: [
          "QR로 들어온 다리 외에는 편지 쓰기를 막는 통행권 제한",
          "하루 작성 수 제한(자정 초기화), 블랙리스트, 편지 중복 검사, 편지 · 닉네임 검사 규칙 정비",
          "안 본 편지가 먼저 떠내려오도록 강물 편지 확률 조정",
          "업적, 내가 쓴 편지 보관함, 부적절한 닉네임 신고 · 가리기, 관리자 지표",
        ],
      },
    ],
    metrics: [
      { label: "출시 직전 처리량", after: "181 req/s · 실패 0%" },
      { label: "로그인 몰림 시 메모리", before: "1.2GB · 스왑", after: "239MiB" },
      { label: "데이터 3개월 분량 처리량", before: "25 req/s", after: "168 req/s" },
    ],
    architecture: ["React (S3)", "CloudFront", "Spring Boot (EC2)", "PostgreSQL", "Grafana Alloy → Grafana Cloud"],
    troubleshooting: [
      {
        title: "동시 로그인이 사이트 전체를 30초 멈춤",
        problem: "부하 테스트에서 16명이 동시에 로그인하자 로그인뿐 아니라 사이트 전체가 30초 동안 멈췄습니다.",
        cause:
          "요청 하나가 커넥션 2개를 순서대로 필요로 했습니다. 바깥 트랜잭션이 커넥션을 쥔 채 속도 제한용 별도 트랜잭션을 열었고, 동시 요청이 풀(10개)을 다 차지하자 서로가 놓아 주기만 기다렸습니다.",
        solution: ["별도 트랜잭션이 바깥 트랜잭션보다 먼저 끝나도록 순서 변경", "비밀번호 해시 계산을 트랜잭션 밖으로 이동"],
        result: "48명 동시 로그인까지 전원 성공했습니다.",
      },
      {
        title: "하루 작성 제한이 동시 요청에 뚫림",
        problem: "'하루 한 다리 3통' 제한이 같은 회원의 동시 요청에서는 6통까지 저장되었습니다.",
        cause:
          "'세고 → 저장' 사이에 다른 요청이 끼어드는 check-then-act 경쟁 조건이었습니다. 회원 행을 FOR UPDATE로 잠그자 이번에는 외래 키가 거는 KEY SHARE 잠금과 충돌해 교착이 났습니다.",
        solution: [
          "FOR NO KEY UPDATE로 바꿔 같은 회원끼리만 순서를 기다리고, 다른 회원끼리는 서로 막지 않게 함",
          "수정 전 코드에서 실패하는 것을 먼저 확인한 동시성 회귀 테스트 작성",
        ],
        result: "동시 요청에서도 정확히 3통만 저장됩니다.",
      },
      {
        title: "운영 사양에서만 드러난 비밀번호 해시 메모리 폭주",
        problem: "2GB 서버를 흉내 낸 환경에서 로그인 몰림이 반복되자 메모리가 1.2GB 한계에 닿고 스왑이 발생했습니다.",
        cause:
          "Argon2는 해시 하나에 JVM 힙 밖 네이티브 메모리 19MB를 씁니다. glibc 할당기가 해제된 큰 블록을 OS에 돌려주지 않아 메모리가 계속 쌓였습니다.",
        solution: [
          "할당기 설정(MALLOC_ARENA_MAX 등)과 동시 해시 수 제한을 각각 켜고 끄며 4가지 조합 비교",
          "둘 다 적용했을 때만 안정적인 것을 확인하고 운영에 반영",
          "측정용 이미지가 운영과 다른 런타임(musl)이던 것을 발견해 운영과 같은 이미지로 맞춤",
        ],
        result: "순간 최고 메모리가 239MiB로 줄고 스왑은 0이 되었습니다.",
      },
      {
        title: "데이터가 쌓이면 서랍장 집계가 커넥션 풀을 막음",
        problem: "한 달 운영 분량 ×3의 데이터를 넣자 처리량이 25 req/s로 떨어지고 요청이 30초 뒤 실패했습니다.",
        cause:
          "CPU는 낮은데 느렸습니다. pg_stat_activity로 확인하니 정렬 데이터가 work_mem을 넘어 디스크 임시 파일을 기다리고 있었고, 느린 집계가 커넥션 풀을 차지했습니다.",
        solution: ["좁은 키(id, 수, 시각)로 먼저 집계하고 편지 본문은 상위 후보에만 조인", "순위만 10초 캐시하고 숨김 · 삭제 여부는 매번 새로 조회", "빠진 인덱스 추가"],
        result: "같은 데이터에서 168 req/s, 실패 0%가 되었습니다.",
      },
    ],
    learnings:
      "실패율 0%인 시나리오 안에도 진짜 버그가 숨어 있을 수 있다는 것을 배웠습니다. 처음 측정에서 나온 높은 실패율은 대부분 측정 스크립트 문제였고, 작성 제한 버그는 엣지 케이스를 따로 설계하고 나서야 드러났습니다. 그 뒤로는 숫자를 믿기 전에 측정 방법부터 의심하고, 고치기 전에 테스트로 먼저 재현합니다.",
    links: [
      { label: "서비스", url: "https://www.starletter.co.kr/" },
      { label: "GitHub", url: "https://github.com/Starlight-Letter/backend" },
    ],
  },
  {
    slug: "ott-moa",
    title: "OTT MOA",
    summary: "OTT 계정을 함께 구독할 파티원을 모집하는 게시판 서비스. 구인글 CRUD와 페이징을 맡았고, 대시보드 조회의 N+1 문제를 해결했습니다.",
    image: "/projects/ott-moa.png",
    period: "2025.06 – 2025.07",
    team: "4명",
    stack: ["Java 21", "Spring Boot 3.4", "Spring Security", "JPA (Hibernate)", "WebSocket / STOMP", "PostgreSQL", "Redis", "Vue.js", "Docker", "AWS EC2", "GitHub Actions"],
    overview: "OTT 계정을 공유할 사람을 찾기 위한 게시판 서비스입니다. 구인글마다 채팅방이 만들어지고, 파티가 모두 모이면 참여자에게 메일 알림이 발송됩니다.",
    target: "OTT를 저렴하게 구독하고 싶은 사용자",
    features: [
      "회원가입 · 이메일 인증",
      "로그인 (JWT, Google · Kakao · Naver 소셜 로그인)",
      "프로필 관리",
      "구인 게시판 · 플랫폼별 1인당 구독료 계산",
      "구인글별 실시간 채팅방 (WebSocket / STOMP)",
      "파티 모집 완료 메일 알림, 기간이 끝난 파티 자동 만료",
      "GitHub Actions → AWS EC2 Docker 자동 배포",
    ],
    myWork: [
      {
        title: "구인 게시판 CRUD",
        details: [
          "플랫폼, 모집 인원, 개월 수를 입력해 구인글 생성",
          "개월 수, OTT 계정 정보 수정 및 삭제",
          "모집 인원과 개월 수로 1인당 구독료 계산 (소수점 첫째 자리 올림)",
        ],
      },
      {
        title: "조회 · 페이지네이션",
        details: [
          "OTT 플랫폼별 카테고리 필터링",
          "OTT별 구인글 무한 스크롤, 이미 시작된 파티는 목록에서 제외",
          "내가 만든 / 참여한 구인글 9개씩 페이징, OTT 이름 · 작성일 정렬, 활성 · 만료 필터",
        ],
      },
      {
        title: "메일 알림 · 파티 만료",
        details: [
          "메일 발송을 비동기로 처리해 발송을 기다리지 않고 바로 응답",
          "메일 속 링크로 해당 파티 페이지에 바로 접속",
          "스케줄러로 기간이 끝난 파티를 자동 만료 처리",
        ],
      },
    ],
    metrics: [{ label: "대시보드 조회 쿼리 수", before: "28회", after: "2회" }],
    architecture: ["Vue.js", "Spring Boot (Security · JWT · STOMP)", "PostgreSQL", "Redis"],
    troubleshooting: [
      {
        title: "페이징 조회 시 N+1 문제 해결",
        problem:
          "내가 파티장인 구인글을 9개씩 조회하는 대시보드에서, 구인글 1번 조회 후 채팅방 · 플랫폼 · 파티 멤버 조회 쿼리가 각각 9번씩 추가로 발생했습니다 (총 28번).",
        cause:
          "Post와 ChatRoom은 1:1 관계이고 연관관계 주인은 ChatRoom입니다. Hibernate는 1:1 관계의 비주인(mappedBy) 쪽에서 LAZY 로딩이 동작하지 않아, Post를 조회할 때마다 ChatRoom이 즉시 로딩되었습니다.",
        solution: [
          "ToOne 관계는 fetch join으로 한 번에 조회",
          "컬렉션(파티 멤버)은 fetch join 시 페이징이 불가능하므로 default_batch_fetch_size로 IN 쿼리 한 번에 조회",
          "Post → ChatRoom 참조를 제거해 단방향 관계로 변경하고, 채팅방이 필요할 때만 ChatRoomRepository로 별도 조회",
        ],
        result: "조회 쿼리가 28번에서 2번으로 줄었습니다.",
      },
      {
        title: "메일 발송 로직을 테스트 가능하게 만들기",
        problem:
          "MailService 테스트를 실행하면 실제 메일이 발송되었고, 서비스 하나를 테스트하기 위해 @SpringBootTest로 전체 Spring 컨텍스트를 띄워야 했습니다.",
        solution: [
          "MailService가 JavaMailSender 구현체를 직접 생성하지 않고 생성자 주입으로 인터페이스를 받도록 설계",
          "테스트에서는 Mockito로 JavaMailSender를 Mock 처리",
        ],
        result: "실제 메일 발송 없이, Spring을 띄우지 않는 단위 테스트로 발송 흐름을 검증할 수 있게 되었습니다.",
      },
    ],
    learnings:
      "JPA가 편리하게 감춰 주는 쿼리를 직접 로그로 확인하는 습관이 생겼습니다. 연관관계의 주인을 정할 때도 '어느 쪽을 자주 조회하는가'보다 '생명주기와 생성 순서'를 기준으로 판단하게 되었습니다.",
    links: [
      { label: "GitHub", url: "https://github.com/KOSA-2nd-Team3/back-end" },
      { label: "ERD", url: "https://www.erdcloud.com/d/3ThLaPmvwQdyQrCuG" },
      { label: "발표 자료", url: "https://docs.google.com/presentation/d/1eqR2E-AFPlgqxt6vAG3sxOBtCEmTTdHKobrkHvr-x0U/edit" },
    ],
  },
  {
    slug: "korex",
    title: "Korex",
    summary: "유학생과 여행객을 위한 환전 · 송금 서비스. 계좌, 친구 송금, 환전 기능을 맡았습니다.",
    image: "/projects/korex.png",
    period: "2025.08 – 2025.09",
    team: "4명",
    stack: ["Java 21", "Spring Boot 3.4", "Spring Security", "JPA (Hibernate)", "Spring Batch", "PostgreSQL", "Redis", "Vue.js", "Docker", "AWS EC2"],
    overview:
      "환율 변동성이 커진 상황에서, 고객이 예측 가능성을 가지고 편리하고 안전하게 외환을 거래할 수 있도록 만든 환전 · 송금 서비스입니다.",
    target: "유학생 부모님, 여행객",
    features: [
      "회원가입 (Clova OCR로 신분증 정보 자동 입력)",
      "로그인 (Spring Security · JWT)",
      "실시간 · 날짜별 · 통화별 환율 조회와 환율 차트 (Redis 캐시, Spring Batch로 환율 수집)",
      "계좌 · 환전 · 친구 송금 · 해외 송금",
      "외부 은행 계좌 연결과 충전 · 출금",
      "환율 알림, AI 챗봇 상담",
      "관리자 페이지 (해외 송금 승인, 송금 수수료 관리, 고객센터)",
    ],
    myWork: [
      {
        title: "계좌",
        details: [
          "계좌 생성과 계좌 상세 · 거래 내역 조회 API",
          "외부 은행 계좌에서 충전 · 출금과 거래 내역",
          "거래 비밀번호 검증: 4자리 숫자, 생년월일 · 전화번호와 겹치지 않게 검사하고 BCrypt로 저장",
        ],
      },
      {
        title: "친구 송금",
        details: [
          "이름과 전화번호만으로 친구에게 송금 (본인 송금 · 잔액 부족 · 수취인 불일치 검증)",
          "즐겨찾기에 등록한 친구에게 빠른 송금, 친구별 최근 거래 1건 표시",
        ],
      },
      {
        title: "환전",
        details: [
          "From / To 통화를 선택해 환전, 지원 통화 4개 → 8개로 확장",
          "금액 계산은 BigDecimal과 반올림 규칙으로 처리하고, 엔 · 위안은 100단위 환율을 환산",
          "실행 전 시뮬레이션으로 현재 환율, 수수료(0.5%), 최종 금액을 환율 차트와 함께 표시",
        ],
      },
    ],
    architecture: ["Vue.js", "Spring Boot (Security · JWT)", "PostgreSQL", "Redis (환율 캐시)"],
    links: [
      { label: "GitHub", url: "https://github.com/MSA-Team4-Final/Back-end/tree/dev" },
      { label: "ERD", url: "https://www.erdcloud.com/d/LLmJn2QGpo6oZpCYt" },
      { label: "WBS", url: "https://docs.google.com/spreadsheets/d/17_kVIbu_xpuhjBFN6ybfEuSW_x_1kCimHhIaMcAYaGQ/edit" },
      { label: "발표 자료", url: "https://docs.google.com/presentation/d/1nwdRUx-dPlwSn0D6F3ItlJWdl6T5Hh7zgI0YPhviq-I/edit" },
    ],
  },
];

// 상세 페이지 없이 목록으로만 보여주는 그 외 프로젝트
export const otherProjects: {
  title: string;
  period: string;
  summary: string;
  stack: string[];
  link?: { label: string; url: string };
}[] = [
  {
    title: "Triplog",
    period: "2026.06 – 2026.07",
    summary: "친구들과 함께 쓰는 여행 플래너. 지도 연동과 장소 · 일정 화면 담당 · 2명",
    stack: ["Next.js", "TypeScript", "Spring Boot", "PostgreSQL", "Docker"],
    link: { label: "GitHub", url: "https://github.com/our-triplog/backend" },
  },
  {
    title: "Memory Studio",
    period: "2023.08 – 2024.12",
    summary:
      "졸업 작품. 기억을 잃은 사진작가의 이야기를 다룬 어드벤처 게임으로, 레벨 디자인을 맡아 맵 로딩 · 조명 버그를 재현해 고치며 약 1년간 개발. 국내학술대회 우수 논문상 수상 · 5명",
    stack: ["Unreal Engine 5", "Blender"],
    link: { label: "영상", url: "https://youtu.be/j4aQ4t9TZPo" },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
