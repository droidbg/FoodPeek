/**
 * SampleDataNotice
 *
 * A small, non-intrusive banner shown when the UI is rendering fallback
 * sample data because the live API was unavailable or returned no data.
 * Keeps users (and developers) from mistaking demo content for live data.
 */
const SampleDataNotice = ({
  message = "Showing sample data — live data is currently unavailable.",
}) => {
  return (
    <div
      role="status"
      className="mx-4 my-2 flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-800"
    >
      <span aria-hidden="true">⚠️</span>
      <span>{message}</span>
    </div>
  );
};

export default SampleDataNotice;
