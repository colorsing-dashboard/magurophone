// ダッシュボード設定ファイル
// 管理画面（admin.html）から設定を変更できます

window.DASHBOARD_CONFIG = {
  brand: {
    name: '',
    sidebarTitle: '',
    footerText: '',
    footerSubText: '',
    footerNote: '',
    pageTitle: '',
    loadingEmoji: '',
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

  images: {
    headerDesktop: '',
    headerMobile: '',
    medals: []
  },

  sheets: {
    spreadsheetId: '',
    dataSheetName: 'data',
    iconSheetName: '',
    ranges: {
      ranking: 'A2:D5',
      goals: 'A8:B12',
      benefits: 'G2:K12',
      rights: 'A15:I1000'
    },
    refreshIntervalMs: 300000
  },

  views: [
    { id: 'home', label: 'Home', icon: '', enabled: true },
    { id: 'menu', label: 'Menu', icon: '', enabled: true },
    { id: 'rights', label: '', icon: '', enabled: true, title: '' },
    { id: 'icons', label: '', icon: '', enabled: false, title: '' }
  ],

  benefitTiers: [
    { key: '5k', icon: '', columnIndex: 1, displayTemplate: '{value}' },
    { key: '10k', icon: '', columnIndex: 2, displayTemplate: '{value}' }
  ],

  home: {
    rankingTitle: 'Ranking',
    pointsLabel: '',
    targetsTitle: 'Targets',
    targetLabels: ['', ''],
    faq: {
      title: '',
      items: []
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
    searchPlaceholder: '名前で検索...',
    specialRightLabel: 'Special',
    imageError: '画像エラー'
  },

  admin: {
    password: ''
  }
}
