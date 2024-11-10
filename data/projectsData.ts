interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Pickple',
    description: `같이 농구할 사람을 찾고계신가요? 픽플에서 쉽게 찾아보세요. 잘 맞는 사람들끼리 크루를 결성할수도 있습니다.`,
    imgSrc: '/static/images/pickple.png',
    href: 'https://github.com/Java-and-Script/pickple-front',
  },
  {
    title: 'Nirvana',
    description: `니르바나는 지속적인 자극적 컨텐츠 노출로 인해 생긴 현대인들의 정신적 피로를 명상과 공유를 통해 치유하자는 목적을 가지고 만들어졌습니다.`,
    imgSrc: '/static/images/nirvana.png',
    href: 'https://nirvana-gidong.netlify.app/',
  },
  {
    title: 'Humming',
    description: `당신이 흥얼거리고 있는 노래가 기억나지 않나요? 허밍을 통해 쉽게 찾아보세요. 바로 노래를 들을 수 있습니다.`,
    imgSrc: '/static/images/humming.png',
    href: 'https://humming.vercel.app/',
  },
  {
    title: 'Footy',
    description: `잉글랜드 프리미어리그와 챔피언스리그의 팀 순위와 경기 일정을 확인하고 실시간으로 경기 결과를 확인할 수 있는 웹사이트입니다.`,
    imgSrc: '/static/images/footy.png',
    href: 'https://footy-schedule.vercel.app/',
  },
  {
    title: 'React-Hook-Scroll',
    description:
      'React 프로젝트에서 사용할 수 있는 scroll UI 오픈소스 라이브러리입니다. NPM에 배포되어 있습니다.',
    imgSrc: '/static/images/react-hook-scroll.png',
    href: 'https://www.npmjs.com/package/react-hook-scroll',
  },
]

export default projectsData
