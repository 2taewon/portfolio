# Portfolio

백엔드 개발자 포트폴리오 사이트입니다. Next.js + TypeScript + Tailwind CSS로 만들었고, 모든 페이지가 빌드 시점에 정적으로 생성됩니다.

## 실행

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # 배포 전 빌드 확인
```

## 내용 수정

화면에 나오는 내용은 모두 두 파일에 있습니다. 코드를 건드리지 않고 이 두 파일만 고치면 됩니다.

| 파일 | 내용 |
| --- | --- |
| `src/data/profile.ts` | 이름, 한 줄 소개, 자기소개, 연락처, 기술 스택, 경력 |
| `src/data/projects.ts` | 프로젝트 목록과 상세 (문제 → 접근 → 해결 → 결과 → 배운 점) |

- 이력서: `public/resume.pdf`에 파일을 넣으면 "이력서 다운로드" 버튼이 동작합니다. 쓰지 않으려면 `profile.ts`에서 `resumeUrl`을 지우세요.
- 프로젝트를 추가하면 `/projects/{slug}` 상세 페이지가 자동으로 생깁니다.

## 구성

- `GET /about` 같은 엔드포인트 라벨: 섹션마다 붙는 백엔드 콘셉트 포인트
- Human ⇄ JSON 토글 (헤더 오른쪽): 같은 데이터를 API 응답 형태로 보여줌 (`src/components/Section.tsx`, `JsonView.tsx`)
- 라이트/다크 모드: OS 설정을 따르고, 직접 바꾸면 브라우저에 저장됨

## 배포 (Vercel)

1. GitHub 저장소에 푸시
2. [vercel.com](https://vercel.com)에서 GitHub로 로그인 → **Add New Project** → 저장소 선택 → **Deploy**
3. 이후에는 `main` 브랜치에 푸시할 때마다 자동으로 배포됩니다.
