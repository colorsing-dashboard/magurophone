import { useConfig } from '../context/ConfigContext'

const PARTICLES = [
  { left: '10%', size: 40, delay: 0, duration: 12 },
  { left: '25%', size: 20, delay: 2, duration: 14 },
  { left: '45%', size: 30, delay: 4, duration: 11 },
  { left: '65%', size: 25, delay: 1, duration: 16 },
  { left: '80%', size: 35, delay: 3, duration: 13 },
  { left: '90%', size: 15, delay: 5, duration: 10 },
]

const HeartShape = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
)

const StarShape = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const hexToRgba = (hex, alpha) => {
  if (!hex) return null
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const KEYFRAMES_CSS = `
@keyframes particleRise {
  0% { transform: translateY(0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 0.6; }
  100% { transform: translateY(-110vh); opacity: 0; }
}
@keyframes particleFall {
  0% { transform: translateY(0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 0.6; }
  100% { transform: translateY(110vh); opacity: 0; }
}
`

const ParticleEffect = () => {
  const config = useConfig()
  const effects = config.effects || {}
  const type = effects.particles || 'bubble'
  const direction = effects.particleDirection || 'up'
  const sizeScale = effects.particleSize || 1
  const customColor = effects.particleColor || ''

  if (type === 'none') return null

  const color = customColor ? hexToRgba(customColor, 0.3) : 'rgba(138, 180, 248, 0.18)'
  const isDown = direction === 'down'
  const animName = isDown ? 'particleFall' : 'particleRise'

  return (
    <>
      <style>{KEYFRAMES_CSS}</style>
      <div style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}>
        {PARTICLES.map((p, i) => {
          const size = Math.round(p.size * sizeScale)
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: p.left,
                ...(isDown ? { top: '-5%' } : { bottom: '-5%' }),
                animation: `${animName} ${p.duration}s ease-in ${p.delay}s infinite`,
              }}
            >
              {type === 'heart' ? (
                <HeartShape size={size} color={color} />
              ) : type === 'star' ? (
                <StarShape size={size} color={color} />
              ) : (
                <div style={{ width: size, height: size, borderRadius: '50%', background: color }} />
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default ParticleEffect
