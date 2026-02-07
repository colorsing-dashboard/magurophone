import { useState, useEffect, useCallback } from 'react'
import { fetchSheetData, fetchIconData } from '../lib/sheets'

export function useSheetData(sheetsConfig) {
  const [ranking, setRanking] = useState([])
  const [goals, setGoals] = useState([])
  const [rights, setRights] = useState([])
  const [benefits, setBenefits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)

  // アイコン関連
  const [icons, setIcons] = useState({})
  const [loadingIcons, setLoadingIcons] = useState(false)

  const { spreadsheetId, dataSheetName, iconSheetName, ranges, refreshIntervalMs } = sheetsConfig

  const loadData = useCallback(async () => {
    if (!spreadsheetId) {
      setError('スプレッドシートIDが設定されていません。管理画面（admin.html）から設定してください。')
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const [rankingData, goalsData, benefitsData, rightsData] = await Promise.all([
        fetchSheetData(spreadsheetId, dataSheetName, ranges.ranking),
        fetchSheetData(spreadsheetId, dataSheetName, ranges.goals),
        fetchSheetData(spreadsheetId, dataSheetName, ranges.benefits),
        fetchSheetData(spreadsheetId, dataSheetName, ranges.rights),
      ])

      setRanking(rankingData)
      setGoals(goalsData.slice(1))
      setBenefits(benefitsData.slice(1))
      setRights(rightsData)
      setLastUpdate(new Date())
      setError(null)
    } catch (err) {
      console.error('Failed to load data:', err)
      setError('データの読み込みに失敗しました。しばらくしてから再度お試しください。')
    } finally {
      setLoading(false)
    }
  }, [spreadsheetId, dataSheetName, ranges])

  // 初回読み込み + 自動更新
  useEffect(() => {
    loadData()

    const intervalId = setInterval(loadData, refreshIntervalMs)
    return () => clearInterval(intervalId)
  }, [loadData, refreshIntervalMs])

  // アイコンデータ読み込み
  const loadIcons = useCallback(async () => {
    if (Object.keys(icons).length > 0 || loadingIcons || !spreadsheetId) return

    setLoadingIcons(true)
    try {
      const iconData = await fetchIconData(spreadsheetId, iconSheetName)
      setIcons(iconData)
    } catch (error) {
      console.error('Failed to load icon data:', error)
    } finally {
      setLoadingIcons(false)
    }
  }, [icons, loadingIcons, spreadsheetId, iconSheetName])

  return {
    ranking,
    goals,
    rights,
    benefits,
    icons,
    loading,
    loadingIcons,
    error,
    lastUpdate,
    loadData,
    loadIcons,
  }
}
