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

      return json.table.rows.map(row => (row.c ?? []).map(cell => cell?.v || ''))
    } catch (error) {
      console.error(`Error fetching ${sheetName}${range ? ` (${range})` : ''} (attempt ${attempt + 1}/${retries}):`, error)

      if (attempt === retries - 1) {
        throw error
      }

      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)))
    }
  }

  return []
}

// Google DriveのURLをサムネイル表示可能なURLに変換
export const convertDriveUrl = (url) => {
  if (!url || typeof url !== 'string') return ''
  if (url.includes('/thumbnail?id=')) return url

  const match = url.match(/\/file\/d\/([^/]+)/)
  if (match && match[1]) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w400`
  }

  return url
}

// 枠内アイコンデータを読み込む（A列:yyyymm, B列:ユーザー名, C列:画像URL）
export const fetchIconData = async (spreadsheetId, iconSheetName) => {
  const iconData = {}

  try {
    const data = await fetchSheetData(spreadsheetId, iconSheetName)

    if (!data || data.length < 1) {
      return iconData
    }

    data.forEach(row => {
      const month = String(row[0] || '')
      const userName = row[1]
      const imageUrl = row[2]

      if (month && userName && imageUrl) {
        if (!iconData[month]) {
          iconData[month] = []
        }

        iconData[month].push({
          label: userName,
          thumbnailUrl: convertDriveUrl(imageUrl),
          originalUrl: imageUrl,
        })
      }
    })

    return iconData
  } catch (error) {
    console.error('Failed to load icon data:', error)
    return {}
  }
}
