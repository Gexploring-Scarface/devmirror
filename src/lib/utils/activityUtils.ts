export function getLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 8) return 3;
  return 4;
}

export function generateActivitySeries(countsByDate: Map<string, number>): number[] {
  const series: number[] = [];
  const today = new Date();
  today.setHours(12, 0, 0, 0); 
  
  const dayOfWeek = today.getDay();
  const lastCellDate = new Date(today);
  lastCellDate.setDate(today.getDate() + (6 - dayOfWeek));
  
  for (let i = 363; i >= 0; i--) {
    const d = new Date(lastCellDate);
    d.setDate(lastCellDate.getDate() - i);
    
    if (d > today) {
      series.push(0);
      continue;
    }
    
    const dateStr = d.toISOString().split('T')[0];
    const count = countsByDate.get(dateStr) || 0;
    series.push(getLevel(count));
  }
  return series;
}
