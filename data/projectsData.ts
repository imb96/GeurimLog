interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Humming',
    description: `당신이 흥얼거리고 있는 노래가 기억나지 않나요? 허밍을 통해 쉽게 찾아보세요. 바로 노래를 들을 수 있습니다.`,
    imgSrc: '/static/images/Humming.png',
    href: 'https://humming.vercel.app/',
  },
  {
    title: 'Pickple',
    description: `같이 농구할 사람을 찾고계신가요? 픽플에서 쉽게 찾아보세요. 잘 맞는 사람들끼리 크루를 결성할수도 있습니다.`,
    imgSrc: '/static/images/pickple.png',
    href: 'https://pickple.kr/',
  },
  {
    title: 'Nirvana',
    description: `니르바나는 지속적인 자극적 컨텐츠 노출로 인해 생긴 현대인들의 정신적 피로를 명상과 공유를 통해 치유하자는 목적을 가지고 만들어졌습니다.`,
    imgSrc: '/static/images/nirvana.png',
    href: 'https://nirvana-gidong.netlify.app/',
  },
]

export default projectsData
