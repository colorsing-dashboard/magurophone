// 深海BAR MAGUROPHONE 設定ファイル
// スプレッドシートID設定済み

// 枠内アイコン用の年月リスト生成（2026年2月〜2050年12月）
function generateIconMonths() {
  const months = [];
  for (let year = 2026; year <= 2050; year++) {
    const startMonth = (year === 2026) ? 2 : 1; // 2026年は2月から
    const endMonth = 12;
    for (let month = startMonth; month <= endMonth; month++) {
      months.push(`${year}${String(month).padStart(2, '0')}`);
    }
  }
  return months;
}

window.MAGUROPHONE_CONFIG = {
  SPREADSHEET_ID: '1kOuigqrKwgyrCJDN448SRDZCFj4urliA5iet4nRtH08',
  ICON_MONTHS: generateIconMonths() // 202602, 202603, ..., 205012
}
