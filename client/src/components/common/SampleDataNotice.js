/**
 * SampleDataNotice
 *
 * A thin, full-width alert strip shown when the UI is rendering fallback
 * sample data because the live API was unavailable or returned no data.
 * Keeps users (and developers) from mistaking demo content for live data.
 */
const SampleDataNotice = ({
  message = "Showing sample data — live data is currently unavailable.",
}) => {
  return (
    <div
      role="status"
      className="flex items-center justify-center gap-2 border-b border-amber-300 bg-amber-100/70 px-4 py-1.5 text-center text-xs font-medium tracking-wide text-amber-800"
    >
      <span aria-hidden="true">⚠️</span>
      <span>{message}</span>
    </div>
  );
};

export default SampleDataNotice;
