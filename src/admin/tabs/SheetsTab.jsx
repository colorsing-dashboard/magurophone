import { useState } from 'react'
import { fetchSheetData } from '../../lib/sheets'

const Field = ({ label, value, onChange, placeholder, description }) => (
  <div className="mb-5">
    <label className="block text-sm font-body text-light-blue mb-1">{label}</label>
    {description && <p className="text-xs text-gray-500 mb-1">{description}</p>}
    <input
      type="text"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-2 glass-effect border border-light-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber transition-all text-sm"
    />
  </div>
)

const SheetsTab = ({ config, updateConfig }) => {
  const [testResult, setTestResult] = useState(null)
  const [testing, setTesting] = useState(false)

  const handleTest = async () => {
    setTesting(true)
    setTestResult(null)

    try {
      const data = await fetchSheetData(
        config.sheets.spreadsheetId,
        config.sheets.dataSheetName,
        config.sheets.ranges.ranking
      )
      setTestResult({
        success: true,
        message: `接続成功！${data.length}行のデータを取得しました。`,
      })
    } catch (err) {
      setTestResult({
        success: false,
        message: `接続失敗: ${err.message}`,
      })
    } finally {
      setTesting(false)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-body text-light-blue mb-6">Google Sheets 設定</h2>
      <p className="text-sm text-gray-400 mb-6">データソースとなるGoogleスプレッドシートの接続設定です。</p>

      <Field
        label="スプレッドシートID"
        value={config.sheets.spreadsheetId}
        onChange={(v) => updateConfig('sheets.spreadsheetId', v)}
        placeholder="1kOuigqrKwgyrCJDN448SRDZCFj4urliA5iet4nRtH08"
        description="GoogleスプレッドシートのURLから取得できます。https://docs.google.com/spreadsheets/d/[ここのID]/edit"
      />

      <button
        onClick={handleTest}
        disabled={testing || !config.sheets.spreadsheetId}
        className="mb-6 px-4 py-2 bg-light-blue/20 hover:bg-light-blue/30 border border-light-blue/50 rounded-lg transition-all text-light-blue text-sm font-body disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {testing ? '接続テスト中...' : '接続テスト'}
      </button>

      {testResult && (
        <div className={`mb-6 glass-effect px-4 py-3 rounded-lg border text-sm ${
          testResult.success
            ? 'border-green-500/50 text-green-400'
            : 'border-tuna-red/50 text-tuna-red'
        }`}>
          {testResult.message}
        </div>
      )}

      <hr className="border-light-blue/20 my-8" />
      <h3 className="text-lg font-body text-amber mb-4">シート名</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field
          label="データシート名"
          value={config.sheets.dataSheetName}
          onChange={(v) => updateConfig('sheets.dataSheetName', v)}
          placeholder="data"
          description="ランキング・目標・特典・権利者データのシート名"
        />
        <Field
          label="アイコンシート名"
          value={config.sheets.iconSheetName}
          onChange={(v) => updateConfig('sheets.iconSheetName', v)}
          placeholder="枠内アイコン"
          description="枠内アイコンデータのシート名"
        />
      </div>

      <hr className="border-light-blue/20 my-8" />

      <details className="mb-6 glass-effect rounded-lg border border-light-blue/20">
        <summary className="px-4 py-3 cursor-pointer text-sm font-body text-amber hover:text-amber/80 transition-all">
          スプレッドシートの構造について
        </summary>
        <div className="px-4 pb-4 text-xs text-gray-400 space-y-3">
          <div>
            <p className="text-light-blue font-bold mb-1">dataシート</p>
            <pre className="bg-black/30 rounded p-2 overflow-x-auto">{`A2:D5  ... ランキング（順位, 名前, ポイント, 差分）
A8:B12 ... 目標（ラベル, 値）
G2:K12 ... 特典説明（タイトル, 名前, 説明, アイコン, ラベル）
A15:I  ... 権利者リスト（名前, 各ティアの値...）`}</pre>
          </div>
          <div>
            <p className="text-light-blue font-bold mb-1">枠内アイコンシート</p>
            <pre className="bg-black/30 rounded p-2 overflow-x-auto">{`A列: yyyymm（例: 202602）
B列: ユーザー名
C列: Google Drive画像URL`}</pre>
          </div>
        </div>
      </details>

      <h3 className="text-lg font-body text-amber mb-4">セル範囲</h3>
      <p className="text-xs text-gray-500 mb-4">各データが配置されているセル範囲を指定します。</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field
          label="ランキングデータ"
          value={config.sheets.ranges.ranking}
          onChange={(v) => updateConfig('sheets.ranges.ranking', v)}
          placeholder="A2:D5"
        />
        <Field
          label="目標データ"
          value={config.sheets.ranges.goals}
          onChange={(v) => updateConfig('sheets.ranges.goals', v)}
          placeholder="A8:B12"
        />
        <Field
          label="特典説明データ"
          value={config.sheets.ranges.benefits}
          onChange={(v) => updateConfig('sheets.ranges.benefits', v)}
          placeholder="G2:K12"
        />
        <Field
          label="権利者データ"
          value={config.sheets.ranges.rights}
          onChange={(v) => updateConfig('sheets.ranges.rights', v)}
          placeholder="A15:I1000"
        />
      </div>

      <hr className="border-light-blue/20 my-8" />
      <h3 className="text-lg font-body text-amber mb-4">自動更新</h3>

      <div className="mb-5">
        <label className="block text-sm font-body text-light-blue mb-1">更新間隔（分）</label>
        <input
          type="number"
          min="1"
          max="60"
          value={Math.round((config.sheets.refreshIntervalMs || 300000) / 60000)}
          onChange={(e) => updateConfig('sheets.refreshIntervalMs', parseInt(e.target.value) * 60000)}
          className="w-32 px-4 py-2 glass-effect border border-light-blue/30 rounded-lg text-white focus:outline-none focus:border-amber transition-all text-sm"
        />
      </div>
    </div>
  )
}

export default SheetsTab
