import { useState, useEffect, useRef } from 'react'

const CountUp = ({ end, duration = 2000 }) => {
  const rawEnd = typeof end === 'number' ? end : parseInt(String(end).replace('k', ''), 10)
  const endNum = Number.isFinite(rawEnd) ? rawEnd : 0

  const [count, setCount] = useState(0)
  const hasAnimatedRef = useRef(false)
  const durationRef = useRef(duration)

  durationRef.current = duration

  useEffect(() => {
    if (hasAnimatedRef.current) {
      setCount(endNum)
      return
    }

    hasAnimatedRef.current = true

    let animationFrameId
    let startTime = null

    const step = (timestamp) => {
      if (startTime === null) {
        startTime = timestamp
      }

      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / durationRef.current, 1)
      const nextValue = Math.floor(endNum * progress)
      setCount(nextValue)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step)
      } else {
        setCount(endNum)
      }
    }

    animationFrameId = requestAnimationFrame(step)

    return () => cancelAnimationFrame(animationFrameId)
  }, [endNum])

  return <span>{count}k</span>
}

export default CountUp
