import { useState, useEffect, useCallback, useRef } from 'react'
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
  const loadingIconsRef = useRef(false)
  const [iconError, setIconError] = useState(null)
  const iconsLoadedRef = useRef(false)

  const { spreadsheetId, dataSheetName, iconSheetName, ranges, refreshIntervalMs } = sheetsConfig
  // rangesオブジェクトを個別の文字列に分解して安定した依存関係にする
  const rankingRange = ranges.ranking
  const goalsRange = ranges.goals
  const benefitsRange = ranges.benefits
  const rightsRange = ranges.rights

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
        fetchSheetData(spreadsheetId, dataSheetName, rankingRange),
        fetchSheetData(spreadsheetId, dataSheetName, goalsRange),
        fetchSheetData(spreadsheetId, dataSheetName, benefitsRange),
        fetchSheetData(spreadsheetId, dataSheetName, rightsRange),
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
  }, [spreadsheetId, dataSheetName, rankingRange, goalsRange, benefitsRange, rightsRange])

  // 初回読み込み + 自動更新
  useEffect(() => {
    loadData()

    const intervalId = setInterval(loadData, refreshIntervalMs)
    return () => clearInterval(intervalId)
  }, [loadData, refreshIntervalMs])

  // アイコンデータ読み込み
  const loadIcons = useCallback(async () => {
    if (iconsLoadedRef.current || loadingIconsRef.current || !spreadsheetId) return

    loadingIconsRef.current = true
    setLoadingIcons(true)
    setIconError(null)
    try {
      const iconData = await fetchIconData(spreadsheetId, iconSheetName)
      setIcons(iconData)
      iconsLoadedRef.current = true
    } catch (err) {
      console.error('Failed to load icon data:', err)
      setIconError('アイコンデータの読み込みに失敗しました')
    } finally {
      loadingIconsRef.current = false
      setLoadingIcons(false)
    }
  }, [spreadsheetId, iconSheetName])

  return {
    ranking,
    goals,
    rights,
    benefits,
    icons,
    loading,
    loadingIcons,
    iconError,
    error,
    lastUpdate,
    loadData,
    loadIcons,
  }
}
