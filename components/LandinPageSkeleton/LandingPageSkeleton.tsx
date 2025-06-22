import React from 'react';

const LandingPageSkeleton = () => {
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navbar Skeleton */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-lg">
            <div className="max-w-6xl mx-auto flex justify-between items-center px-6 md:px-12 py-5">
              <div className="h-8 w-32 bg-neutral-200 rounded-md animate-pulse"></div>
              <div className="hidden md:flex items-center gap-8">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-4 w-16 bg-neutral-200 rounded-md animate-pulse"
                  ></div>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-24 bg-neutral-200 rounded-full animate-pulse"></div>
              </div>
            </div>
          </header>

          {/* Hero Skeleton */}
          <section className="pt-32 pb-20 md:pt-40 md:pb-28">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-3/4 bg-neutral-200 rounded-md animate-pulse mb-6"></div>
              <div className="h-6 w-1/2 bg-neutral-200 rounded-md animate-pulse mb-8"></div>
              <div className="h-12 w-48 bg-purple-200 rounded-full animate-pulse"></div>
            </div>
          </section>

          {/* Featured Section Skeleton */}
          <section className="py-16">
            <div className="h-8 w-1/4 bg-neutral-200 rounded-md animate-pulse mb-12 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="h-6 w-6 bg-purple-200 rounded-full animate-pulse mb-4"></div>
                  <div className="h-5 w-3/4 bg-neutral-200 rounded-md animate-pulse mb-3"></div>
                  <div className="h-4 w-full bg-neutral-200 rounded-md animate-pulse mb-2"></div>
                  <div className="h-4 w-5/6 bg-neutral-200 rounded-md animate-pulse"></div>
                </div>
              ))}
            </div>
          </section>

          {/* How It Works Skeleton */}
          <section className="py-16">
            <div className="h-8 w-1/4 bg-neutral-200 rounded-md animate-pulse mb-12 mx-auto"></div>
            <div className="space-y-12">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex flex-col md:flex-row gap-8 items-center"
                >
                  <div className="h-40 w-full md:w-1/2 bg-neutral-200 rounded-lg animate-pulse"></div>
                  <div className="w-full md:w-1/2 space-y-4">
                    <div className="h-6 w-1/3 bg-neutral-200 rounded-md animate-pulse"></div>
                    <div className="h-5 w-full bg-neutral-200 rounded-md animate-pulse"></div>
                    <div className="h-5 w-5/6 bg-neutral-200 rounded-md animate-pulse"></div>
                    <div className="h-5 w-2/3 bg-neutral-200 rounded-md animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Security Section Skeleton */}
          <section className="py-16">
            <div className="h-8 w-1/4 bg-neutral-200 rounded-md animate-pulse mb-12 mx-auto"></div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="h-6 w-1/2 bg-neutral-200 rounded-md animate-pulse"></div>
                  <div className="h-5 w-full bg-neutral-200 rounded-md animate-pulse"></div>
                  <div className="h-5 w-5/6 bg-neutral-200 rounded-md animate-pulse"></div>
                </div>
                <div className="h-64 bg-neutral-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </section>

          {/* Footer Skeleton */}
          <footer className="py-12 border-t border-neutral-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="space-y-4">
                  <div className="h-5 w-1/2 bg-neutral-200 rounded-md animate-pulse"></div>
                  <div className="space-y-2">
                    {[1, 2, 3].map((link) => (
                      <div
                        key={link}
                        className="h-4 w-3/4 bg-neutral-200 rounded-md animate-pulse"
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default LandingPageSkeleton;
