import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const today = new Date().toISOString().split('T')[0]
    const thisMonth = new Date().toISOString().slice(0, 7)

    // 총 방문자 수 조회
    const { data: totalData } = await supabase
      .from('total_visitors')
      .select('total_count')
      .eq('id', 1)
      .single()

    // 오늘 방문자 수 조회
    const { data: todayData } = await supabase
      .from('visitor_stats')
      .select('daily_count')
      .eq('date', today)
      .single()

    // 이번 달 방문자 수 조회
    const { data: monthlyData } = await supabase
      .from('visitor_stats')
      .select('daily_count')
      .gte('date', `${thisMonth}-01`)
      .lt('date', `${thisMonth}-32`)

    const thisMonthTotal = monthlyData?.reduce((sum, day) => sum + (day.daily_count || 0), 0) || 0

    return NextResponse.json({
      total: totalData?.total_count || 0,
      today: todayData?.daily_count || 0,
      thisMonth: thisMonthTotal,
    })
  } catch (error) {
    console.error('Error fetching visitor stats:', error)
    return NextResponse.json({ total: 0, today: 0, thisMonth: 0 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const today = new Date().toISOString().split('T')[0]

    // Check if this is a new visitor (using a simple session-based approach)
    const sessionId = request.headers.get('x-session-id')

    if (sessionId) {
      // 총 방문자 수 증가
      await supabase
        .from('total_visitors')
        .update({
          total_count: supabase.raw('total_count + 1'),
          updated_at: new Date().toISOString(),
        })
        .eq('id', 1)

      // 오늘 방문자 수 증가 (upsert)
      await supabase.from('visitor_stats').upsert(
        {
          date: today,
          daily_count: supabase.raw('daily_count + 1'),
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: 'date',
          ignoreDuplicates: false,
        }
      )
    }

    // 업데이트된 통계 조회 및 반환
    const updatedStats = await GET()
    return updatedStats
  } catch (error) {
    console.error('Error updating visitor stats:', error)
    return NextResponse.json({ total: 0, today: 0, thisMonth: 0 })
  }
}
