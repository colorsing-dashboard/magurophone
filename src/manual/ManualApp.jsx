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
   タブ1: スプレッドシートの共有方法
───────────────────────────────────────── */
const TabSpreadsheetShare = () => (
  <div>
    <p className="text-gray-300 text-sm mb-6">
      サイトにデータを表示するには、Googleスプレッドシートのスプレッドシート ID を管理画面に登録する必要があります。
    </p>

    <H3>① スプレッドシート ID の確認</H3>
    <p className="text-gray-300 text-sm mb-3">
      スプレッドシートを開いたときのURLの、<span className="text-amber font-bold">d/ から /edit の間</span>の文字列がスプレッドシート ID です。
    </p>
    <Img src="./manual/ss-url-id.png" alt="スプレッドシートURLでIDの場所を示す図" caption="赤枠部分がスプレッドシート ID" />

    <H3>② スプレッドシートの閲覧権限を設定</H3>
    <p className="text-gray-300 text-sm mb-3">
      IDを登録する前に、スプレッドシートを「リンクを知っている全員が閲覧可能」に設定してください。
    </p>
    <Step number="1">スプレッドシート右上の「共有」ボタンをクリック</Step>
    <Step number="2">「リンクを知っている全員」を選択し、権限を「閲覧者」に設定</Step>
    <Step number="3">「完了」をクリック</Step>
    <Img src="./manual/gdrive-share.png" alt="Googleスプレッドシートの共有設定ダイアログ" caption="「制限付き」→「リンクを知っている全員」に変更する" />

    <H3>③ 管理画面に ID を登録</H3>
    <Step number="1">管理画面（あなた専用URLの末尾を <span className="text-amber">/admin</span> に変更してアクセス）を開く</Step>
    <Step number="2">「Google Sheets」タブを選択</Step>
    <Step number="3">「スプレッドシート ID」欄にコピーした ID を貼り付け</Step>
    <Step number="4">「設定を保存」ボタンをクリック</Step>
    <Img src="./manual/admin-sheets-tab.png" alt="管理画面 Google Sheetsタブ" caption="Google Sheets タブ" />

    <Note type="warn">
      共有設定が「リンクを知っている全員（閲覧者）」になっていないと、サイトにデータが表示されません。
    </Note>
  </div>
)

/* ─────────────────────────────────────────
   タブ2: 管理画面の操作方法
───────────────────────────────────────── */
const ADMIN_TABS_DATA = [
  {
    name: 'ブランディング',
    desc: 'サイト名・サイドバータイトル・フォント・ヘッダー画像・ローディング絵文字などを設定します。',
    img: './manual/admin-branding-tab.png',
  },
  {
    name: 'カラー',
    desc: 'ページ背景・ヘッダーグラデーション・テキスト色・カードボーダー・1位カード色などを設定します。',
    img: './manual/admin-colors-tab.png',
  },
  {
    name: 'Google Sheets',
    desc: 'スプレッドシート ID を登録します。サイトのデータソースとなるスプレッドシートを指定するタブです。',
    img: './manual/admin-sheets-tab.png',
  },
  {
    name: 'ビュー管理',
    desc: '各ページ（ホーム・メニュー・権利者リスト・枠内アイコン等）の表示・非表示を切り替えます。',
    img: './manual/admin-views-tab.png',
  },
  {
    name: '特典ティア',
    desc: '特典の段階（ティア）ごとの名称・アイコン・しきい値を設定します。',
    img: './manual/admin-tiers-tab.png',
  },
  {
    name: 'コンテンツ',
    desc: 'FAQや固定テキストなどのページ内コンテンツを編集します。',
    img: './manual/admin-content-tab.png',
  },
  {
    name: 'エフェクト',
    desc: 'パーティクルエフェクト（泡・星・ハート・なし）の種類・サイズ・方向を設定します。',
    img: './manual/admin-effects-tab.png',
  },
  {
    name: 'デプロイ',
    desc: '設定をGitHubに保存（デプロイ）します。このタブで保存した設定はサイトリロード後も維持されます。',
    img: './manual/admin-deploy-tab.png',
  },
]

const TabAdminPanel = () => {
  const [selected, setSelected] = useState(0)
  const tab = ADMIN_TABS_DATA[selected]

  return (
    <div>
      <p className="text-gray-300 text-sm mb-6">
        管理画面は、あなた専用URLの末尾を <span className="text-amber font-bold">/admin</span> に変更するとアクセスできます。
        8つのタブで各種設定を行います。
      </p>

      <H3>設定の基本的な流れ</H3>
      <Step number="1">管理画面を開く</Step>
      <Step number="2">設定したい項目のタブを選択して値を変更</Step>
      <Step number="3">画面下部の「設定を保存」ボタンをクリック（ブラウザに一時保存）</Step>
      <Step number="4">「デプロイ」タブ → 「GitHubに保存」でサーバーに反映</Step>

      <Note type="warn">
        「設定を保存」だけではブラウザを閉じると設定が消える場合があります。必ず最後に「デプロイ」タブからGitHubに保存してください。
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
        <p className="text-amber font-bold text-sm mb-2">{tab.name}</p>
        <p className="text-gray-300 text-sm mb-3">{tab.desc}</p>
        <Img src={tab.img} alt={`管理画面 ${tab.name}タブ`} caption={`${tab.name} タブ`} />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   タブ3: スプレッドシートの記入・管理方法
───────────────────────────────────────── */
const TabSpreadsheetEntry = () => (
  <div>
    <p className="text-gray-300 text-sm mb-6">
      スプレッドシートには <span className="text-amber font-bold">「data」シート</span> と <span className="text-amber font-bold">「枠内アイコン」シート</span> の2種類があります。
    </p>

    <H3>data シート</H3>
    <Img src="./manual/ss-data-sheet.png" alt="dataシートのセル配置" caption="dataシート — 各セル範囲の役割" />

    <div className="space-y-3 mt-2">
      {[
        { range: 'A2:D5',    label: 'ランキング',     desc: '順位 / 名前 / ポイント / メダル画像URL（4列）' },
        { range: 'A8:B12',   label: '月間目標',       desc: 'ラベル / 値（2列）。ホームの目標進捗に反映。' },
        { range: 'G2:K12',   label: '特典説明',       desc: 'タイトル / 名前 / 説明 / アイコン / ラベル（5列）' },
        { range: 'A15: 以降', label: '権利者リスト', desc: '名前 / 各ティアの達成値など（列数はティア数に依存）' },
      ].map(r => (
        <div key={r.range} className="glass-effect rounded-lg border border-light-blue/20 p-3 flex gap-3 items-start">
          <code className="flex-shrink-0 bg-black/40 text-amber px-2 py-0.5 rounded text-xs mt-0.5">{r.range}</code>
          <div>
            <p className="text-sm font-bold text-gray-200">{r.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{r.desc}</p>
          </div>
        </div>
      ))}
    </div>

    <Note type="danger">
      セル範囲（A2:D5 など）の位置を変えると、サイトに正しく表示されなくなります。データの追加・編集は既存の範囲内で行ってください。範囲の変更が必要な場合はご連絡ください。
    </Note>

    <H3>枠内アイコン シート</H3>
    <Img src="./manual/ss-icon-sheet.png" alt="枠内アイコンシートの記入例" caption="枠内アイコンシート — 記入例" />

    <div className="space-y-3">
      {[
        { col: 'A列', desc: '月（yyyymm形式、例: 202601）またはカテゴリ名' },
        { col: 'B列', desc: 'ユーザー名' },
        { col: 'C列', desc: 'Google Drive の画像URL（共有リンク）' },
      ].map(r => (
        <div key={r.col} className="glass-effect rounded-lg border border-light-blue/20 p-3 flex gap-3 items-start">
          <code className="flex-shrink-0 bg-black/40 text-amber px-2 py-0.5 rounded text-xs mt-0.5">{r.col}</code>
          <p className="text-xs text-gray-400">{r.desc}</p>
        </div>
      ))}
    </div>

    <Note type="info">
      データはスプレッドシートを保存した時点で自動的に反映されます（Googleスプレッドシートは自動保存）。サイト側の更新は最大5分ほどかかる場合があります。サイト右上の更新ボタンで即時反映できます。
    </Note>
  </div>
)

/* ─────────────────────────────────────────
   タブ4: ヘッダー画像の作成方法
───────────────────────────────────────── */
const TabHeaderImage = () => (
  <div>
    <p className="text-gray-300 text-sm mb-6">
      ヘッダー画像は PC 用とモバイル用の2種類を用意します。縦横比が異なるため、別々に作成してください。
    </p>

    <H3>推奨サイズ</H3>
    <div className="flex flex-wrap gap-8 justify-center py-6">
      <SizeBox width={1920} height={600} label="PC用" />
      <SizeBox width={750} height={400} label="モバイル用" />
    </div>

    <div className="space-y-3 mt-2">
      {[
        { label: 'PC用',     size: '1920 × 600 px', note: '横長。デスクトップブラウザで表示される画像。' },
        { label: 'モバイル用', size: '750 × 400 px',  note: 'スマートフォンで表示される画像。PC用より縦方向に余裕があります。' },
      ].map(r => (
        <div key={r.label} className="glass-effect rounded-lg border border-light-blue/20 p-3">
          <p className="text-sm font-bold text-amber">{r.label} — {r.size}</p>
          <p className="text-xs text-gray-400 mt-1">{r.note}</p>
        </div>
      ))}
    </div>

    <H3>推奨フォーマット</H3>
    <ul className="space-y-1 text-sm text-gray-300">
      <li>・ JPG / PNG / WebP いずれも可</li>
      <li>・ ファイルサイズは 2MB 以下を推奨（読み込み速度に影響）</li>
    </ul>

    <H3>Canva で作成する場合</H3>
    <Step number="1">Canva（canva.com）にアクセスしてログイン</Step>
    <Step number="2">「カスタムサイズ」で幅・高さを入力してデザインを作成</Step>
    <Step number="3">デザイン完了後「共有」→「ダウンロード」→「JPG」または「PNG」を選択</Step>
    <Step number="4">ダウンロードしたファイルをGoogle Driveにアップロード（次のタブ参照）</Step>

    <Note type="info">
      ヘッダーの上にサイト名やサイドバーが重なって表示される場合があります。重要なデザイン要素は画像の端に配置しないようにするとバランスよく見えます。
    </Note>
  </div>
)

/* ─────────────────────────────────────────
   タブ5: 画像の共有方法
───────────────────────────────────────── */
const TabImageShare = () => (
  <div>
    <p className="text-gray-300 text-sm mb-6">
      サイトに表示する画像はすべてGoogle Driveにアップロードし、共有リンクを各所に設定します。
    </p>

    <H3>① Google Drive へのアップロードと共有設定（共通手順）</H3>
    <Step number="1">Google Drive を開き、画像ファイルをアップロード</Step>
    <Step number="2">アップロードした画像を右クリック →「共有」→「リンクをコピー」</Step>
    <Step number="3">「制限付き」と表示されている場合は「リンクを知っている全員」に変更してから「完了」</Step>
    <Step number="4">コピーしたリンクURLを各手順で使用する</Step>
    <Img src="./manual/gdrive-share.png" alt="Google Drive 共有ダイアログ" caption="「リンクを知っている全員」に設定する" />
    <Note type="danger">
      共有設定が「制限付き」のままだと、サイトに画像が表示されません。必ず「リンクを知っている全員（閲覧者）」に変更してください。
    </Note>

    <H3>② ヘッダー画像の設定（PC用・モバイル用）</H3>
    <Step number="1">①の手順でGoogle DriveのURLをコピー</Step>
    <Step number="2">管理画面の「ブランディング」タブを開く</Step>
    <Step number="3">「ヘッダー画像（PC用）」または「ヘッダー画像（モバイル用）」の入力欄にURLを貼り付け</Step>
    <Step number="4">「設定を保存」→「デプロイ」タブから「GitHubに保存」</Step>

    <H3>③ 枠内アイコンの設定</H3>
    <Step number="1">①の手順でGoogle DriveのURLをコピー</Step>
    <Step number="2">スプレッドシートの「枠内アイコン」シートを開く</Step>
    <Step number="3">該当行の C列 にURLを貼り付け</Step>
    <Step number="4">スプレッドシートは自動保存のため、数分後にサイトに反映される</Step>

    <H3>④ ランキングのメダル画像の設定</H3>
    <Step number="1">①の手順でGoogle DriveのURLをコピー</Step>
    <Step number="2">スプレッドシートの「data」シートを開く</Step>
    <Step number="3">ランキング行（A2:D5）の D列 にURLを貼り付け</Step>

    <Note type="info">
      Google DriveのURLはそのまま貼り付けてください。システムが自動的に表示用URLに変換します。
    </Note>
  </div>
)

/* ─────────────────────────────────────────
   メインコンポーネント
───────────────────────────────────────── */
const TABS = [
  { id: 'ss-share',   label: 'スプレッドシートの共有', short: 'SS共有',   component: TabSpreadsheetShare },
  { id: 'admin',      label: '管理画面の操作方法',     short: '管理画面', component: TabAdminPanel },
  { id: 'ss-entry',   label: 'スプレッドシートの記入', short: 'SS記入',   component: TabSpreadsheetEntry },
  { id: 'header-img', label: 'ヘッダー画像の作成',     short: 'ヘッダー', component: TabHeaderImage },
  { id: 'img-share',  label: '画像の共有方法',         short: '画像共有', component: TabImageShare },
]

function ManualApp() {
  const [activeTab, setActiveTab] = useState(0)
  const ActiveComponent = TABS[activeTab].component

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-3xl mx-auto">

        <header className="text-center py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-ocean-teal via-light-blue to-amber mb-3">
            ご利用マニュアル
          </h1>
          <p className="text-gray-400 text-sm">ColorSing ランキング＆特典管理ページ</p>
        </header>

        {/* タブナビ */}
        <nav className="flex flex-wrap gap-2 mb-6">
          {TABS.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all border ${
                activeTab === i
                  ? 'bg-light-blue/20 border-light-blue text-light-blue'
                  : 'border-light-blue/20 text-gray-400 hover:border-light-blue/40 hover:text-gray-200'
              }`}
            >
              <span className="hidden md:inline">{tab.label}</span>
              <span className="md:hidden">{tab.short}</span>
            </button>
          ))}
        </nav>

        {/* コンテンツ */}
        <section className="glass-effect rounded-xl border border-light-blue/30 p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-amber mb-6">
            {TABS[activeTab].label}
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
