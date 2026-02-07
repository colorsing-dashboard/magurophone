import { useState, useEffect, useRef } from 'react'

const CountUp = ({ end, duration = 2000 }) => {
  const rawEnd = typeof end === 'number' ? end : parseInt(String(end).replace('k', ''), 10)
  const endNum = Number.isFinite(rawEnd) ? rawEnd : 0

  const [count, setCount] = useState(0)
  const hasAnimatedRef = useRef(false)
  const endNumRef = useRef(endNum)
  const durationRef = useRef(duration)

  endNumRef.current = endNum
  durationRef.current = duration

  useEffect(() => {
    if (hasAnimatedRef.current) {
      setCount(endNumRef.current)
      return
    }

    hasAnimatedRef.current = true
    const finalValue = endNumRef.current

    let animationFrameId
    let startTime = null

    const step = (timestamp) => {
      if (startTime === null) {
        startTime = timestamp
      }

      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / durationRef.current, 1)
      const nextValue = Math.floor(finalValue * progress)
      setCount(nextValue)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step)
      } else {
        setCount(finalValue)
      }
    }

    animationFrameId = requestAnimationFrame(step)

    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  return <span>{count}k</span>
}

export default CountUp
