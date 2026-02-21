import { useConfig } from '../context/ConfigContext'
import { BENEFIT_FIELDS } from '../components/BenefitPopup'
import IconRenderer from '../components/IconRenderer'

const MenuView = ({ benefits, onSelectBenefit }) => {
  const config = useConfig()
  const tiers = config.benefitTiers || []

  return (
    <section>
      <h2 className="text-2xl md:text-4xl font-body mb-6 md:mb-12 text-center text-glow-soft text-primary">{config.menu.title}</h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.filter(b => b[BENEFIT_FIELDS.TITLE]).map((benefit, index) => (
          <div
            key={index}
            onClick={(e) => {
              const hasLabel = !!benefit[BENEFIT_FIELDS.LABEL]
              if (!hasLabel || window.matchMedia('(max-width: 767.98px)').matches) {
                onSelectBenefit(benefit)
              }
            }}
            className={`group glass-effect rounded-2xl md:p-6 border border-card-border/30 transition-all text-center overflow-hidden flex flex-col ${
              benefit[BENEFIT_FIELDS.LABEL]
                ? 'hover:border-card-hover md:hover:border-card-border/30 hover:scale-105 md:hover:scale-100 cursor-pointer md:cursor-default'
                : 'hover:border-card-hover hover:scale-105 cursor-pointer'
            }`}
          >
            {/* モバイル版：簡略表示 */}
            <div className="md:hidden py-3 px-4 bg-highlight/10 rounded-2xl relative flex-1">
              <div className="absolute top-2 left-2">
                <span className="text-xs font-bold text-highlight font-body">{benefit[BENEFIT_FIELDS.TITLE]}</span>
              </div>
              <div className="pt-6">
                <p className="text-sm text-highlight font-body whitespace-pre-line">{benefit[BENEFIT_FIELDS.LABEL] || benefit[BENEFIT_FIELDS.NAME]}</p>
              </div>
            </div>

            {/* ボトルラベル（PC版のみ） */}
            {benefit[BENEFIT_FIELDS.LABEL] && (
              <div className="hidden md:block py-3 px-4 md:px-6 bg-highlight/10 rounded-2xl md:rounded-t-2xl md:mb-4 md:pb-3 md:border-b border-card-hover/30 md:-mx-6 md:-mt-6">
                <div className="flex items-center justify-center pt-1">
                  <span className="text-sm md:text-base text-highlight font-body">{benefit[BENEFIT_FIELDS.TITLE]} {benefit[BENEFIT_FIELDS.LABEL]}</span>
                </div>
              </div>
            )}

            {/* PC版：フル表示 */}
            <div className="hidden md:block flex-1">
              <div className="flex items-center justify-center mb-2 md:mb-4">
                {(() => {
                  const title = String(benefit[BENEFIT_FIELDS.TITLE] || '').trim()
                  const tier = tiers.find(t => t.key === title)
                  if (!tier) return null
                  const floatClass = config.effects?.iconFloat !== false ? 'animate-float' : ''
                  return <span className={floatClass}><IconRenderer icon={tier.icon} size={48} className="text-highlight" /></span>
                })()}
              </div>
              <p className="text-base md:text-lg font-bold mb-1 md:mb-2 whitespace-pre-line text-content-text">{benefit[BENEFIT_FIELDS.NAME]}</p>
              <p className="text-xs md:text-sm text-content-text/70 whitespace-pre-line">{benefit[BENEFIT_FIELDS.DESCRIPTION]}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default MenuView
