import { useState } from 'react'

/* ─────────────────────────────────────────
   共通コンポーネント
───────────────────────────────────────── */
const Step = ({ number, children }) => (
  <div className="flex gap-3 mb-4">
    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-light-blue/20 border border-light-blue/50 text-light-blue text-sm flex items-center justify-center font-bold">
      {number}
    </span>
    <div className="text-gray-300 text-sm leading-relaxed pt-0.5">{children}</div>
  </div>
)

const Note = ({ children, type = 'info' }) => {
  const styles = {
    info:   'border-light-blue/40 bg-light-blue/5 text-light-blue',
    warn:   'border-amber/40 bg-amber/5 text-amber',
    danger: 'border-red-400/40 bg-red-400/5 text-red-400',
  }
  const labels = { info: '補足', warn: '注意', danger: '重要' }
  return (
    <div className={`rounded-lg border p-3 mt-4 ${styles[type]}`}>
      <p className="text-xs font-bold mb-1">{labels[type]}</p>
      <p className="text-gray-300 text-xs leading-relaxed">{children}</p>
    </div>
  )
}

const Img = ({ src, alt, caption }) => {
  const [failed, setFailed] = useState(false)
  return (
    <figure className="my-4">
      {failed ? (
        <div className="rounded-xl border border-dashed border-light-blue/30 bg-black/20 flex flex-col items-center justify-center gap-2 py-10 text-gray-500">
          <span className="text-2xl">🖼️</span>
          <span className="text-xs">{caption ?? alt}</span>
          <span className="text-xs opacity-50">（画像準備中）</span>
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden border border-light-blue/20 bg-black/30">
          <img src={src} alt={alt} className="w-full h-auto block" onError={() => setFailed(true)} />
        </div>
      )}
      {caption && <figcaption className="text-center text-xs text-gray-500 mt-2">{caption}</figcaption>}
    </figure>
  )
}

const H3 = ({ children }) => (
  <h3 className="text-light-blue font-bold text-sm mt-6 mb-3 border-b border-light-blue/20 pb-1">{children}</h3>
)

const Cell = ({ range, label, desc }) => (
  <div className="glass-effect rounded-lg border border-light-blue/20 p-3 flex gap-3 items-start">
    <code className="flex-shrink-0 bg-black/40 text-amber px-2 py-0.5 rounded text-xs mt-0.5 whitespace-nowrap">{range}</code>
    <div>
      {label && <p className="text-sm font-bold text-gray-200">{label}</p>}
      <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
    </div>
  </div>
)

const SizeBox = ({ width, height, label }) => (
  <div className="flex flex-col items-center gap-2">
    <div
      className="border-2 border-dashed border-amber/50 bg-amber/5 rounded flex items-center justify-center text-amber text-xs font-bold"
      style={{ width: Math.min(width / 8, 240) + 'px', height: Math.min(height / 8, 120) + 'px' }}
    >
      {width} × {height}px
    </div>
    <span className="text-gray-400 text-xs">{label}</span>
  </div>
)

/* ─────────────────────────────────────────
   タブ2: 管理画面の操作方法
───────────────────────────────────────── */
const ADMIN_TABS_DATA = [
  {
    name: 'ブランディング',
    img: './manual/admin-branding-tab.png',
    items: [
      { label: 'サイト名・サイドバータイトル・ページタイトル', desc: 'ヘッダーやブラウザタブに表示される各種名称を設定します。' },
      { label: 'タイトル表示・グラデーション', desc: 'ヘッダーへのサイト名表示のON/OFFやグラデーション方向を設定します。' },
      { label: 'フッター設定', desc: 'フッターに表示するメインテキスト・サブテキスト・注記の3行を設定します。' },
      { label: 'ローディング絵文字・テキスト', desc: 'ページ読み込み中に表示される絵文字とテキストを変更できます。' },
      { label: 'ヘッダー画像（PC用・モバイル用）', desc: 'Google DriveのURLまたはローカルパスを入力します。' },
      { label: 'フォント設定', desc: 'タイトル用フォント・本文フォントをプリセットまたはカスタムで設定します。Google Fontsにも対応。' },
    ],
  },
  {
    name: 'カラー',
    img: './manual/admin-colors-tab.png',
    items: [
      { label: 'ページ背景（メイン・中間）', desc: '未設定の場合はデフォルトのDeep Blue / Ocean Tealが使われます。' },
      { label: 'ヘッダーグラデーション', desc: '中央色と両端色を個別に設定できます。' },
      { label: 'テキスト・カードボーダー色', desc: 'メインテキスト・アクセントテキスト・カードのボーダー色を設定します。' },
      { label: '1位カード強調色', desc: 'ランキング1位のカードに使われる強調色です。' },
    ],
  },
  {
    name: 'Google Sheets',
    img: './manual/admin-sheets-tab.png',
    items: [
      { label: 'スプレッドシートID', desc: 'データを読み込むGoogleスプレッドシートのIDを入力します。' },
      { label: 'シート名（5種類）', desc: '目標管理・ランキング / 特典管理 / 特典内容 / 特典履歴 / 枠内アイコン の各シート名を設定します。シート名を変更した場合はこちらも合わせて変更してください。' },
      { label: 'セル範囲（5種類）', desc: '各データの読み込みセル範囲を設定します。通常は変更不要です。' },
      { label: '自動更新間隔', desc: 'サイトが自動的にデータを再読み込みする間隔（分）を設定します。デフォルトは5分。' },
    ],
  },
  {
    name: 'ビュー管理',
    img: './manual/admin-views-tab.png',
    items: [
      { label: '表示・非表示の切り替え', desc: '各ページ（ホーム・メニュー・権利者リスト・枠内アイコン等）をON/OFFできます。' },
      { label: 'ラベル・アイコンの変更', desc: 'ナビゲーションに表示されるページ名と絵文字アイコンを変更できます。' },
      { label: '表示順の変更', desc: '上下ボタンでナビゲーションの並び順を変更できます。' },
    ],
  },
  {
    name: '特典ティア',
    img: './manual/admin-tiers-tab.png',
    items: [
      { label: 'ティアの追加・削除・並び替え', desc: '特典の段階（ティア）を自由に増減できます。' },
      { label: 'キー名', desc: 'スプレッドシートの「特典内容」シートのA列と一致させる必要があります。' },
      { label: '列インデックス', desc: '「特典管理」シートの何列目（B列=1）のデータと対応するかを指定します。0はメニュー表示のみ。' },
      { label: '表示テンプレート', desc: '{value} にスプレッドシートの値が入ります（例: 「強制リクエスト: {value}曲」）。' },
      { label: 'isBoolean', desc: 'ONにすると数値ではなく固定テキストで表示します（「済」など）。' },
    ],
  },
  {
    name: 'コンテンツ',
    img: './manual/admin-content-tab.png',
    items: [
      { label: 'ホームビュー設定', desc: 'ランキングタイトル・ポイント単位（例: 歌推しPt）・目標セクションのラベルなどを設定します。' },
      { label: 'FAQ', desc: 'サイト上に表示するよくある質問を追加・編集・削除できます。' },
      { label: 'UIテキスト', desc: 'エラー文・更新ボタン・検索プレースホルダーなどの各種テキストを変更できます。' },
    ],
  },
  {
    name: 'エフェクト',
    img: './manual/admin-effects-tab.png',
    items: [
      { label: 'アイコン揺らぎ', desc: 'Menu・ボトルキープページのアイコンをふわふわ揺らすアニメーションのON/OFFです。' },
      { label: 'パーティクル種類', desc: '泡・星・ハート・なし から選択できます。' },
      { label: '方向', desc: 'パーティクルが流れる方向（下から上 / 上から下）を設定します。' },
      { label: 'サイズ', desc: 'パーティクルの大きさを極小〜極大の5段階で設定します。' },
      { label: '濃さ', desc: 'パーティクルの表示濃度をスライダーで調整します。' },
      { label: 'パーティクルの色', desc: 'カラーピッカーでカスタムカラーを設定できます。「デフォルトに戻す」でLight Blue色に戻ります。' },
    ],
  },
  {
    name: 'デプロイ',
    img: './manual/admin-deploy-tab.png',
    items: [
      { label: 'デプロイ実行', desc: '現在の設定をGitHubリポジトリに保存し、サイトに反映します。ブラウザの設定変更（自動保存）をGitHubに確定するには必ずこちらをクリックしてください。' },
      { label: 'GitHubから最新設定を取得', desc: 'GitHubに保存されている最新の設定をローカルに読み込みます。' },
    ],
  },
]

const TabAdminPanel = () => {
  const [selected, setSelected] = useState(0)
  const tab = ADMIN_TABS_DATA[selected]

  return (
    <div>
      <p className="text-gray-300 text-sm mb-6">
        管理画面は、専用URLの末尾を <span className="text-amber font-bold">/admin</span> に変更するとアクセスできます。
      </p>

      <H3>設定の基本的な流れ</H3>
      <Step number="1">管理画面を開く</Step>
      <Step number="2">設定したいタブを選択して値を変更</Step>
      <Step number="3">値を変更すると自動的にブラウザに保存されます（「保存しました」と表示）</Step>
      <Step number="4">「デプロイ」タブ →「デプロイ実行」ボタンでGitHubに確定</Step>

      <Note type="warn">
        設定はブラウザにのみ保存されます。「デプロイ実行」しないと他のデバイスや環境には反映されません。必ず「デプロイ」タブから「デプロイ実行」してください。
      </Note>

      <H3>各タブの説明</H3>
      <div className="flex flex-wrap gap-2 mb-4">
        {ADMIN_TABS_DATA.map((t, i) => (
          <button
            key={t.name}
            onClick={() => setSelected(i)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              selected === i
                ? 'bg-light-blue/20 border-light-blue text-light-blue'
                : 'border-light-blue/20 text-gray-400 hover:border-light-blue/40'
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className="glass-effect rounded-xl border border-light-blue/20 p-4">
        <p className="text-amber font-bold text-sm mb-3">{tab.name}</p>
        <ul className="space-y-3 mb-4">
          {tab.items.map(item => (
            <li key={item.label} className="text-sm">
              <span className="text-gray-200 font-bold">・{item.label}</span>
              <span className="text-gray-400 text-xs block ml-3 mt-0.5">{item.desc}</span>
            </li>
          ))}
        </ul>
        <Img src={tab.img} alt={`管理画面 ${tab.name}タブ`} caption={`${tab.name} タブ`} />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   タブ3: スプレッドシートの記入・管理方法
───────────────────────────────────────── */
const SS_SHEET_DATA = [
  {
    name: '目標管理・ランキング',
    img: './manual/ss-ranking-sheet.png',
    content: () => (
      <>
        <div className="space-y-3">
          <Cell range="D2:G5" label="ランキングデータ（4列）"
            desc="D列: 順位 / E列: 名前 / F列: ポイント / G列: メダル画像URL（Google DriveのURL）" />
          <Cell range="A2:B10" label="月間目標（2列・最大8項目）"
            desc="1行目（A2:B2）はヘッダー行のため読み込み時にスキップされます。A3以降の A列 = 「今旬の目標」欄に表示する各項目テキスト / B列 = 「今月の目標」欄に表示する各項目テキスト。" />
        </div>
      </>
    ),
  },
  {
    name: '特典内容',
    img: './manual/ss-benefits-content-sheet.png',
    content: () => (
      <>
        <div className="space-y-3">
          <Cell range="A3:E20（最大）" label="特典説明（5列）"
            desc="A列: ティアキー（管理画面「特典ティア」のキー名と一致させる） / B列: タイトル / C列: 簡易説明 / D列: 詳細説明 / E列: 記録機能（チェックボックス）" />
        </div>
        <Note type="warn">
          A列のティアキーは管理画面「特典ティア」タブのキー名と完全一致させてください。一致しないと特典が表示されません。
        </Note>
      </>
    ),
  },
  {
    name: '特典管理',
    img: './manual/ss-benefits-sheet.png',
    content: () => (
      <div className="space-y-3">
        <Cell range="A2:I1000（最大）" label="権利者リスト（9列）"
          desc="A列: ユーザー名 / B列以降: 各ティアの達成値（何列目がどのティアかは管理画面「特典ティア」の「列インデックス」で設定）" />
      </div>
    ),
  },
  {
    name: '特典履歴',
    img: './manual/ss-history-sheet.png',
    content: () => (
      <div className="space-y-3">
        <Cell range="A3:D1000（最大）" label="履歴データ（4列）"
          desc="A列: 年月（yyyymm形式、例: 202602） / B列: ユーザー名 / C列: ティアキー / D列: 特典内容（テキスト）" />
      </div>
    ),
  },
  {
    name: '枠内アイコン',
    img: './manual/ss-icon-sheet.png',
    content: () => (
      <div className="space-y-3">
        <Cell range="A列" label="月またはカテゴリ"
          desc="すべて6桁の数字（yyyymm）なら月別表示。それ以外の文字列（例: メンバーシップ限定、月間トップリスナー）ならカテゴリ別表示になります。" />
        <Cell range="B列" desc="ユーザー名" />
        <Cell range="C列" desc="Google Drive の画像URL（共有リンク）" />
      </div>
    ),
  },
]

const TabSpreadsheetEntry = () => {
  const [selected, setSelected] = useState(0)
  const sheet = SS_SHEET_DATA[selected]
  const SheetContent = sheet.content

  return (
    <div>
      <p className="text-gray-300 text-sm mb-4">
        スプレッドシートは <span className="text-amber font-bold">5つのシート</span> で構成されています。
        シート名は管理画面の「Google Sheets」タブで変更できます。
      </p>

      {/* シート選択ボタン */}
      <div className="flex flex-wrap gap-2 mb-4">
        {SS_SHEET_DATA.map((s, i) => (
          <button
            key={s.name}
            onClick={() => setSelected(i)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              selected === i
                ? 'bg-light-blue/20 border-light-blue text-light-blue'
                : 'border-light-blue/20 text-gray-400 hover:border-light-blue/40'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* 選択シートの詳細 */}
      <div className="glass-effect rounded-xl border border-light-blue/20 p-4">
        <p className="text-amber font-bold text-sm mb-3">{sheet.name}</p>
        <Img src={sheet.img} alt={`${sheet.name}シートの記入例`} caption={`${sheet.name} — 記入例`} />
        <SheetContent />
      </div>

      <Note type="info">
        スプレッドシートはGoogleが自動保存します。サイトへの反映は最大5分ほどかかります。サイト右上の更新ボタンで即時反映できます。
      </Note>
    </div>
  )
}

/* ─────────────────────────────────────────
   タブ: アイコン・メダル画像の設定（SS）
───────────────────────────────────────── */
const TabImageShare = () => (
  <div>
    <p className="text-gray-300 text-sm mb-6">
      枠内アイコンとランキングのメダル画像は<span className="text-amber font-bold">スプレッドシートで管理</span>します。Google DriveにアップロードしたURLをシートに貼り付けるだけで反映されます。
    </p>

    <H3>① Google Drive へのアップロードと共有設定（共通手順）</H3>
    <Step number="1">写真やCanvaなどから、画像をGoogle Driveにアップロード</Step>
    <Step number="2">アップロードした画像を右クリック →「共有」→「リンクをコピー」</Step>
    <Step number="3">「制限付き」と表示されている場合は「リンクを知っている全員」に変更して「完了」</Step>
    <Step number="4">コピーしたURLを以下の手順で使用する</Step>
    <Note type="info">
      Canvaで作成した画像はCanvaから直接Google Driveに書き出せます（「共有」→「保存」→「Googleドライブ」）。スマートフォンの写真など、どこから用意しても問題ありません。
    </Note>
    <Img src="./manual/gdrive-share.png" alt="Google Drive 共有ダイアログ" caption="「リンクを知っている全員」に設定する" />

    <Note type="danger">
      共有設定が「制限付き」のままだと画像が表示されません。必ず「リンクを知っている全員（閲覧者）」に変更してください。
    </Note>

    <H3>② 枠内アイコンの設定</H3>
    <Step number="1">①の手順でURLをコピー</Step>
    <Step number="2">スプレッドシートの「枠内アイコン」シートを開く</Step>
    <Step number="3">該当行の C列 にURLを貼り付け（自動保存）</Step>

    <H3>③ ランキングのメダル画像の設定</H3>
    <Step number="1">①の手順でURLをコピー</Step>
    <Step number="2">スプレッドシートの「目標管理・ランキング」シートを開く</Step>
    <Step number="3">該当ランキング行の G列 にURLを貼り付け（自動保存）</Step>

    <Note type="info">
      Google DriveのURLはそのまま貼り付けてください。システムが自動的に表示用URLに変換します。
    </Note>
  </div>
)

/* ─────────────────────────────────────────
   メインコンポーネント
───────────────────────────────────────── */
const TAB_GROUPS = [
  {
    label: 'スプレッドシート',
    tabs: [
      { id: 'ss-entry',  label: 'スプレッドシートへの記入',   short: 'SS記入',  component: TabSpreadsheetEntry },
      { id: 'img-share', label: 'アイコン・メダル画像の設定', short: '画像(SS)', component: TabImageShare },
    ],
  },
  {
    label: '管理画面',
    tabs: [
      { id: 'admin', label: '管理画面の使い方', short: '管理画面', component: TabAdminPanel },
    ],
  },
]

const TABS = TAB_GROUPS.flatMap(g => g.tabs)

function ManualApp() {
  const [activeTabId, setActiveTabId] = useState(TABS[0].id)
  const activeTab = TABS.find(t => t.id === activeTabId)
  const ActiveComponent = activeTab.component

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-3xl mx-auto">

        <header className="text-center py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-ocean-teal via-light-blue to-amber mb-3">
            管理マニュアル
          </h1>
          <p className="text-gray-400 text-sm">ColorSing ランキング＆特典管理ページ</p>
        </header>

        <nav className="mb-6 space-y-2">
          {TAB_GROUPS.map((group, gi) => (
            <div key={group.label}>
              {/* グループラベル */}
              <p className="text-xs font-bold text-gray-500 mb-1.5 px-1 tracking-wide">
                {group.label}
              </p>
              {/* タブボタン群 */}
              <div className="flex flex-wrap gap-2">
                {group.tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTabId(tab.id)}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all border ${
                      activeTabId === tab.id
                        ? 'bg-light-blue/20 border-light-blue text-light-blue'
                        : 'border-light-blue/20 text-gray-400 hover:border-light-blue/40 hover:text-gray-200'
                    }`}
                  >
                    <span className="hidden md:inline">{tab.label}</span>
                    <span className="md:hidden">{tab.short}</span>
                  </button>
                ))}
              </div>
              {/* グループ間区切り線 */}
              {gi < TAB_GROUPS.length - 1 && (
                <hr className="border-light-blue/15 mt-3" />
              )}
            </div>
          ))}
        </nav>

        <section className="glass-effect rounded-xl border border-light-blue/30 p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-amber mb-6">
            {activeTab.label}
          </h2>
          <ActiveComponent />
        </section>

        <footer className="text-center py-8 text-gray-500 text-xs">
          <p>ColorSing LP Manual</p>
        </footer>

      </div>
    </div>
  )
}

export default ManualApp
