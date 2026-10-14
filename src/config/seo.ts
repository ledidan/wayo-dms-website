export const SITE_URL = 'https://www.wayo.vn';

export const seoPages = {
  home: {
    path: '/',
    title: 'Wayo DMS | Distribution Management Software',
    description: 'Wayo DMS giúp doanh nghiệp quản lý nhà phân phối, đội ngũ bán hàng, đơn hàng, tồn kho và độ phủ điểm bán trên một nền tảng.',
  },
  downloads: {
    path: '/tai-ung-dung',
    title: 'Tải ứng dụng Wayo DMS | iOS & Android',
    description: 'Tải Wayo DMS cho iPhone và Android. Xem hướng dẫn cài đặt, đăng nhập và kết nối công việc của đội ngũ bán hàng trên điện thoại.',
  },
} as const;

export type SeoPage = (typeof seoPages)[keyof typeof seoPages];

export function getPageSeo(pathname: string): SeoPage {
  return pathname.replace(/\/$/, '') === seoPages.downloads.path ? seoPages.downloads : seoPages.home;
}

export function getStructuredData(page: SeoPage) {
  const canonical = `${SITE_URL}${page.path}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Wayo',
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/images/wayo-logo.png`,
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: 'Wayo DMS',
        inLanguage: 'vi',
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: page.title,
        description: page.description,
        inLanguage: 'vi',
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
      ...(page.path === '/' ? [{
        '@type': 'SoftwareApplication',
        name: 'Wayo DMS',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: canonical,
        description: page.description,
        publisher: { '@id': `${SITE_URL}/#organization` },
      }] : [{
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Tải ứng dụng', item: canonical },
        ],
      }]),
    ],
  };
}

export function getSeoMeta(page: SeoPage) {
  return [
    ['name', 'description', page.description],
    ['name', 'robots', 'index, follow, max-image-preview:large'],
    ['property', 'og:type', 'website'],
    ['property', 'og:site_name', 'Wayo DMS'],
    ['property', 'og:locale', 'vi_VN'],
    ['property', 'og:title', page.title],
    ['property', 'og:description', page.description],
    ['property', 'og:url', `${SITE_URL}${page.path}`],
    ['property', 'og:image', `${SITE_URL}/images/wayo-dashboard-desktop.jpg`],
    ['property', 'og:image:secure_url', `${SITE_URL}/images/wayo-dashboard-desktop.jpg`],
    ['property', 'og:image:type', 'image/jpeg'],
    ['property', 'og:image:width', '1440'],
    ['property', 'og:image:height', '1000'],
    ['property', 'og:image:alt', 'Giao diện dashboard Wayo DMS trên máy tính'],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:title', page.title],
    ['name', 'twitter:description', page.description],
    ['name', 'twitter:image', `${SITE_URL}/images/wayo-dashboard-desktop.jpg`],
    ['name', 'twitter:image:alt', 'Giao diện dashboard Wayo DMS trên máy tính'],
  ] as const;
}

export function renderSeoHead(page: SeoPage): string {
  const escape = (value: string) => value.replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]!);
  return [
    `<title>${escape(page.title)}</title>`,
    ...getSeoMeta(page).map(([attribute, key, value]) => `<meta ${attribute}="${key}" content="${escape(value)}" />`),
    `<link rel="canonical" href="${SITE_URL}${page.path}" />`,
    `<script id="wayo-structured-data" type="application/ld+json">${JSON.stringify(getStructuredData(page)).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ');
}
