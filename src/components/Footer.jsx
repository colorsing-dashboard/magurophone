import { useConfig } from '../context/ConfigContext'

const Footer = () => {
  const config = useConfig()

  return (
    <footer className="text-center py-8 border-t border-card-border/30">
      <p className="text-xl font-body mb-4">{config.brand.footerText}</p>
      <p className="text-gray-400">{config.brand.footerSubText}</p>
      {config.brand.footerNote && (
        <p className="text-sm text-gray-500 mt-4">{config.brand.footerNote}</p>
      )}
    </footer>
  )
}

export default Footer
