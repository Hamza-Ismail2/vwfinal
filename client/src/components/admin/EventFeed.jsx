import { useEffect, useState } from 'react';

const EventFeed = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/events');
      if (!res.ok) throw new Error('No backend');
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      // fallback to localStorage
      const local = JSON.parse(localStorage.getItem('vw_events') || '[]');
      setEvents(local.map(e => ({ _id: e.timestamp, name: e.name, params: e.params, createdAt: e.timestamp })));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) return <p className="text-gray-500">Loading events…</p>;

  return (
    <div className="bg-white shadow rounded-lg p-4 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Latest Analytics Events</h3>
        <button
          onClick={fetchEvents}
          className="text-sm text-blue-600 hover:underline"
        >
          Refresh
        </button>
      </div>
      <ul className="space-y-2 max-h-72 overflow-y-auto">
        {events.map((e) => (
          <li key={e._id} className="text-sm text-gray-700">
            <span className="font-medium">{e.name}</span>
            {' '}
            <span className="text-gray-400">({new Date(e.createdAt).toLocaleString()})</span>
          </li>
        ))}
        {events.length === 0 && <li>No events logged yet.</li>}
      </ul>
    </div>
  );
};

export default EventFeed; 