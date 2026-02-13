const BENEFIT_FIELDS = {
  TITLE: 0,
  NAME: 1,
  DESCRIPTION: 2,
  ICON: 3,
  LABEL: 4,
}

const BenefitPopup = ({ benefit, onClose }) => {
  if (!benefit) return null

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
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-5xl">{benefit[BENEFIT_FIELDS.ICON]}</span>
          </div>
          <p className="text-lg font-bold mb-4 whitespace-pre-line">{benefit[BENEFIT_FIELDS.NAME]}</p>
          <p className="text-sm text-gray-400">{benefit[BENEFIT_FIELDS.DESCRIPTION]}</p>
        </div>
      </div>
    </div>
  )
}

export { BENEFIT_FIELDS }
export default BenefitPopup
