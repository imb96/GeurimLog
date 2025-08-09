-- 방문자 통계 테이블 생성
CREATE TABLE IF NOT EXISTS visitor_stats (
  id SERIAL PRIMARY KEY,
  date DATE UNIQUE NOT NULL,
  daily_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 총 방문자 수 테이블 (단일 레코드)
CREATE TABLE IF NOT EXISTS total_visitors (
  id INTEGER PRIMARY KEY DEFAULT 1,
  total_count INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  CONSTRAINT single_record CHECK (id = 1)
);

-- 초기 데이터 삽입
INSERT INTO total_visitors (id, total_count) VALUES (1, 0) ON CONFLICT (id) DO NOTHING;

-- RLS (Row Level Security) 활성화
ALTER TABLE visitor_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE total_visitors ENABLE ROW LEVEL SECURITY;

-- 읽기 권한 정책 (모든 사용자가 읽을 수 있음)
CREATE POLICY "Enable read access for all users" ON visitor_stats FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON total_visitors FOR SELECT USING (true);

-- 서버에서만 쓸 수 있도록 하려면 service role key를 사용하거나, 
-- 여기서는 간단하게 insert/update 권한도 모든 사용자에게 부여 (프로덕션에서는 수정 필요)
CREATE POLICY "Enable insert access for all users" ON visitor_stats FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON visitor_stats FOR UPDATE USING (true);
CREATE POLICY "Enable update access for all users" ON total_visitors FOR UPDATE USING (true);