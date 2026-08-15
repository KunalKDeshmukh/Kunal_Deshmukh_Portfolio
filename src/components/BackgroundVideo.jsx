import { useEffect, useRef } from 'react'

/**
 * Fixed, full-viewport looping background video with a dark scrim on top
 * so text stays readable. Replaces the flat black background.
 */
export default function BackgroundVideo() {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      video.pause()
    } else {
      // Autoplay can still be blocked by some browsers until this fires.
      video.play().catch(() => {})
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-ink">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/hero-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
      {/* dark scrim for text contrast */}
      <div className="absolute inset-0 bg-ink/70" />
      {/* extra darkening at top/bottom so nav and footer stay legible */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-transparent to-ink/85" />
    </div>
  )
}
