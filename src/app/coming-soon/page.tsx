import Link from 'next/link';

export default function UnderConstruction() {
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="text-center p-8 bg-blue-800 rounded-lg shadow-lg">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 animate-pulse">
          🚧 Page Under Construction 🚧
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-6 animate-bounce">
          We're working hard to bring this page to life!
        </p>
        <p className="text-gray-400 mb-6">
          Please check back soon or explore other parts of the site.
        </p>
        <Link href="/" className="text-lg text-blue-400 hover:text-blue-600 transition duration-300">
            Go Back Home
        </Link>
      </div>
    </div>
  );
}
