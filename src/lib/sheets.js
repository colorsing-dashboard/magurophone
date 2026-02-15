// Googleスプレッドシートから公開データを取得（範囲指定対応、再試行機能付き）
export const fetchSheetData = async (spreadsheetId, sheetName, range = null, retries = 3) => {
  if (!spreadsheetId) {
    throw new Error('Spreadsheet ID is not configured')
  }

  let url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`
  if (range) {
    url += `&range=${encodeURIComponent(range)}`
  }

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const text = await response.text()
      const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\)/)

      if (!match || !match[1]) {
        throw new Error('Invalid response format from Google Sheets')
      }

      const json = JSON.parse(match[1])

      if (!json.table || !json.table.rows) {
        throw new Error('Invalid data structure from Google Sheets')
      }

      return json.table.rows.map(row => (row.c ?? []).map(cell => cell?.v ?? ''))
    } catch (error) {
      console.error(`Error fetching ${sheetName}${range ? ` (${range})` : ''} (attempt ${attempt + 1}/${retries}):`, error)

      if (attempt === retries - 1) {
        throw error
      }

      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)))
    }
  }
}

// Google DriveのURLをサムネイル表示可能なURLに変換
export const convertDriveUrl = (url, size = 400) => {
  if (!url || typeof url !== 'string') return ''
  if (url.includes('/thumbnail?id=')) return url

  const match = url.match(/\/file\/d\/([^/]+)/)
  if (match && match[1]) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w${size}`
  }

  return url
}

// キーが月別形式（YYYYMM）かカテゴリ名かを判定
export const isMonthlyFormat = (keys) => {
  if (keys.length === 0) return true
  return keys.every(key => /^\d{6}$/.test(key))
}

// 特典履歴データを読み込む（A列:ユーザー名, B列:年月, C列:特典ID, D列:内容）
export const fetchHistoryData = async (spreadsheetId, historySheetName, range = null) => {
  const data = await fetchSheetData(spreadsheetId, historySheetName, range)
  return data.map(row => ({
    userName: String(row[0] || ''),
    month: String(row[1] || ''),
    tierKey: String(row[2] || ''),
    content: String(row[3] || ''),
  }))
}

// 枠内アイコンデータを読み込む（A列:yyyymmまたはカテゴリ名, B列:ユーザー名, C列:画像URL）
export const fetchIconData = async (spreadsheetId, iconSheetName) => {
  const iconData = {}
  const orderedKeys = []
  const data = await fetchSheetData(spreadsheetId, iconSheetName)

  if (!data || data.length < 1) {
    return iconData
  }

  data.forEach(row => {
    const key = String(row[0] || '')
    const userName = row[1]
    const imageUrl = row[2]

    if (key && userName && imageUrl) {
      if (!iconData[key]) {
        iconData[key] = []
        orderedKeys.push(key)
      }

      iconData[key].push({
        label: userName,
        thumbnailUrl: convertDriveUrl(imageUrl),
        originalUrl: imageUrl,
      })
    }
  })

  iconData._orderedKeys = orderedKeys
  return iconData
}
