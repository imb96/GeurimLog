export interface JsonLdProps {
  type?: 'WebSite' | 'Blog' | 'BlogPosting' | 'Person'
  data?: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default function JsonLd({ type = 'WebSite', data }: JsonLdProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'WebSite':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: "Geurim's Blog",
          alternateName: 'Geurim Log',
          url: 'https://geurim-log.vercel.app',
          description: '프론트엔드 개발자 그림의 기술 블로그',
          author: {
            '@type': 'Person',
            name: 'Geurim',
            url: 'https://geurim-log.vercel.app/about',
          },
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: 'https://geurim-log.vercel.app/search?q={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
          },
        }
      case 'Blog':
        return {
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: "Geurim's Blog",
          url: 'https://geurim-log.vercel.app/blog',
          description: '프론트엔드 개발자 그림의 기술 블로그',
          author: {
            '@type': 'Person',
            name: 'Geurim',
          },
        }
      case 'BlogPosting':
        return {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          ...data,
        }
      case 'Person':
        return {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Geurim',
          url: 'https://geurim-log.vercel.app/about',
          sameAs: ['https://github.com/imb96', 'https://www.linkedin.com/in/geurim'],
          jobTitle: 'Frontend Developer',
          worksFor: {
            '@type': 'Organization',
            name: 'Freelance',
          },
        }
      default:
        return {}
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData()) }}
    />
  )
}
