import Link from "next/link";
import React from "react";
import { FaRegSadCry } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-gray-800 text-center py-12 px-6">
      <div className="mb-6 text-primary-500">
        <FaRegSadCry size={50} />
      </div>

      <h1 className="text-4xl font-extrabold text-white mb-4">
        404 - Page Not Found
      </h1>

      <p className="text-lg text-gray-300 mb-8">
        Sorry, we could not find the page you are looking for.
      </p>

      <div className="flex gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition"
        >
          Go to Homepage
        </Link>
        <a
          href="/contact"
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition"
        >
          Contact Support
        </a>
      </div>
      <footer className="mt-10 text-gray-500 text-sm">
        <p>&copy; 2024 Your Company. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default NotFoundPage;
