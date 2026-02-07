// ダッシュボード設定ファイル
// 管理画面（admin.html）から設定を変更できます

window.DASHBOARD_CONFIG = {
  brand: {
    name: 'BAR MAGUROPHONE',
    sidebarTitle: 'MAGUROPHONE',
    footerText: '深海BAR MAGUROPHONE 🐟🎧',
    footerSubText: '単推し・最推し様・メンシプ様募集中です',
    footerNote: 'ファンマ: 🐟🎧',
    pageTitle: '深海BAR MAGUROPHONE - 特典管理',
    loadingEmoji: '🐟',
    loadingText: 'Loading...'
  },

  colors: {
    deepBlue: '#0a1628',
    oceanTeal: '#1b4965',
    lightBlue: '#8ab4f8',
    amber: '#d4a574',
    accent: '#c1121f',
    gold: '#ffd700'
  },

  fonts: {
    display: "'Playfair Display', serif",
    displayUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap',
    body: "'Yu Gothic Medium', 'YuGothic', 'Inter', sans-serif",
    bodyUrl: ''
  },

  images: {
    headerDesktop: './header.png',
    headerMobile: './header-mobile.png',
    medals: [
      './medal-1st.jpg',
      './medal-2nd.jpg',
      './medal-3rd.jpg'
    ]
  },

  sheets: {
    spreadsheetId: '1kOuigqrKwgyrCJDN448SRDZCFj4urliA5iet4nRtH08',
    dataSheetName: 'data',
    iconSheetName: '枠内アイコン',
    ranges: {
      ranking: 'A2:D5',
      goals: 'A8:B12',
      benefits: 'G2:K12',
      rights: 'A15:I1000'
    },
    refreshIntervalMs: 300000
  },

  views: [
    { id: 'home', label: 'Home', icon: '🏠', enabled: true },
    { id: 'menu', label: 'Menu', icon: '🍾', enabled: true },
    { id: 'rights', label: 'ボトルキープ', icon: '👥', enabled: true, title: '🍾 ボトルキープ一覧' },
    { id: 'icons', label: '枠内アイコン', icon: '🖼️', enabled: true, title: '🖼️ 枠内アイコン' }
  ],

  benefitTiers: [
    { key: '5k', icon: '🎵', columnIndex: 1, displayTemplate: '強制リクエスト: {value}曲' },
    { key: '10k', icon: '🎮', columnIndex: 2, displayTemplate: '権利: {value}時間分' },
    { key: '20k', icon: '💬', columnIndex: 3, displayTemplate: 'オープンチャット招待済', isBoolean: true },
    { key: '30k', icon: '🎤', columnIndex: 4, displayTemplate: 'アカペラ音源獲得: {value}曲' },
    { key: '40k', icon: '⚡', columnIndex: 5, displayTemplate: '強制リクエスト: {value}曲' },
    { key: '50k', icon: '🏆', columnIndex: 6, displayTemplate: 'ミックス音源獲得: {value}曲' },
    { key: 'メンバーシップ', icon: '👑', columnIndex: 7, displayTemplate: '月内リクエスト対応中', isMembership: true }
  ],

  home: {
    rankingTitle: 'Ranking',
    pointsLabel: '歌推しPt',
    targetsTitle: 'Targets',
    targetLabels: ['今旬の目標', '今月の目標'],
    faq: {
      title: '📝 FAQ・注意事項',
      items: [
        { question: '特典の使用方法は？', answer: '枠内でリクエストするか、XのDMでお知らせください。' },
        { question: '10k以上の特典について', answer: '永続権利です。月が替わっても消えることがありません。' },
        { question: 'メンバーシップ特典について', answer: 'メンバーシップ特典で得られた10ｋ及び20ｋ特典は、それぞれの箇所に合算して記載しています。' }
      ]
    }
  },

  menu: {
    title: 'Menu'
  },

  ui: {
    errorTitle: 'エラー',
    errorMessage: 'データの読み込みに失敗しました。しばらくしてから再度お試しください。',
    retryButton: '再読み込み',
    refreshButton: '更新',
    lastUpdate: '最終更新',
    iconLoading: 'アイコンデータを読み込み中...',
    iconEmpty: 'アイコンデータがありません',
    iconNoImages: 'アイコンがありません',
    userListTitle: '獲得者一覧',
    userIconTitle: '{user} のアイコン',
    searchPlaceholder: '🔍 名前で検索...',
    specialRightLabel: 'Special権利',
    imageError: '画像エラー'
  },

  admin: {
    password: 'CSadmin'
  }
}
