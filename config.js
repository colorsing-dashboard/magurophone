// 深海BAR MAGUROPHONE 設定ファイル
// スプレッドシートID設定済み

// 枠内アイコン用の年月リスト生成（2020年1月〜2099年12月）
// YYYYMM形式のシート名なら何でも読み込める
function generateIconMonths() {
  const months = [];
  for (let year = 2020; year <= 2099; year++) {
    for (let month = 1; month <= 12; month++) {
      months.push(`${year}${String(month).padStart(2, '0')}`);
    }
  }
  return months;
}

window.MAGUROPHONE_CONFIG = {
  SPREADSHEET_ID: '1kOuigqrKwgyrCJDN448SRDZCFj4urliA5iet4nRtH08',
  API_KEY: '', // Google Sheets API v4 キー（シート一覧取得用）
  ICON_MONTHS: generateIconMonths() // 202001, 202002, ..., 209912
}
