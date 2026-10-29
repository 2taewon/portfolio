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
    slug: "ott-moa",
    title: "OTT MOA",
    summary: "OTT 계정을 함께 구독할 파티원을 모집하는 게시판 서비스. 구인글 CRUD와 페이징을 맡았고, 대시보드 조회의 N+1 문제를 해결했습니다.",
    period: "2025.06 – 2025.07",
    team: "4명",
    stack: ["Java 21", "Spring Boot 3.4", "Spring Security", "JPA (Hibernate)", "WebSocket / STOMP", "PostgreSQL", "Redis", "Vue.js", "Docker", "AWS EC2", "GitHub Actions"],
    overview: "OTT 계정을 공유할 사람을 찾기 위한 게시판 서비스입니다. 구인글마다 채팅방이 만들어지고, 파티가 모두 모이면 참여자에게 메일 알림이 발송됩니다.",
    target: "OTT를 저렴하게 구독하고 싶은 사용자",
    features: ["회원가입 · 이메일 인증", "로그인 (JWT, Google · Kakao · Naver 소셜 로그인)", "프로필 관리", "구인 게시판", "구인글별 채팅방", "파티 모집 완료 메일 알림"],
    myWork: [
      {
        title: "구인 게시판 CRUD",
        details: ["플랫폼, 모집 인원, 개월 수를 입력해 구인글 생성", "개월 수, OTT 계정 정보 수정 및 삭제"],
      },
      {
        title: "조회 · 페이지네이션",
        details: [
          "OTT 플랫폼별 카테고리 필터링",
          "OTT별 구인글 무한 스크롤",
          "내가 만든 / 참여한 구인글 9개씩 페이징, OTT 이름 · 작성일 정렬, 활성 · 만료 필터",
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
      { label: "GitHub", url: "https://github.com/KOSA-2nd-Team3" },
      { label: "ERD", url: "https://www.erdcloud.com/d/3ThLaPmvwQdyQrCuG" },
      { label: "발표 자료", url: "https://docs.google.com/presentation/d/1eqR2E-AFPlgqxt6vAG3sxOBtCEmTTdHKobrkHvr-x0U/edit" },
    ],
  },
  {
    slug: "korex",
    title: "Korex",
    summary: "유학생과 여행객을 위한 환전 · 송금 서비스. 계좌, 친구 송금, 환전 기능을 맡았습니다.",
    period: "2025.08 – 2025.09",
    team: "4명",
    stack: ["Java 21", "Spring Boot 3.4", "Spring Security", "JPA (Hibernate)", "PostgreSQL", "Redis", "Vue.js", "Docker", "AWS EC2"],
    overview:
      "환율 변동성이 커진 상황에서, 고객이 예측 가능성을 가지고 편리하고 안전하게 외환을 거래할 수 있도록 만든 환전 · 송금 서비스입니다.",
    target: "유학생 부모님, 여행객",
    features: [
      "회원가입 (Clova OCR로 신분증 정보 자동 입력)",
      "로그인 (Spring Security · JWT)",
      "실시간 · 날짜별 · 통화별 환율 조회와 환율 차트 (Redis 캐시)",
      "계좌 · 환전 · 친구 송금 · 해외 송금",
      "관리자 페이지 (해외 송금 승인, 고객센터)",
    ],
    myWork: [
      { title: "계좌", details: ["계좌 생성 및 조회"] },
      {
        title: "친구 송금",
        details: ["이름과 전화번호만으로 친구에게 송금", "즐겨찾기에 등록한 친구에게 빠른 송금"],
      },
      {
        title: "환전",
        details: ["From / To 통화를 선택해 환전", "현재 환율, 수수료, 최종 금액을 환율 차트와 함께 표시"],
      },
    ],
    architecture: ["Vue.js", "Spring Boot (Security · JWT)", "PostgreSQL", "Redis (환율 캐시)"],
    links: [
      { label: "GitHub", url: "https://github.com/MSA-Team4-Final" },
      { label: "ERD", url: "https://www.erdcloud.com/d/LLmJn2QGpo6oZpCYt" },
      { label: "WBS", url: "https://docs.google.com/spreadsheets/d/17_kVIbu_xpuhjBFN6ybfEuSW_x_1kCimHhIaMcAYaGQ/edit" },
      { label: "발표 자료", url: "https://docs.google.com/presentation/d/1nwdRUx-dPlwSn0D6F3ItlJWdl6T5Hh7zgI0YPhviq-I/edit" },
    ],
  },
  {
    slug: "together-bank",
    title: "TogetherBank",
    summary: "Java 콘솔 기반 은행 시스템. MVC 구조와 JDBC로 계좌 조회, 입출금, 이체 기능을 구현했습니다.",
    period: "2025.04 – 2025.05",
    team: "5명",
    stack: ["Java", "JDBC", "MySQL"],
    overview: "Java로 개발한 은행 콘솔 애플리케이션입니다. MVC 구조로 계층을 나누고, JDBC로 MySQL에 직접 쿼리를 작성했습니다.",
    target: "은행 업무를 이용하는 사용자",
    features: ["회원가입 · 로그인", "계좌 개설", "계좌 입출금 · 이체", "관리자 기능 (전체 총액, 일일 거래, 회원 관리)"],
    myWork: [{ title: "계좌 업무", details: ["계좌 조회", "입금 · 출금", "계좌 간 이체"] }],
    architecture: ["Console View", "Controller", "Service", "DAO (JDBC)", "MySQL"],
    links: [
      { label: "ERD", url: "https://www.erdcloud.com/d/D99KnvzMkAyzmCihc" },
      { label: "Figma", url: "https://www.figma.com/design/muZNj3I9RIgB9KYCbyEo35/msa_bank" },
      { label: "발표 자료", url: "https://docs.google.com/presentation/d/1qsCr3f9fxdl8NRelXFInEqXYZax0JJPfhU9MvKyTTAQ/edit" },
    ],
  },
];

// 상세 페이지 없이 목록으로만 보여주는 그 외 프로젝트
export const otherProjects: { title: string; period: string; summary: string; stack: string[]; url?: string }[] = [
  {
    title: "MRP",
    period: "2023.04 – 2023.06",
    summary: "영화 리뷰 커뮤니티 (무비차트, 일별 박스오피스, 상영 예정작) · 1인 개발",
    stack: ["PHP", "Google Cloud Platform"],
    url: "https://youtu.be/QSP5YAKrgJE",
  },
  {
    title: "Memory Studio",
    period: "2023.08 – 2024.12",
    summary: "기억을 잃은 사진작가의 이야기를 다룬 어드벤처 게임 · 5명",
    stack: ["Unreal Engine", "Blender"],
  },
  {
    title: "Maze Castle",
    period: "2022.10 – 2022.11",
    summary: "미로를 통과해 성을 차지하는 게임 · 3명",
    stack: ["RedBrick Studio"],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
