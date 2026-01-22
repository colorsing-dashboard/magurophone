import { useState, useEffect } from 'react'
import './App.css'

// Googleスプレッドシートから公開データを取得
const fetchSheetData = async (sheetName) => {
  try {
    const SPREADSHEET_ID = window.MAGUROPHONE_CONFIG?.SPREADSHEET_ID || 'YOUR_SPREADSHEET_ID_HERE'
    const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`
    const response = await fetch(url)
    const text = await response.text()
    const json = JSON.parse(text.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\)/)[1])
    return json.table.rows.map(row => row.c.map(cell => cell?.v || ''))
  } catch (error) {
    console.error(`Error fetching ${sheetName}:`, error)
    return []
  }
}

function App() {
  const [ranking, setRanking] = useState([])
  const [goals, setGoals] = useState([])
  const [rights, setRights] = useState([])
  const [benefits, setBenefits] = useState([])
  const [selectedPerson, setSelectedPerson] = useState(null)
  const [selectedBenefit, setSelectedBenefit] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      const [rankingData, goalsData, rightsData, benefitsData] = await Promise.all([
        fetchSheetData('ランキング'),
        fetchSheetData('目標'),
        fetchSheetData('権利者'),
        fetchSheetData('特典説明')
      ])
      
      setRanking(rankingData)
      setGoals(goalsData.slice(1))
      setRights(rightsData.slice(1))
      setBenefits(benefitsData.slice(1))
      setLoading(false)
    }
    
    loadData()
  }, [])

  // 権利者を50音順にソート
  const sortedRights = [...rights].sort((a, b) => a[0].localeCompare(b[0], 'ja'))
  
  // 検索フィルター
  const filteredRights = sortedRights.filter(person => 
    person[0].toLowerCase().includes(searchTerm.toLowerCase())
  )

  // カウントアップアニメーション
  const CountUp = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0)
    
    useEffect(() => {
      const endNum = parseInt(end.replace('k', '')) || 0
      const increment = endNum / (duration / 16)
      let current = 0
      
      const timer = setInterval(() => {
        current += increment
        if (current >= endNum) {
          setCount(endNum)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, 16)
      
      return () => clearInterval(timer)
    }, [end, duration])
    
    return <span>{count}k</span>
  }

  // 権利を持っているかチェック
  const hasRight = (value) => {
    if (typeof value === 'string') {
      return value.toUpperCase() === 'TRUE'
    }
    return value > 0
  }

  // 権利のアイコンを取得
  const getRightsIcons = (person) => {
    const icons = []
    if (hasRight(person[1])) icons.push('🎵')
    if (hasRight(person[2])) icons.push('🎮')
    if (hasRight(person[3])) icons.push('💬')
    if (hasRight(person[4])) icons.push('🎤')
    if (hasRight(person[5])) icons.push('⚡')
    if (hasRight(person[6])) icons.push('🏆')
    if (hasRight(person[7])) icons.push('👑')
    return icons
  }

  const getBenefitByTitle = (title) => {
    return benefits.find(benefit => benefit[0] === title)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse">🐟</div>
          <div className="text-xl text-light-blue animate-shimmer">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* ヘッダー画像エリア */}
      <div className="w-full h-[300px] md:h-[600px] relative overflow-hidden bg-gradient-to-b from-deep-blue via-ocean-teal/30 to-deep-blue">
        {/* ヘッダー画像 */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat header-image"
        ></div>
        {/* オーバーレイ（画像を少し暗くして文字を読みやすく） */}
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEuNSIgZmlsbD0icmdiYSgxMzgsIDE4MCwgMjQ4LCAwLjA1KSIvPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjIiIGZpbGw9InJnYmEoMTM4LCAxODAsIDI0OCwgMC4wOCkiLz48Y2lyY2xlIGN4PSIzNSIgY3k9IjEwIiByPSIxIiBmaWxsPSJyZ2JhKDEzOCwgMTgwLCAyNDgsIDAuMDMpIi8+PC9zdmc+')] opacity-20 animate-float"></div>
        {/* 気泡アニメーション */}
        <div className="bubbles-container">
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-8xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-ocean-teal via-light-blue to-amber text-glow-soft mb-4">
              BAR MAGUROPHONE
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-12 space-y-8 md:space-y-16">
        {/* ランキング */}
        <section className="text-center">
          <h2 className="text-2xl md:text-4xl font-body mb-4 md:mb-8 text-glow-soft text-light-blue">Ranking</h2>
          <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 md:gap-6">
            {ranking.slice(0, 3).map((person, index) => (
              <div key={index} className={`
                glass-effect rounded-2xl p-4 md:p-8 border transition-all hover:scale-105 water-shimmer
                ${index === 0 ? 'border-tuna-red/50 box-glow-soft' : 'border-light-blue/30'}
              `}>
                <div className="mb-2 md:mb-4 flex justify-center">
                  {index === 0 && <img src="./medal-1st.jpg" alt="1位" className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-full" />}
                  {index === 1 && <img src="./medal-2nd.jpg" alt="2位" className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-full" />}
                  {index === 2 && <img src="./medal-3rd.jpg" alt="3位" className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-full" />}
                </div>
                <div className="text-xs md:text-2xl font-body mb-1 md:mb-2 whitespace-nowrap overflow-hidden h-4 md:h-8">{person[1]}</div>
                <div className={`text-2xl md:text-4xl font-black ${index === 0 ? 'text-tuna-red' : 'text-amber'}`}>
                  <CountUp end={person[2]} />
                </div>
                <div className="text-xs md:text-sm text-gray-400 mt-1 md:mt-2">歌推しPt</div>
              </div>
            ))}
          </div>
        </section>

        {/* 目標 */}
        <section className="text-center">
          <h2 className="text-2xl md:text-4xl font-body mb-4 md:mb-8 text-glow-soft text-amber">Targets</h2>
          <div className="grid grid-cols-2 gap-3 md:gap-6 max-w-4xl mx-auto">
            {/* 今旬の目標 */}
            <div className={`glass-effect rounded-2xl p-4 md:p-6 border border-amber/30 ${goals.length === 0 || !goals[0] || !goals[0][0] ? 'opacity-50' : ''}`}>
              <h3 className="text-lg md:text-2xl font-body mb-2 md:mb-4 text-light-blue">今旬の目標</h3>
              {goals.map((goal, index) => (
                goal[0] && (
                  <div key={index} className="text-sm md:text-lg mb-2 md:mb-4 last:mb-0">
                    <span className="text-amber">▸</span> {goal[0]}
                  </div>
                )
              ))}
            </div>
            
            {/* 今月の目標 */}
            <div className={`glass-effect rounded-2xl p-4 md:p-6 border border-amber/30 ${goals.length === 0 || !goals[0] || !goals[0][1] ? 'opacity-50' : ''}`}>
              <h3 className="text-lg md:text-2xl font-body mb-2 md:mb-4 text-light-blue">今月の目標</h3>
              {goals.map((goal, index) => (
                goal[1] && (
                  <div key={index} className="text-sm md:text-lg mb-2 md:mb-4 last:mb-0">
                    <span className="text-amber">▸</span> {goal[1]}
                  </div>
                )
              ))}
            </div>
          </div>
        </section>

        {/* 特典制度 */}
        <section>
          <h2 className="text-2xl md:text-4xl font-body mb-6 md:mb-12 text-center text-glow-soft text-light-blue">Menu</h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                onClick={(e) => {
                  if (window.innerWidth < 768) {
                    setSelectedBenefit(benefit);
                  }
                }}
                className="group glass-effect rounded-2xl md:p-6 border border-light-blue/30 hover:border-amber md:hover:border-light-blue/30 transition-all hover:scale-105 md:hover:scale-100 cursor-pointer md:cursor-default text-center overflow-hidden flex flex-col"
              >
                {/* モバイル版：簡略表示 */}
                <div className="md:hidden py-3 px-4 bg-amber/10 rounded-2xl relative">
                  {/* 左上バッジ */}
                  <div className="absolute top-2 left-2">
                    <span className="text-xs font-bold text-amber font-body">{benefit[0]}</span>
                  </div>
                  {/* 本文 */}
                  <div className="pt-6">
                    <span className="text-sm text-amber font-body">{benefit[4]}</span>
                  </div>
                </div>

                {/* ボトルラベル（PC版のみ） */}
                {benefit[4] && (
                  <div className="hidden md:block py-3 px-4 md:px-6 bg-amber/10 rounded-2xl md:rounded-t-2xl md:mb-4 md:pb-3 md:border-b border-amber/30 md:-mx-6 md:-mt-6">
                    <div className="flex items-center justify-center pt-1">
                      <span className="text-sm md:text-base text-amber font-body">{benefit[0]} {benefit[4]}</span>
                    </div>
                  </div>
                )}
                
                {/* PC版：フル表示 */}
                <div className="hidden md:block flex-1">
                  <div className="flex items-center justify-center mb-2 md:mb-4">
                    <span className="text-3xl md:text-5xl group-hover:animate-float">{benefit[3]}</span>
                  </div>
                  <p className="text-base md:text-lg font-bold mb-1 md:mb-2 whitespace-pre-line">{benefit[1]}</p>
                  <p className="text-xs md:text-sm text-gray-400">{benefit[2]}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 権利者リスト */}
        <section>
          <h2 className="text-2xl md:text-4xl font-body mb-4 md:mb-8 text-center text-glow-soft text-amber">🍾 ボトルキープ一覧</h2>
          
          <div className="mb-6 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="🔍 名前で検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 glass-effect border border-light-blue/30 rounded-xl focus:outline-none focus:border-amber transition-all text-white placeholder-gray-500"
            />
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRights.map((person, index) => (
              <div
                key={index}
                onClick={() => setSelectedPerson(person)}
                className="glass-effect rounded-xl p-4 md:p-6 border border-light-blue/30 hover:border-amber transition-all hover:scale-105 cursor-pointer group h-32 md:h-36 text-center flex flex-col"
              >
                <h3 className="text-base md:text-xl font-body group-hover:text-amber transition-colors flex items-center justify-center" style={{ flexGrow: 1, flexShrink: 1, flexBasis: '0%', minHeight: 0 }}>
                  {person[0]}
                </h3>
                <div className="flex items-center justify-center flex-wrap gap-2 text-lg md:text-2xl" style={{ flexGrow: 2, flexShrink: 1, flexBasis: '0%', minHeight: 0, paddingTop: '13px', alignContent: 'flex-start', boxSizing: 'border-box' }}>
                  {getRightsIcons(person).map((icon, i) => (
                    <span key={i} className="animate-float" style={{ animationDelay: `${i * 0.2}s` }}>
                      {icon}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-body mb-8 text-center text-glow-soft text-light-blue">📝 FAQ・注意事項</h2>
          <div className="glass-effect rounded-2xl p-8 border border-light-blue/30 space-y-6">
            <div>
              <h3 className="text-xl font-body text-amber mb-2">▸ 特典の使用方法は？</h3>
              <p className="text-gray-300 ml-6">枠内でリクエストするか、XのDMでお知らせください。</p>
            </div>
            <div>
              <h3 className="text-xl font-body text-amber mb-2">▸ 10k以上の特典について</h3>
              <p className="text-gray-300 ml-6">永続権利です。月が替わっても消えることがありません。</p>
            </div>
            <div>
              <h3 className="text-xl font-body text-amber mb-2">▸ メンバーシップ特典について</h3>
              <p className="text-gray-300 ml-6">メンバーシップ特典で得られた10ｋ及び20ｋ特典は、それぞれの箇所に合算して記載しています。</p>
            </div>
          </div>
        </section>

        {/* フッター */}
        <footer className="text-center py-8 border-t border-light-blue/30">
          <p className="text-xl font-body mb-4">深海BAR MAGUROPHONE 🐟🎧</p>
          <p className="text-gray-400">単推し・最推し様・メンシプ様募集中です</p>
          <p className="text-sm text-gray-500 mt-4">ファンマ: 🐟🎧</p>
        </footer>
      </div>

      {/* 権利者詳細ポップアップ */}
      {selectedPerson && (
        <div 
          onClick={() => setSelectedPerson(null)}
          className="fixed inset-0 bg-black/70 flex items-start justify-center p-4 z-50 overflow-y-auto"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="glass-effect rounded-2xl p-8 border border-light-blue/30 box-glow-soft max-w-2xl w-full relative my-8 max-h-[90vh] flex flex-col"
          >
            <button
              onClick={() => setSelectedPerson(null)}
              className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-white transition-colors z-10"
            >
              ×
            </button>
            
            <h2 className="text-2xl md:text-4xl font-body mb-4 md:mb-8 text-glow-soft text-amber flex-shrink-0 text-center">
              {selectedPerson[0]}
            </h2>
            
            <div className="space-y-6 overflow-y-auto pr-2 flex-1">
              {hasRight(selectedPerson[1]) && (
                <div 
                  onClick={() => setSelectedBenefit(getBenefitByTitle('5k'))}
                  className="bg-deep-blue/50 p-4 md:p-6 rounded-xl border border-light-blue/20 cursor-pointer hover:border-amber transition-all text-center flex flex-col overflow-hidden"
                >
                  {/* ボトルラベル */}
                  {getBenefitByTitle('5k')?.[4] && (
                    <div className="mb-4 pb-3 border-b border-amber/30 bg-amber/10 -mx-4 md:-mx-6 -mt-4 md:-mt-6 px-4 md:px-6 py-3 rounded-t-xl">
                      <div className="flex items-center justify-center pt-1">
                        <span className="text-sm md:text-base text-amber font-body">{getBenefitByTitle('5k')[0]} {getBenefitByTitle('5k')[4]}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-3xl">🎵</span>
                    </div>
                    <p className="text-gray-300">強制リクエスト: {selectedPerson[1]}曲</p>
                  </div>
                </div>
              )}
              
              {hasRight(selectedPerson[2]) && (
                <div 
                  onClick={() => setSelectedBenefit(getBenefitByTitle('10k'))}
                  className="bg-deep-blue/50 p-4 md:p-6 rounded-xl border border-light-blue/20 cursor-pointer hover:border-amber transition-all text-center flex flex-col overflow-hidden"
                >
                  {/* ボトルラベル */}
                  {getBenefitByTitle('10k')?.[4] && (
                    <div className="mb-4 pb-3 border-b border-amber/30 bg-amber/10 -mx-4 md:-mx-6 -mt-4 md:-mt-6 px-4 md:px-6 py-3 rounded-t-xl">
                      <div className="flex items-center justify-center pt-1">
                        <span className="text-sm md:text-base text-amber font-body">{getBenefitByTitle('10k')[0]} {getBenefitByTitle('10k')[4]}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-3xl">🎮</span>
                    </div>
                    <p className="text-gray-300">権利: {selectedPerson[2]}回分</p>
                  </div>
                </div>
              )}
              
              {hasRight(selectedPerson[3]) && (
                <div 
                  onClick={() => setSelectedBenefit(getBenefitByTitle('20k'))}
                  className="bg-deep-blue/50 p-4 md:p-6 rounded-xl border border-light-blue/20 cursor-pointer hover:border-amber transition-all text-center flex flex-col overflow-hidden"
                >
                  {/* ボトルラベル */}
                  {getBenefitByTitle('20k')?.[4] && (
                    <div className="mb-4 pb-3 border-b border-amber/30 bg-amber/10 -mx-4 md:-mx-6 -mt-4 md:-mt-6 px-4 md:px-6 py-3 rounded-t-xl">
                      <div className="flex items-center justify-center pt-1">
                        <span className="text-sm md:text-base text-amber font-body">{getBenefitByTitle('20k')[0]} {getBenefitByTitle('20k')[4]}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-3xl">💬</span>
                    </div>
                    <p className="text-gray-300">オープンチャット招待済</p>
                  </div>
                </div>
              )}
              
              {hasRight(selectedPerson[4]) && (
                <div 
                  onClick={() => setSelectedBenefit(getBenefitByTitle('30k'))}
                  className="bg-deep-blue/50 p-4 md:p-6 rounded-xl border border-light-blue/20 cursor-pointer hover:border-amber transition-all text-center flex flex-col overflow-hidden"
                >
                  {/* ボトルラベル */}
                  {getBenefitByTitle('30k')?.[4] && (
                    <div className="mb-4 pb-3 border-b border-amber/30 bg-amber/10 -mx-4 md:-mx-6 -mt-4 md:-mt-6 px-4 md:px-6 py-3 rounded-t-xl">
                      <div className="flex items-center justify-center pt-1">
                        <span className="text-sm md:text-base text-amber font-body">{getBenefitByTitle('30k')[0]} {getBenefitByTitle('30k')[4]}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-3xl">🎤</span>
                    </div>
                    <p className="text-gray-300">アカペラ音源: {selectedPerson[4]}回</p>
                  </div>
                </div>
              )}
              
              {hasRight(selectedPerson[5]) && (
                <div 
                  onClick={() => setSelectedBenefit(getBenefitByTitle('40k'))}
                  className="bg-deep-blue/50 p-4 md:p-6 rounded-xl border border-light-blue/20 cursor-pointer hover:border-amber transition-all text-center flex flex-col overflow-hidden"
                >
                  {/* ボトルラベル */}
                  {getBenefitByTitle('40k')?.[4] && (
                    <div className="mb-4 pb-3 border-b border-amber/30 bg-amber/10 -mx-4 md:-mx-6 -mt-4 md:-mt-6 px-4 md:px-6 py-3 rounded-t-xl">
                      <div className="flex items-center justify-center pt-1">
                        <span className="text-sm md:text-base text-amber font-body">{getBenefitByTitle('40k')[0]} {getBenefitByTitle('40k')[4]}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-3xl">⚡</span>
                    </div>
                    <p className="text-gray-300">強制リクエスト: {selectedPerson[5]}曲</p>
                  </div>
                </div>
              )}
              
              {hasRight(selectedPerson[6]) && (
                <div 
                  onClick={() => setSelectedBenefit(getBenefitByTitle('50k'))}
                  className="bg-deep-blue/50 p-4 md:p-6 rounded-xl border border-light-blue/20 cursor-pointer hover:border-amber transition-all text-center flex flex-col overflow-hidden"
                >
                  {/* ボトルラベル */}
                  {getBenefitByTitle('50k')?.[4] && (
                    <div className="mb-4 pb-3 border-b border-amber/30 bg-amber/10 -mx-4 md:-mx-6 -mt-4 md:-mt-6 px-4 md:px-6 py-3 rounded-t-xl">
                      <div className="flex items-center justify-center pt-1">
                        <span className="text-sm md:text-base text-amber font-body">{getBenefitByTitle('50k')[0]} {getBenefitByTitle('50k')[4]}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-3xl">🏆</span>
                    </div>
                    <p className="text-gray-300">ミックス音源獲得済</p>
                  </div>
                </div>
              )}
              
              {hasRight(selectedPerson[7]) && (
                <div 
                  onClick={() => setSelectedBenefit(getBenefitByTitle('メンバーシップ'))}
                  className="bg-deep-blue/50 p-4 md:p-6 rounded-xl border border-amber/30 bg-gradient-to-r from-gold/10 to-transparent cursor-pointer hover:border-amber transition-all text-center flex flex-col overflow-hidden"
                >
                  {/* ボトルラベル */}
                  {getBenefitByTitle('メンバーシップ')?.[4] && (
                    <div className="mb-4 pb-3 border-b border-amber/30 bg-amber/10 -mx-4 md:-mx-6 -mt-4 md:-mt-6 px-4 md:px-6 py-3 rounded-t-xl">
                      <div className="flex items-center justify-center pt-1">
                        <span className="text-sm md:text-base text-amber font-body">{getBenefitByTitle('メンバーシップ')[0]} {getBenefitByTitle('メンバーシップ')[4]}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-3xl">👑</span>
                    </div>
                    <p className="text-gray-300">月内リクエスト対応中</p>
                  </div>
                </div>
              )}
              
              {selectedPerson[8] && (
                <div className="bg-gradient-to-r from-amber/20 to-light-blue/20 p-6 rounded-xl border border-amber/30 text-center">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-3xl">✨</span>
                    <h3 className="text-xl font-body text-amber">Special権利</h3>
                  </div>
                  <p className="text-gray-300">{selectedPerson[8]}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 特典説明ポップアップ */}
      {selectedBenefit && (
        <div 
          onClick={() => setSelectedBenefit(null)}
          className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-[60]"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="glass-effect rounded-2xl p-8 border border-light-blue/30 max-w-md w-full relative"
          >
            <button
              onClick={() => setSelectedBenefit(null)}
              className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-white transition-colors"
            >
              ×
            </button>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-5xl">{selectedBenefit[3]}</span>
              </div>
              <p className="text-lg font-bold mb-4 whitespace-pre-line">{selectedBenefit[1]}</p>
              <p className="text-sm text-gray-400">{selectedBenefit[2]}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
