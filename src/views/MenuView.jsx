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
        {benefits.map((benefit, index) => (
          <div
            key={index}
            onClick={(e) => {
              if (window.matchMedia('(max-width: 767.98px)').matches) {
                onSelectBenefit(benefit)
              }
            }}
            className="group glass-effect rounded-2xl md:p-6 border border-card-border/30 hover:border-card-hover md:hover:border-card-border/30 transition-all hover:scale-105 md:hover:scale-100 cursor-pointer md:cursor-default text-center overflow-hidden flex flex-col"
          >
            {/* モバイル版：簡略表示 */}
            <div className="md:hidden py-3 px-4 bg-highlight/10 rounded-2xl relative">
              <div className="absolute top-2 left-2">
                <span className="text-xs font-bold text-highlight font-body">{benefit[BENEFIT_FIELDS.TITLE]}</span>
              </div>
              <div className="pt-6">
                <span className="text-sm text-highlight font-body">{benefit[BENEFIT_FIELDS.LABEL]}</span>
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
                  const tier = tiers.find(t => t.key === benefit[BENEFIT_FIELDS.TITLE])
                  return tier ? (
                    <span className="animate-float"><IconRenderer icon={tier.icon} size={48} className="text-highlight" /></span>
                  ) : (
                    <span className="text-3xl md:text-5xl animate-float">{benefit[BENEFIT_FIELDS.ICON]}</span>
                  )
                })()}
              </div>
              <p className="text-base md:text-lg font-bold mb-1 md:mb-2 whitespace-pre-line">{benefit[BENEFIT_FIELDS.NAME]}</p>
              <p className="text-xs md:text-sm text-gray-400">{benefit[BENEFIT_FIELDS.DESCRIPTION]}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default MenuView
