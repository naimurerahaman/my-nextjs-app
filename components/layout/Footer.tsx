"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-lg font-bold text-yellow-500">WorkConnect</p>
        <p className="text-gray-400 mt-2 text-sm">
          &copy; {new Date().getFullYear()} WorkConnect Service Provider Portal.
          All rights reserved.
        </p>
        <div className="flex justify-center gap-6 mt-4 text-gray-500 text-xs">
          <a href="#" className="hover:text-yellow-400">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-yellow-400">
            Terms of Service
          </a>
          <a href="#" className="hover:text-yellow-400">
            Help Center
          </a>
        </div>
      </div>
    </footer>
  );
}
