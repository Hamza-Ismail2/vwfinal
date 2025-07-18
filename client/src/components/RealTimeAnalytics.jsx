import { useEffect, useState } from 'react';

const MINUTE = 60 * 1000;
function fetchLocal() {
  return JSON.parse(localStorage.getItem('vw_events') || '[]');
}

const RealTimeAnalytics = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/events');
      if (!res.ok) throw new Error('no backend');
      setEvents(await res.json());
    } catch (_) {
      setEvents(fetchLocal());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const t = setInterval(load, 10000);
    return () => clearInterval(t);
  }, []);

  if (loading) return null;

  // Aggregations
  const pageCounts = {};
  const buttonCounts = {};
  const userSet = new Set();
  const now = Date.now();
  let activeViews = 0;

  events.forEach((e) => {
    userSet.add(e.params?.uid || '');
    if (e.name === 'page_view') {
      const path = e.params?.path || 'unknown';
      pageCounts[path] = (pageCounts[path] || 0) + 1;
      if (now - (e.createdAt || e.timestamp) < 5 * MINUTE) activeViews += 1;
    }
    if (e.name === 'button_click') {
      const btn = e.params?.button || 'unknown';
      const from = e.params?.from || 'unknown';
      const key = `${btn}@@${from}`;
      buttonCounts[key] = (buttonCounts[key] || 0) + 1;
    }
  });

  const pageRows = Object.entries(pageCounts).sort((a, b) => b[1] - a[1]);
  const buttonRows = Object.entries(buttonCounts).map(([key, count]) => {
    const [btn, from] = key.split('@@');
    return { btn, from, count };
  }).sort((a, b) => b.count - a.count);

  return (
    <section className="bg-white shadow rounded-lg p-6 my-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Real-Time Analytics</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gray-100 rounded">
          <p className="text-sm text-gray-500">Active Views (5 min)</p>
          <p className="text-3xl font-semibold text-gray-900">{activeViews}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded">
          <p className="text-sm text-gray-500">Total Unique Users</p>
          <p className="text-3xl font-semibold text-gray-900">{userSet.size}</p>
        </div>
      </div>

      <h3 className="text-lg font-semibold mt-4 mb-2">Top Pages</h3>
      <table className="min-w-full text-sm mb-6">
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
            <tr><td colSpan="2" className="py-4 text-center text-gray-500">No data</td></tr>
          )}
        </tbody>
      </table>

      {/* Button Clicks */}
      <h3 className="text-lg font-semibold mt-4 mb-2">Button Clicks</h3>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th className="py-2 pr-4">Button</th>
            <th className="py-2 pr-4">From Path</th>
            <th className="py-2">Clicks</th>
          </tr>
        </thead>
        <tbody>
          {buttonRows.map((row) => (
            <tr key={row.btn + row.from} className="border-t border-gray-200">
              <td className="py-2 pr-4 text-gray-800">{row.btn}</td>
              <td className="py-2 pr-4 text-gray-800">{row.from}</td>
              <td className="py-2 text-gray-800">{row.count}</td>
            </tr>
          ))}
          {buttonRows.length === 0 && (
            <tr><td colSpan="3" className="py-4 text-center text-gray-500">No clicks yet</td></tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default RealTimeAnalytics; 