'use client'

import { useEffect, useState } from 'react'

interface VisitorStats {
  total: number
  today: number
  thisMonth: number
}

export default function VisitorCounterHeader() {
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
    <div className="hidden items-center space-x-3 text-xs text-gray-600 dark:text-gray-400 sm:flex">
      <div className="flex items-center space-x-1">
        <span className="font-medium text-gray-900 dark:text-gray-100">
          {isLoading ? (
            <div className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600 align-middle dark:border-gray-600 dark:border-t-gray-300" />
          ) : (
            stats.total.toLocaleString()
          )}
        </span>
        <span>전체</span>
      </div>
      <div className="flex items-center space-x-1">
        <span className="font-medium text-gray-900 dark:text-gray-100">
          {isLoading ? (
            <div className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600 align-middle dark:border-gray-600 dark:border-t-gray-300" />
          ) : (
            stats.thisMonth.toLocaleString()
          )}
        </span>
        <span>이달</span>
      </div>
      <div className="flex items-center space-x-1">
        <span className="font-medium text-gray-900 dark:text-gray-100">
          {isLoading ? (
            <div className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600 align-middle dark:border-gray-600 dark:border-t-gray-300" />
          ) : (
            stats.today.toLocaleString()
          )}
        </span>
        <span>오늘</span>
      </div>
    </div>
  )
}
