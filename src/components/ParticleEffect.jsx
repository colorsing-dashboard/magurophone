import { useConfig } from '../context/ConfigContext'

const PARTICLES = [
  { left: '10%', size: 40, delay: 0, duration: 12 },
  { left: '25%', size: 20, delay: 2, duration: 14 },
  { left: '45%', size: 30, delay: 4, duration: 11 },
  { left: '65%', size: 25, delay: 1, duration: 16 },
  { left: '80%', size: 35, delay: 3, duration: 13 },
  { left: '90%', size: 15, delay: 5, duration: 10 },
]

const getShapeStyle = (type, size, color) => {
  const base = { width: size, height: size, background: color }

  if (type === 'bubble') {
    return { ...base, borderRadius: '50%' }
  }

  if (type === 'star') {
    return {
      width: size,
      height: size,
      background: 'transparent',
      clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
      backgroundColor: color,
    }
  }

  if (type === 'heart') {
    return {
      width: size,
      height: size,
      background: 'transparent',
      clipPath: 'path("M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z")',
      backgroundColor: color,
      // clip-path path() doesn't scale well, use a different approach
    }
  }

  return base
}

// ハート型はSVGベースのほうが確実
const HeartShape = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
)

// 星型もSVGベース
const StarShape = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const ParticleEffect = () => {
  const config = useConfig()
  const effects = config.effects || {}
  const type = effects.particles || 'bubble'
  const direction = effects.particleDirection || 'up'
  const sizeScale = effects.particleSize || 1
  const customColor = effects.particleColor || ''

  if (type === 'none') return null

  const defaultColor = 'rgba(138, 180, 248, 0.08)'
  const color = customColor || defaultColor

  const isDown = direction === 'down'
  const animName = isDown ? 'particleFall' : 'particleRise'

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <style>{`
        @keyframes particleRise {
          0% { bottom: -10%; top: auto; opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.3; }
          100% { bottom: 110%; top: auto; opacity: 0; }
        }
        @keyframes particleFall {
          0% { top: -10%; bottom: auto; opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.3; }
          100% { top: 110%; bottom: auto; opacity: 0; }
        }
      `}</style>
      {PARTICLES.map((p, i) => {
        const size = Math.round(p.size * sizeScale)
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: p.left,
              animation: `${animName} ${p.duration}s ease-in infinite`,
              animationDelay: `${p.delay}s`,
              ...(isDown ? { top: '-10%' } : { bottom: '-10%' }),
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
  )
}

export default ParticleEffect
