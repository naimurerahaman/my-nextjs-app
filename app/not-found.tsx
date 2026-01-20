export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-black">
      <h1 className="text-6xl font-bold text-yellow-500">404</h1>
      <p className="text-xl mt-4">Oops! This page doesn't exist.</p>
      <a href="/" className="mt-6 bg-blue-600 text-white px-6 py-2 rounded">
        Back Home
      </a>
    </div>
  );
}
