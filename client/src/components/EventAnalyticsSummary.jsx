import { useEffect, useState } from 'react';

const MINUTE = 60 * 1000;

function fetchLocalEvents() {
  return JSON.parse(localStorage.getItem('vw_events') || '[]');
}

const EventAnalyticsSummary = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/events');
      if (!res.ok) throw new Error('No backend');
      const data = await res.json();
      setEvents(data);
    } catch (_) {
      // fallback to localStorage
      setEvents(fetchLocalEvents());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const interval = setInterval(load, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p className="text-gray-500">Loading analytics…</p>;

  // Aggregate
  const pageCounts = {};
  events.forEach((e) => {
    if (e.name !== 'page_view') return;
    const path = e.params?.path || e.params?.page_path || 'unknown';
    pageCounts[path] = (pageCounts[path] || 0) + 1;
  });

  const pageRows = Object.entries(pageCounts).sort((a, b) => b[1] - a[1]);

  // Active users in last 5 minutes (approx page views)
  const now = Date.now();
  const activeViews = events.filter(
    (e) => e.name === 'page_view' && now - (e.createdAt || e.timestamp) < 5 * MINUTE
  ).length;

  return (
    <div className="bg-white shadow rounded-lg p-4 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Page Views Summary</h3>
        <span className="text-sm text-gray-600">Active (5 min): {activeViews}</span>
      </div>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th className="py-2 pr-4">Path</th>
            <th className="py-2">Views</th>
          </tr>
        </thead>
        <tbody>
          {pageRows.map(([path, count]) => (
            <tr key={path} className="border-t border-gray-200">
              <td className="py-2 pr-4 text-gray-800">{path}</td>
              <td className="py-2 text-gray-800">{count}</td>
            </tr>
          ))}
          {pageRows.length === 0 && (
            <tr>
              <td colSpan="2" className="py-4 text-center text-gray-500">
                No data yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EventAnalyticsSummary; 