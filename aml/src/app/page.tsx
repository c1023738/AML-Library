import Image from "next/image";

export default function Home() {
  
  return (
    <>
    <div className="min-h-screen flex flex-col">
      {/* Banner */}
      <header
        className="w-full h-96 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/externalbanner.jpg')"}}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <h1
            className="text-4xl font-semibold text-white"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
          >
            Advanced Media Library
          </h1>
        </div>
      </header>

      {/* Modern section below the banner */}
      <section className="flex-1 p-8 bg-gray-100">
        <div className="max-w-screen-xl mx-auto">
          {/* Big Title */}
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            What We Offer
          </h2>

          {/* Categories Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Books Section */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform">
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Books
                </h3>
                <div className="w-full h-48 relative">
                  <Image
                    src="/books.png"
                    alt="Books"
                    layout="fill"
                    objectFit="cover"
                    className="rounded mb-4"
                  />
                </div>
                <p className="text-gray-600">
                  Explore a wide range of physical books from various genres.
                  Whether you're looking for fiction, non-fiction, or
                  educational material, we have it all.
                </p>
              </div>
            </div>

            {/* Digital Books Section */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform">
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Digital Books
                </h3>
                <div className="w-full h-48 relative">
                  <Image
                    src="/vidbooks.png"
                    alt="Digital Books"
                    layout="fill"
                    objectFit="cover"
                    className="rounded mb-4"
                  />
                </div>
                <p className="text-gray-600">
                  Access thousands of digital books available for download and
                  online reading. Perfect for the modern reader on the go.
                </p>
              </div>
            </div>

            {/* Videos Section */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform">
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Videos
                </h3>
                <div className="w-full h-48 relative">
                  <Image
                    src="/videos.png"
                    alt="Videos"
                    layout="fill"
                    objectFit="cover"
                    className="rounded mb-4"
                  />
                </div>
                <p className="text-gray-600">
                  Enjoy a collection of educational and entertainment videos,
                  including tutorials, documentaries, and more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>  
    </>
  );
}
