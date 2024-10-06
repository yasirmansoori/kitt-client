export default function Navbar() {
  return (
    <div className="navbar navbar-expand-lg">
      <nav className="fixed w-full z-20 top-0 start-0 border-b border-gray-200 h-16 bg-white">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3">
            <img
              src="https://res.cloudinary.com/dnjcut34n/image/upload/v1728043871/KITT/logo_qqeaz6.svg"
              className="h-8"
              alt="KITTHQ Logo"
            />
            <span className="self-center text-2xl font-semibold">KITT</span>
          </a>
          <div className="flex">
            <button
              type="button"
              className="text-black p-1 px-4 border rounded-2xl hover:bg-gray-100 transition-all hover:border-black"
              onClick={() => {
                window.location.href = "https://www.kitthq.com/";
              }}
            >
              Contact
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
