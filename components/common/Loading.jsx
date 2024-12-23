export default function Loading() {
  return (
    <div class="relative flex items-center justify-center">
      {/* <!-- Spinner --> */}
      <div class="w-16 h-16 border-t-4 border-blue-500 border-opacity-75 rounded-full animate-spin-fast"></div>
      {/* <!-- Glow Pulse --> */}
      <div class="absolute w-24 h-24 rounded-full bg-blue-500 opacity-25 blur-3xl animate-pulse"></div>
    </div>
  );
}
