const Section = ({ title, children }) => (
  <section className="glass-effect rounded-xl border border-light-blue/30 p-6 md:p-8">
    <h2 className="text-xl md:text-2xl font-bold text-amber mb-4">{title}</h2>
    {children}
  </section>
)

const Step = ({ number, children }) => (
  <div className="flex gap-3 mb-3">
    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-light-blue/20 border border-light-blue/50 text-light-blue text-sm flex items-center justify-center">
      {number}
    </span>
    <div className="text-gray-300 text-sm leading-relaxed pt-0.5">{children}</div>
  </div>
)

const Code = ({ children }) => (
  <code className="bg-black/40 text-amber px-1.5 py-0.5 rounded text-xs">{children}</code>
)

function ManualApp() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* ヘッダー */}
        <header className="text-center py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-ocean-teal via-light-blue to-amber mb-3">
            ご利用マニュアル
          </h1>
          <p className="text-gray-400 text-sm">ColorSing ランキング＆特典管理ページ</p>
        </header>

        {/* LPの見方 */}
        <Section title="LPの見方">
          <p className="text-gray-300 text-sm mb-4">
            お渡ししたURLにアクセスすると、あなた専用のランキング＆特典管理ページが表示されます。
          </p>

          <h3 className="text-light-blue font-bold text-sm mb-2">画面構成</h3>
          <div className="space-y-2 mb-6">
            <div className="glass-effect rounded-lg p-3 border border-light-blue/20">
              <span className="text-amber font-bold text-sm">Home</span>
              <span className="text-gray-400 text-sm ml-2">- ランキング表示・月間目標の進捗</span>
            </div>
            <div className="glass-effect rounded-lg p-3 border border-light-blue/20">
              <span className="text-amber font-bold text-sm">Menu</span>
              <span className="text-gray-400 text-sm ml-2">- 特典一覧（タップで詳細表示）</span>
            </div>
            <div className="glass-effect rounded-lg p-3 border border-light-blue/20">
              <span className="text-amber font-bold text-sm">権利者リスト</span>
              <span className="text-gray-400 text-sm ml-2">- 各リスナーの特典保有状況</span>
            </div>
            <div className="glass-effect rounded-lg p-3 border border-light-blue/20">
              <span className="text-amber font-bold text-sm">枠内アイコン</span>
              <span className="text-gray-400 text-sm ml-2">- リスナーが提出したアイコン一覧</span>
            </div>
          </div>

          <h3 className="text-light-blue font-bold text-sm mb-2">データの更新</h3>
          <p className="text-gray-300 text-sm">
            ページのデータは自動で定期更新されます（デフォルト: 5分間隔）。
            ヘッダー右上の更新ボタンを押すと、手動で最新データを取得できます。
          </p>
        </Section>

        {/* スプレッドシートの更新方法 */}
        <Section title="スプレッドシートの更新方法">
          <p className="text-gray-300 text-sm mb-6">
            LPに表示されるデータは、Googleスプレッドシートから読み込まれます。
            スプレッドシートを更新すると、LPにも自動で反映されます。
          </p>

          <h3 className="text-light-blue font-bold text-sm mb-3">dataシート</h3>
          <div className="bg-black/30 rounded-lg p-4 mb-6 text-xs text-gray-300 space-y-2 overflow-x-auto">
            <div><Code>A2:D5</Code> ランキング（順位, 名前, ポイント, メダル画像URL）</div>
            <div><Code>A8:B12</Code> 月間目標（ラベル, 値）</div>
            <div><Code>G2:K12</Code> 特典説明（タイトル, 名前, 説明, アイコン, ラベル）</div>
            <div><Code>A15:I</Code> 権利者リスト（名前, 各ティアの値...）</div>
          </div>

          <h3 className="text-light-blue font-bold text-sm mb-3">枠内アイコンシート</h3>
          <div className="bg-black/30 rounded-lg p-4 mb-6 text-xs text-gray-300 space-y-2 overflow-x-auto">
            <div><Code>A列</Code> 月（yyyymm形式）またはカテゴリ名</div>
            <div><Code>B列</Code> ユーザー名</div>
            <div><Code>C列</Code> Google Drive 画像URL</div>
          </div>

          <h3 className="text-light-blue font-bold text-sm mb-3">更新手順</h3>
          <Step number="1">Googleスプレッドシートを開く</Step>
          <Step number="2">該当するセルにデータを入力・更新する</Step>
          <Step number="3">保存は自動（Googleスプレッドシートは自動保存）</Step>
          <Step number="4">LPを開いて更新ボタンを押すか、数分待つと反映されます</Step>

          <div className="mt-4 glass-effect rounded-lg p-3 border border-amber/30">
            <p className="text-amber text-xs font-bold mb-1">注意</p>
            <p className="text-gray-400 text-xs">
              セル範囲（A2:D5など）を変更すると、LPに正しく表示されなくなる場合があります。
              データの追加・編集は既存の範囲内で行ってください。範囲の変更が必要な場合はお問い合わせください。
            </p>
          </div>
        </Section>

        {/* 画像の追加方法 */}
        <Section title="画像の追加方法（Google Drive）">
          <p className="text-gray-300 text-sm mb-4">
            アイコンやメダル画像はGoogle Driveにアップロードし、そのURLをスプレッドシートに貼り付けます。
          </p>
          <Step number="1">Google Driveに画像ファイルをアップロード</Step>
          <Step number="2">アップロードした画像を右クリック →「リンクを取得」</Step>
          <Step number="3">「リンクを知っている全員」に共有設定を変更</Step>
          <Step number="4">リンクをコピーしてスプレッドシートに貼り付け</Step>

          <div className="mt-4 glass-effect rounded-lg p-3 border border-amber/30">
            <p className="text-amber text-xs font-bold mb-1">重要</p>
            <p className="text-gray-400 text-xs">
              画像の共有設定が「リンクを知っている全員」になっていないと、LPに表示されません。
            </p>
          </div>
        </Section>

        {/* 不具合報告 */}
        <Section title="不具合・お問い合わせ">
          <p className="text-gray-300 text-sm mb-4">
            表示の不具合やご質問がございましたら、LINE公式アカウントよりご連絡ください。
          </p>

          <h3 className="text-light-blue font-bold text-sm mb-3">報告時にお伝えいただきたい情報</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex gap-2">
              <span className="text-amber">-</span>
              <span>どのページ（Home / Menu / 権利者リスト / 枠内アイコン）で発生したか</span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber">-</span>
              <span>どのような問題が起きているか（表示されない、データが古い等）</span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber">-</span>
              <span>スクリーンショット（あれば）</span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber">-</span>
              <span>使用しているデバイス（スマホ / PC）とブラウザ</span>
            </li>
          </ul>
        </Section>

        {/* フッター */}
        <footer className="text-center py-8 text-gray-500 text-xs">
          <p>ColorSing LP Manual</p>
        </footer>
      </div>
    </div>
  )
}

export default ManualApp
