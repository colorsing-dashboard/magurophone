import { useConfig } from '../context/ConfigContext'
import { convertDriveUrl } from '../lib/sheets'
import CountUp from '../components/CountUp'

const RANKING_FIELDS = { RANK: 0, NAME: 1, POINTS: 2, IMAGE: 3 }
const GOAL_FIELDS = { THIS_WEEK: 0, THIS_MONTH: 1 }

const HomeView = ({ ranking, goals }) => {
  const config = useConfig()

  return (
    <>
      {/* ランキング */}
      <section className="text-center">
        <h2 className="text-2xl md:text-4xl font-body mb-4 md:mb-8 text-glow-soft text-primary">{config.home.rankingTitle}</h2>
        <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 md:gap-6">
          {ranking.slice(0, 3).map((person, index) => (
            <div
              key={`${person[RANKING_FIELDS.NAME] ?? 'rank'}-${index}`}
              className={`glass-effect rounded-2xl p-4 md:p-8 border transition-all hover:scale-105 water-shimmer ${index === 0 ? 'box-glow-soft' : 'border-card-border/30'}`}
              style={index === 0 ? { borderColor: `var(--color-rank1-card, var(--base-accent))` } : undefined}
            >
              <div className="mb-2 md:mb-4 flex justify-center">
                {person[RANKING_FIELDS.IMAGE] && (
                  <img
                    src={convertDriveUrl(person[RANKING_FIELDS.IMAGE], 128)}
                    alt={`${index + 1}位`}
                    className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-full"
                  />
                )}
              </div>
              <div className="text-xs md:text-2xl font-body mb-1 md:mb-2 text-name-text whitespace-nowrap overflow-hidden h-4 md:h-8">{person[RANKING_FIELDS.NAME]}</div>
              <div
                className={`text-2xl md:text-4xl font-black ${index !== 0 ? 'text-highlight' : ''}`}
                style={index === 0 ? { color: `var(--color-rank1-card, var(--base-accent))` } : undefined}
              >
                <CountUp end={person[RANKING_FIELDS.POINTS]} />
              </div>
              <div className="text-xs md:text-sm text-gray-400 mt-1 md:mt-2">{config.home.pointsLabel}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 目標 */}
      <section className="text-center">
        <h2 className="text-2xl md:text-4xl font-body mb-4 md:mb-8 text-glow-soft text-primary">{config.home.targetsTitle}</h2>
        <div className="grid grid-cols-2 gap-3 md:gap-6 max-w-4xl mx-auto">
          {config.home.targetLabels.map((label, colIndex) => (
            <div
              key={colIndex}
              className={`glass-effect rounded-2xl p-4 md:p-6 border border-card-hover/30 ${
                goals.length === 0 || !goals[0] || !goals[0][colIndex] ? 'opacity-50' : ''
              }`}
            >
              <h3 className="text-lg md:text-2xl font-body mb-2 md:mb-4 text-primary">{label}</h3>
              {goals.map((goal, index) => (
                goal[colIndex] && (
                  <div key={`goal-${colIndex}-${index}`} className="text-sm md:text-lg mb-2 md:mb-4 last:mb-0 text-content-text">
                    <span className="text-highlight">▸</span> {goal[colIndex]}
                  </div>
                )
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      {config.home.faq.enabled !== false && config.home.faq.items.length > 0 && (
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-body mb-8 text-center text-glow-soft text-highlight">{config.home.faq.title}</h2>
          <div className="glass-effect rounded-2xl p-8 border border-card-border/30 space-y-6">
            {config.home.faq.items.map((item, index) => (
              <div key={`faq-${index}-${item.question}`}>
                <h3 className="text-xl font-body text-highlight mb-2">▸ {item.question}</h3>
                <p className="text-content-text ml-6">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  )
}

export default HomeView
