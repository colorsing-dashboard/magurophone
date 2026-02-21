import { useState } from 'react'

/* ─────────────────────────────────────────
   共通コンポーネント
───────────────────────────────────────── */
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

const Sub = ({ number, children }) => (
  <div className="flex gap-3 mb-3">
    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-light-blue/20 border border-light-blue/50 text-light-blue text-xs flex items-center justify-center font-bold">
      {number}
    </span>
    <div className="text-gray-300 text-sm leading-relaxed pt-0.5">{children}</div>
  </div>
)

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

const H4 = ({ children }) => (
  <h4 className="text-light-blue font-bold text-sm mt-5 mb-3 border-b border-light-blue/20 pb-1">{children}</h4>
)

/* ─────────────────────────────────────────
   ステップ 1: メンバーシップへの加入・切り替え
───────────────────────────────────────── */
const StepContent1 = () => (
  <div>
    <p className="text-gray-300 text-sm mb-4">
      まずYouTubeメンバーシップに加入するか、既存のメンバーシップAから特典付きプランへ切り替えてください。
    </p>
    <Note type="info">
      すでにメンバーシップに加入済みの場合は、このステップをスキップして次へ進んでください。
    </Note>
  </div>
)

/* ─────────────────────────────────────────
   ステップ 2: フォームの送信
───────────────────────────────────────── */
const StepContent2 = () => (
  <div>
    <p className="text-gray-300 text-sm mb-4">
      以下のGoogleフォームに必要事項を記入して送信してください。
    </p>
    <a
      href="#"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-5 py-3 bg-amber/20 hover:bg-amber/30 border border-amber/50 rounded-xl text-amber font-bold text-sm transition-all"
    >
      フォームを開く →
    </a>
    <Note type="warn">
      フォームを送信するまで次のステップには進めません。送信後、設定情報がDMで届くまでお待ちください。
    </Note>
  </div>
)

/* ─────────────────────────────────────────
   ステップ 3: 設定情報の受け取り（待機）
───────────────────────────────────────── */
const StepContent3 = () => (
  <div>
    <p className="text-gray-300 text-sm mb-4">
      フォームの送信後、こちらで以下の設定を行います。
      <span className="text-amber font-bold">付与されるまでしばらくお待ちください。</span>
    </p>
    <div className="space-y-2">
      {[
        { label: 'サイトURL',                    desc: 'あなた専用のランキング・特典管理ページのURL' },
        { label: '管理画面URL',                  desc: '設定を変更するための管理画面のURL（サイトURLの末尾が /admin）' },
        { label: 'コピー用スプレッドシートURL',  desc: 'データ管理に使うスプレッドシートのコピー元URL' },
      ].map(item => (
        <div key={item.label} className="glass-effect rounded-lg border border-light-blue/20 p-3">
          <p className="text-sm font-bold text-amber">{item.label}</p>
          <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
        </div>
      ))}
    </div>
    <Note type="info">通常1〜3営業日以内にDMでお送りします。</Note>
  </div>
)

/* ─────────────────────────────────────────
   ステップ 4: スプレッドシートのコピーと共有設定
───────────────────────────────────────── */
const StepContent4 = () => (
  <div>
    <p className="text-gray-300 text-sm mb-4">
      受け取った「コピー用スプレッドシートURL」を使って、自分のGoogleドライブにスプレッドシートをコピーします。
    </p>

    <H4>① スプレッドシートをコピー</H4>
    <Sub number="1">受け取ったコピー用URLをブラウザのアドレスバーに貼り付ける</Sub>
    <Sub number="2">
      URLの末尾の <code className="bg-black/40 text-amber px-1.5 py-0.5 rounded text-xs">/edit</code> 以降を
      <code className="bg-black/40 text-amber px-1.5 py-0.5 rounded text-xs ml-1">/copy</code> に書き換えてEnterキーを押す
    </Sub>
    <Sub number="3">「コピーを作成」ダイアログが表示されたら「コピーを作成」をクリック</Sub>

    <Note type="info">
      例: <code className="bg-black/40 text-xs px-1 rounded">...spreadsheets/d/xxxxx<span className="text-red-400">/edit?usp=sharing</span></code>{' '}
      → <code className="bg-black/40 text-xs px-1 rounded">...spreadsheets/d/xxxxx<span className="text-green-400">/copy</span></code>
    </Note>

    <H4>② 共有設定を変更</H4>
    <p className="text-gray-300 text-sm mb-3">
      コピーしたスプレッドシートを「リンクを知っている全員が閲覧できる」設定に変更します。
    </p>
    <Sub number="1">スプレッドシート右上の「共有」ボタンをクリック</Sub>
    <Sub number="2">「リンクを知っている全員」を選択し、権限を「閲覧者」に設定</Sub>
    <Sub number="3">「完了」をクリック</Sub>

    <Img
      src="./manual/gdrive-share.png"
      alt="Googleスプレッドシートの共有設定ダイアログ"
      caption="「制限付き」→「リンクを知っている全員」に変更する"
    />

    <Note type="danger">
      共有設定が「制限付き」のままだと、サイトにデータが表示されません。必ず「リンクを知っている全員（閲覧者）」に変更してください。
    </Note>
  </div>
)

/* ─────────────────────────────────────────
   ステップ 5: スプレッドシートIDの登録とデプロイ
───────────────────────────────────────── */
const StepContent5 = () => (
  <div>
    <p className="text-gray-300 text-sm mb-4">
      コピーしたスプレッドシートのIDを管理画面に登録し、デプロイ（サイトへの反映）を実行します。
    </p>

    <H4>① スプレッドシートIDの確認</H4>
    <p className="text-gray-300 text-sm mb-3">
      コピーしたスプレッドシートを開き、URLの{' '}
      <span className="text-amber font-bold">/d/ と /edit の間</span>の文字列がIDです。
    </p>
    <Img
      src="./manual/ss-url-id.png"
      alt="スプレッドシートURLでIDの場所を示す図"
      caption="赤枠部分がスプレッドシートID"
    />

    <H4>② 管理画面にIDを登録</H4>
    <Sub number="1">受け取った管理画面URL（末尾が /admin）を開く</Sub>
    <Sub number="2">「Google Sheets」タブを選択</Sub>
    <Sub number="3">「スプレッドシートID」欄にコピーしたIDを貼り付け（自動保存）</Sub>
    <Sub number="4">「接続テスト」ボタンで正常に読み込めるか確認</Sub>

    <Img
      src="./manual/admin-sheets-tab.png"
      alt="管理画面 Google Sheetsタブ"
      caption="Google Sheets タブ"
    />

    <H4>③ デプロイ実行</H4>
    <Sub number="1">「デプロイ」タブを選択</Sub>
    <Sub number="2">「デプロイ実行」ボタンをクリック</Sub>

    <Note type="warn">
      デプロイ実行しないとサイトに反映されません。必ず最後に「デプロイ実行」してください。
    </Note>
  </div>
)

/* ─────────────────────────────────────────
   ステップ定義
───────────────────────────────────────── */
const STEPS = [
  { number: 1, label: 'メンバーシップへの加入・切り替え',    Content: StepContent1 },
  { number: 2, label: 'フォームの送信',                      Content: StepContent2 },
  { number: 3, label: '設定情報の受け取り（待機）',           Content: StepContent3 },
  { number: 4, label: 'スプレッドシートのコピーと共有設定',   Content: StepContent4 },
  { number: 5, label: 'スプレッドシートIDの登録とデプロイ',   Content: StepContent5 },
]

/* ─────────────────────────────────────────
   メインコンポーネント
───────────────────────────────────────── */
function SetupApp() {
  const [openStep, setOpenStep] = useState(1)
  const [completed, setCompleted] = useState(new Set())

  const handleComplete = (stepNumber) => {
    setCompleted(prev => new Set([...prev, stepNumber]))
    if (stepNumber < STEPS.length) {
      setOpenStep(stepNumber + 1)
    } else {
      setOpenStep(null)
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto">

        <header className="text-center py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-ocean-teal via-light-blue to-amber mb-3">
            初期設定ガイド
          </h1>
          <p className="text-gray-400 text-sm">ColorSing ランキング＆特典管理ページ</p>
        </header>

        <div className="space-y-3">
          {STEPS.map((step) => {
            const isOpen = openStep === step.number
            const isDone = completed.has(step.number)
            const { Content } = step

            return (
              <div
                key={step.number}
                className={`glass-effect rounded-xl border transition-all ${
                  isOpen
                    ? 'border-light-blue/50'
                    : isDone
                    ? 'border-green-500/30'
                    : 'border-light-blue/20'
                }`}
              >
                <button
                  className="w-full flex items-center gap-4 p-4 md:p-5 text-left"
                  onClick={() => setOpenStep(isOpen ? null : step.number)}
                >
                  <span className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                    isDone
                      ? 'bg-green-500/20 border-green-500 text-green-400'
                      : isOpen
                      ? 'bg-light-blue/20 border-light-blue text-light-blue'
                      : 'bg-black/30 border-light-blue/30 text-gray-400'
                  }`}>
                    {isDone ? '✓' : step.number}
                  </span>

                  <span className={`flex-1 font-bold text-sm md:text-base ${
                    isOpen ? 'text-light-blue' : isDone ? 'text-green-400' : 'text-gray-300'
                  }`}>
                    {step.label}
                  </span>

                  <span className="text-gray-500 text-xs">{isOpen ? '▲' : '▼'}</span>
                </button>

                {isOpen && (
                  <div className="px-4 md:px-5 pb-5">
                    <hr className="border-light-blue/20 mb-4" />
                    <Content />
                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={() => handleComplete(step.number)}
                        className="px-5 py-2 bg-light-blue/20 hover:bg-light-blue/30 border border-light-blue/50 rounded-xl text-light-blue text-sm font-bold transition-all"
                      >
                        {step.number < STEPS.length ? '完了して次へ →' : '設定完了 ✓'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {completed.size === STEPS.length && (
          <div className="mt-8 glass-effect rounded-xl border border-green-500/40 bg-green-500/5 p-6 text-center">
            <p className="text-3xl mb-2">🎉</p>
            <p className="text-green-400 font-bold text-lg mb-1">初期設定が完了しました！</p>
            <p className="text-gray-400 text-sm mb-5">サイトURLにアクセスして確認してください。</p>
            <a
              href="./manual.html"
              className="inline-block px-5 py-2 bg-light-blue/20 hover:bg-light-blue/30 border border-light-blue/50 rounded-xl text-light-blue text-sm font-bold transition-all"
            >
              ご利用マニュアルを確認する →
            </a>
          </div>
        )}

        <footer className="text-center py-8 text-gray-500 text-xs">
          <p>ColorSing LP — 初期設定ガイド</p>
        </footer>

      </div>
    </div>
  )
}

export default SetupApp
