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
  tagline: "동작하는 코드에서 멈추지 않고, 더 나은 구조를 고민하는 신입 백엔드 개발자입니다.",
  about: [
    "Java와 Spring Boot로 웹 서비스의 백엔드를 개발합니다. 최근에는 직접 만든 서비스 '별빛안부'를 AWS에 배포하고 Grafana로 지켜보며 운영했습니다.",
    "N+1 문제나 동시성 버그처럼 '돌아가지만 언젠가 깨지는' 부분을 쿼리 로그와 부하 테스트로 찾아내고, 고치기 전에 테스트로 먼저 재현합니다.",
    "웹 개발부터 게임 레벨 디자인까지 여러 분야에 도전해 온 경험 덕분에, 기능을 만들 때 사용자 관점에서 한 번 더 바라보는 습관이 있습니다.",
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
