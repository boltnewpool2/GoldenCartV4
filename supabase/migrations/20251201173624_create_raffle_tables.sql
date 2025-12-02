/*
  # Golden Cart Raffle Database Schema

  1. New Tables
    - `raffles`
      - `id` (uuid, primary key)
      - `week_number` (integer, unique) - Week 1-6
      - `status` (text) - 'completed', 'active', 'coming_soon'
      - `prize_amount` (integer) - $300
      - `draw_date` (timestamptz) - When the raffle will be drawn
      - `created_at` (timestamptz)
    
    - `contestants`
      - `id` (uuid, primary key)
      - `raffle_id` (uuid, foreign key to raffles)
      - `name` (text)
      - `supervisor` (text)
      - `department` (text)
      - `created_at` (timestamptz)
    
    - `winners`
      - `id` (uuid, primary key)
      - `raffle_id` (uuid, foreign key to raffles, unique)
      - `contestant_id` (uuid, foreign key to contestants)
      - `announced_at` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (raffle is public-facing)
*/

CREATE TABLE IF NOT EXISTS raffles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  week_number integer UNIQUE NOT NULL,
  status text NOT NULL DEFAULT 'coming_soon',
  prize_amount integer NOT NULL DEFAULT 300,
  draw_date timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contestants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  raffle_id uuid REFERENCES raffles(id) ON DELETE CASCADE,
  name text NOT NULL,
  supervisor text NOT NULL,
  department text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS winners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  raffle_id uuid UNIQUE REFERENCES raffles(id) ON DELETE CASCADE,
  contestant_id uuid REFERENCES contestants(id) ON DELETE CASCADE,
  announced_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE raffles ENABLE ROW LEVEL SECURITY;
ALTER TABLE contestants ENABLE ROW LEVEL SECURITY;
ALTER TABLE winners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view raffles"
  ON raffles FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can view contestants"
  ON contestants FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can view winners"
  ON winners FOR SELECT
  TO anon
  USING (true);

CREATE INDEX IF NOT EXISTS idx_contestants_raffle_id ON contestants(raffle_id);
CREATE INDEX IF NOT EXISTS idx_winners_raffle_id ON winners(raffle_id);