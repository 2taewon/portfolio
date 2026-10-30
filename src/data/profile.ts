// 사이트에 표시되는 개인 정보입니다. 이 파일만 고치면 메인 화면 내용이 바뀝니다.

export type SkillGroup = {
  category: string;
  items: string[];
};

export type TimelineItem = {
  start: string; // "2025.03"
  end?: string; // 없으면 시작 시점만 표시
  kind: "EDU" | "INTERN" | "WORK"; // 로그 레벨처럼 표시되는 구분
  title: string;
  subtitle: string;
  highlights?: string[];
};

export type Award = {
  date?: string;
  title: string;
  note?: string;
};

export type Profile = {
  name: string;
  nameEn: string;
  handle: string; // 헤더 로고 표기용
  role: string;
  tagline: string;
  about: string[];
  location: string;
  openToWork: boolean;
  contacts: {
    email: string;
    github?: string;
    notion?: string;
    blog?: string;
  };
  resumeUrl?: string; // public/resume.pdf 에 파일을 넣고 "/resume.pdf" 로 지정
  skills: SkillGroup[];
  timeline: TimelineItem[];
  certifications: Award[];
  awards: Award[];
};

export const profile: Profile = {
  name: "이태원",
  nameEn: "Taewon Lee",
  handle: "2taewon",
  role: "Backend Developer",
  tagline: "끊임없이 도전하고 성장하는 개발자 이태원입니다.",
  about: [
    "개발은 게임으로 시작했습니다. 미디어소프트웨어학과에서 Unity와 언리얼 엔진으로 게임을 개발했고, 레드브릭 챌린저스 대상과 학술대회 우수 논문상을 받으며 결과물이 인정받는 기쁨을 알게 됐습니다.",
    "그러다 화면 뒤에서 데이터를 안전하게 다루고 많은 요청을 안정적으로 처리하는 서버 쪽 일에 더 끌리게 됐습니다. 익숙한 분야를 떠나는 것도 도전이라 생각하고 웹 백엔드로 방향을 바꿔, KOSA 풀스택 과정에서 Java와 Spring을 기초부터 다졌습니다.",
    "지금은 직접 개발한 서비스 '별빛안부'를 AWS에 배포해 실제 사용자에게 제공하고, 서버 상태를 모니터링하며 운영하고 있습니다.",
    "분야를 바꾼 경험은 오히려 강점이 됐습니다. 게임을 개발하며 몸에 밴 사용자 관점 덕분에, 서버 기능을 설계할 때도 '쓰는 사람이 어떻게 느낄까'를 먼저 생각합니다.",
  ],
  location: "Seoul, KR",
  openToWork: true,
  contacts: {
    email: "teawon1005@naver.com",
    github: "https://github.com/2taewon",
    notion: "https://shore-jaw-781.notion.site/19ac2f5b1de3805291adcab95baf1ab8",
  },
  skills: [
    { category: "Language", items: ["Java", "JavaScript", "SQL", "C++"] },
    {
      category: "Backend",
      items: ["Spring Boot", "Spring Security", "JPA (Hibernate)", "JdbcTemplate", "MyBatis", "WebSocket / STOMP"],
    },
    { category: "Database", items: ["PostgreSQL", "MySQL", "Oracle", "Redis", "Flyway"] },
    { category: "DevOps", items: ["AWS EC2 · S3 · CloudFront", "Docker Compose", "GitHub Actions", "Prometheus · Grafana"] },
    { category: "Test", items: ["JUnit5", "Mockito", "k6"] },
    { category: "Frontend", items: ["Vue.js", "React", "TypeScript"] },
    { category: "Collaboration", items: ["Git", "SVN", "Notion", "Figma", "Slack"] },
  ],
  timeline: [
    {
      start: "2025.03",
      end: "2025.09",
      kind: "EDU",
      title: "KOSA · MSA 기반 Full Stack 개발 전문가 양성 과정",
      subtitle: "Java · DB · Spring · Vue.js",
      highlights: [
        "Java, Oracle SQL, JDBC부터 Spring MVC, Spring Security, REST API까지 학습",
        "팀 프로젝트 3회 수행: TogetherBank → OTT MOA → Korex",
      ],
    },
    {
      start: "2022.12",
      end: "2023.02",
      kind: "INTERN",
      title: "레드브릭",
      subtitle: "개발팀 인턴 · 콘텐츠 개발",
    },
    {
      start: "2019.03",
      end: "2025.02",
      kind: "EDU",
      title: "성결대학교",
      subtitle: "미디어소프트웨어학과 졸업",
    },
  ],
  certifications: [{ date: "2026.03", title: "SQL 개발자 (SQLD)", note: "한국데이터산업진흥원" }],
  awards: [
    { date: "2024.06", title: "국내학술대회 우수 논문상", note: "Memory Studio · 언리얼 엔진 5 기반 힐링 어드벤처 게임" },
    { date: "2023.11", title: "미디어소프트웨어 경진대회 우수상" },
    { date: "2022.11", title: "레드브릭 챌린저스 대상", note: "Maze Castle" },
    { date: "2022.11", title: "미디어소프트웨어 경진대회 2등" },
  ],
};
