'use client'

import { useEffect, useState } from 'react'

interface VisitorStats {
  total: number
  today: number
  thisMonth: number
}

export default function VisitorCounter() {
  const [stats, setStats] = useState<VisitorStats>({
    total: 0,
    today: 0,
    thisMonth: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const trackVisit = async () => {
      try {
        // Generate or get session ID
        let sessionId = localStorage.getItem('visitor-session-id')
        if (!sessionId) {
          sessionId = Date.now().toString() + Math.random().toString(36).substr(2, 9)
          localStorage.setItem('visitor-session-id', sessionId)

          // Only track new visits
          await fetch('/api/visitors', {
            method: 'POST',
            headers: {
              'x-session-id': sessionId,
            },
          })
        }

        // Always fetch current stats
        const response = await fetch('/api/visitors')
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error('Failed to track visit:', error)
      } finally {
        setIsLoading(false)
      }
    }

    trackVisit()
  }, [])

  return (
    <div className="mb-8 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
      <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
        블로그 방문 현황
      </h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {isLoading ? (
              <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent dark:border-blue-400" />
            ) : (
              stats.total.toLocaleString()
            )}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">총 방문자</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {isLoading ? (
              <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-green-600 border-t-transparent dark:border-green-400" />
            ) : (
              stats.thisMonth.toLocaleString()
            )}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">이번 달</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {isLoading ? (
              <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-purple-600 border-t-transparent dark:border-purple-400" />
            ) : (
              stats.today.toLocaleString()
            )}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">오늘</div>
        </div>
      </div>
    </div>
  )
}
