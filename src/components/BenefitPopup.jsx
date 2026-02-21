import { useConfig } from '../context/ConfigContext'
import IconRenderer from './IconRenderer'

const BENEFIT_FIELDS = {
  TITLE: 0,
  LABEL: 1,
  NAME: 2,
  DESCRIPTION: 3,
  TRACK_HISTORY: 4,
}

const BenefitPopup = ({ benefit, onClose }) => {
  const config = useConfig()

  if (!benefit) return null

  const title = String(benefit[BENEFIT_FIELDS.TITLE] || '').trim()
  const tier = config.benefitTiers?.find(t => t.key === title)

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-[60]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-effect rounded-2xl p-8 border border-card-border/30 max-w-md w-full relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-white transition-colors"
        >
          ×
        </button>

        <div className="text-center">
          {tier && (
            <div className="flex items-center justify-center gap-3 mb-4">
              <IconRenderer icon={tier.icon} size={48} className="text-highlight" />
            </div>
          )}
          <p className="text-lg font-bold mb-4 whitespace-pre-line text-content-text">{benefit[BENEFIT_FIELDS.NAME]}</p>
          <p className="text-sm text-content-text/70 whitespace-pre-line">{benefit[BENEFIT_FIELDS.DESCRIPTION]}</p>
        </div>
      </div>
    </div>
  )
}

export { BENEFIT_FIELDS }
export default BenefitPopup
