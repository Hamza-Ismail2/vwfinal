import { useEffect, useState } from 'react';

const MINUTE = 60 * 1000;
function fetchLocal() {
  return JSON.parse(localStorage.getItem('vw_events') || '[]');
}

const RealTimeAnalytics = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  // UI state for collapsing/expanding long tables
  const [showAllPages, setShowAllPages] = useState(false);
  const [showAllButtons, setShowAllButtons] = useState(false);
  const [userSet, setUserSet] = useState(new Set());
  const [activeViews, setActiveViews] = useState(0);

  const load = async (showLoading = false) => {
    if (showLoading) setLoading(true);
    try {
      const res = await fetch('/api/events');
      if (!res.ok) throw new Error('no backend');
      setEvents(await res.json());
    } catch (_) {
      setEvents(fetchLocal());
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    load(true); // first load, show spinner
    const t = setInterval(() => load(false), 10000); // silent refreshes
    return () => clearInterval(t);
  }, []);

  if (loading) return null;

  // Aggregations
  const pageCounts = {};
  const buttonCounts = {};
  const now = Date.now();

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

  // Derive max counts for inline bar visuals
  const maxPageCount = pageRows.length ? pageRows[0][1] : 0;
  const maxButtonCount = buttonRows.length ? buttonRows[0].count : 0;

  // Slice rows when collapsed
  const displayPages = showAllPages ? pageRows : pageRows.slice(0, 5);
  const displayButtons = showAllButtons ? buttonRows : buttonRows.slice(0, 5);

  return (
    <section className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/30 rounded-2xl p-6 my-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-100">Real-Time Analytics</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-slate-700/50 rounded border border-slate-600/30">
          <p className="text-sm text-gray-400">Active Views (5 min)</p>
          <p className="text-3xl font-semibold text-white">{activeViews}</p>
        </div>
        <div className="p-4 bg-slate-700/50 rounded border border-slate-600/30">
          <p className="text-sm text-gray-400">Total Unique Users</p>
          <p className="text-3xl font-semibold text-white">{userSet.size}</p>
        </div>
      </div>

      <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-200">Top Pages</h3>
      <div className="max-h-72 overflow-y-auto rounded-md">
      <table className="min-w-full text-sm mb-2">
        <thead>
          <tr className="text-left text-gray-400 sticky top-0 bg-slate-800/80 backdrop-blur-sm">
            <th className="py-2 pr-4">Path</th>
            <th className="py-2">Views</th>
          </tr>
        </thead>
        <tbody>
          {displayPages.map(([path, count]) => (
            <tr key={path} className="border-t border-slate-600/30">
              <td className="py-2 pr-4 text-gray-100 whitespace-nowrap">{path}</td>
              <td className="py-2 text-gray-100 relative">
                <span className="absolute inset-0 bg-slate-600/40" style={{ width: `${(count / (maxPageCount || 1)) * 100}%` }}></span>
                <span className="relative z-10 pl-1">{count}</span>
              </td>
            </tr>
          ))}
          {pageRows.length === 0 && (
            <tr><td colSpan="2" className="py-4 text-center text-gray-400">No data</td></tr>
          )}
        </tbody>
      </table>
      </div>
      {pageRows.length > 5 && (
        <button onClick={() => setShowAllPages(!showAllPages)} className="text-xs text-blue-400 hover:underline mb-6">
          {showAllPages ? 'Show Less' : `Show All (${pageRows.length})`}
        </button>
      )}

      {/* Button Clicks */}
      <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-200">Button Clicks</h3>
      <div className="max-h-72 overflow-y-auto rounded-md">
      <table className="min-w-full text-sm mb-2">
        <thead>
          <tr className="text-left text-gray-400 sticky top-0 bg-slate-800/80 backdrop-blur-sm">
            <th className="py-2 pr-4">Button</th>
            <th className="py-2 pr-4">From Path</th>
            <th className="py-2">Clicks</th>
          </tr>
        </thead>
        <tbody>
          {displayButtons.map((row) => (
            <tr key={row.btn + row.from} className="border-t border-slate-600/30">
              <td className="py-2 pr-4 text-gray-100 whitespace-nowrap">{row.btn}</td>
              <td className="py-2 pr-4 text-gray-100 whitespace-nowrap">{row.from}</td>
              <td className="py-2 text-gray-100 relative">
                <span className="absolute inset-0 bg-slate-600/40" style={{ width: `${(row.count / (maxButtonCount || 1)) * 100}%` }}></span>
                <span className="relative z-10 pl-1">{row.count}</span>
              </td>
            </tr>
          ))}
          {buttonRows.length === 0 && (
            <tr><td colSpan="3" className="py-4 text-center text-gray-400">No clicks yet</td></tr>
          )}
        </tbody>
      </table>
      </div>
      {buttonRows.length > 5 && (
        <button onClick={() => setShowAllButtons(!showAllButtons)} className="text-xs text-blue-400 hover:underline mt-2">
          {showAllButtons ? 'Show Less' : `Show All (${buttonRows.length})`}
        </button>
      )}
    </section>
  );
};

export default RealTimeAnalytics; 