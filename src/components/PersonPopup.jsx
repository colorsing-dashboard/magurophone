import { useConfig } from '../context/ConfigContext'
import { BENEFIT_FIELDS } from './BenefitPopup'
import IconRenderer from './IconRenderer'

const RIGHTS_NAME_INDEX = 0
const RIGHTS_SPECIAL_INDEX = 8

// 権利を持っているかチェック
const hasRight = (value) => {
  if (typeof value === 'string') {
    const normalized = value.trim().toUpperCase()
    if (normalized === 'TRUE') return true
    const parsed = Number(normalized)
    return Number.isFinite(parsed) && parsed > 0
  }
  return value > 0
}

const PersonPopup = ({ person, benefits, onClose, onSelectBenefit }) => {
  const config = useConfig()

  if (!person) return null

  const getBenefitByTitle = (title) => {
    return benefits.find(b => b[BENEFIT_FIELDS.TITLE] === title)
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/70 flex items-start justify-center p-4 z-50 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-effect rounded-2xl p-8 border border-card-border/30 box-glow-soft max-w-2xl w-full relative my-8 max-h-[90vh] flex flex-col"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-white transition-colors z-10"
        >
          ×
        </button>

        <h2 className="text-2xl md:text-4xl font-body mb-4 md:mb-8 text-glow-soft text-highlight flex-shrink-0 text-center">
          {person[RIGHTS_NAME_INDEX]}
        </h2>

        <div className="space-y-6 overflow-y-auto pr-2 flex-1">
          {config.benefitTiers.map((tier) => {
            const value = person[tier.columnIndex]
            if (!hasRight(value)) return null

            const benefit = getBenefitByTitle(tier.key)
            const displayText = tier.isBoolean
              ? tier.displayTemplate
              : tier.displayTemplate.replace('{value}', value)

            return (
              <div
                key={tier.key}
                onClick={() => benefit && onSelectBenefit(benefit)}
                className={`bg-deep-blue/50 p-4 md:p-6 rounded-xl border cursor-pointer hover:border-card-hover transition-all text-center flex flex-col overflow-hidden ${
                  tier.isMembership
                    ? 'border-highlight/30 bg-gradient-to-r from-gold/10 to-transparent'
                    : 'border-card-border/20'
                }`}
              >
                {benefit?.[BENEFIT_FIELDS.LABEL] && (
                  <div className="mb-4 pb-3 border-b border-amber/30 bg-amber/10 -mx-4 md:-mx-6 -mt-4 md:-mt-6 px-4 md:px-6 py-3 rounded-t-xl">
                    <div className="flex items-center justify-center pt-1">
                      <span className="text-sm md:text-base text-amber font-body">
                        {benefit[BENEFIT_FIELDS.TITLE]} {benefit[BENEFIT_FIELDS.LABEL]}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex-1">
                  <div className="flex items-center justify-center mb-2">
                    <IconRenderer icon={tier.icon} size={32} className="text-highlight" />
                  </div>
                  <p className="text-gray-300">{displayText}</p>
                </div>
              </div>
            )
          })}

          {/* Special権利 */}
          {person[RIGHTS_SPECIAL_INDEX] && (
            <div className="bg-gradient-to-r from-amber/20 to-light-blue/20 p-6 rounded-xl border border-amber/30 text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-3xl">✨</span>
                <h3 className="text-xl font-body text-amber">{config.ui.specialRightLabel}</h3>
              </div>
              <p className="text-gray-300">{person[RIGHTS_SPECIAL_INDEX]}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export { hasRight, RIGHTS_NAME_INDEX, RIGHTS_SPECIAL_INDEX }
export default PersonPopup
