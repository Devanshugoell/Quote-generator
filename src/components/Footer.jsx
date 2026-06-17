const Footer = () => {
  return (
    <footer className="border-t border-gray-200 pt-24 pb-8 bg-[#f0f0f0] rounded-lg relative mt-12 mb-0 px-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 space-y-3">
            <h3 className="text-xl font-black text-gray-900 tracking-tight">SHOP.CO</h3>
            <p className="text-xs text-gray-500 leading-relaxed max-w-[200px]">
              We have clothes that suit your style and which you're proud to wear. From women to men.
            </p>
            {/* Icons */}
            <div className="flex gap-2 pt-1">
              {['twitter', 'facebook', 'instagram', 'github'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                >
                  <SocialIcon name={social} />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h4 className="font-bold text-gray-900 text-sm">Company</h4>
            <ul className="space-y-2 text-xs text-gray-500">
              {['About', 'Features', 'Works', 'Career'].map((link) => (
                <li key={link}><a href="#" className="hover:text-gray-900 transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div className="space-y-3">
            <h4 className="font-bold text-gray-900 text-sm">Help</h4>
            <ul className="space-y-2 text-xs text-gray-500">
              {['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'].map((link) => (
                <li key={link}><a href="#" className="hover:text-gray-900 transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          {/* FAQ */}
          <div className="space-y-3">
            <h4 className="font-bold text-gray-900 text-sm">FAQ</h4>
            <ul className="space-y-2 text-xs text-gray-500">
              {['Account', 'Manage Deliveries', 'Orders', 'Payments'].map((link) => (
                <li key={link}><a href="#" className="hover:text-gray-900 transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h4 className="font-bold text-gray-900 text-sm">Resources</h4>
            <ul className="space-y-2 text-xs text-gray-500">
              {['Free eBooks', 'Development Tutorial', 'How to - Blog', 'YouTube Playlist'].map((link) => (
                <li key={link}><a href="#" className="hover:text-gray-900 transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            Shop.co &copy; 2000-2023, All Rights Reserved
          </p>
          <div className="flex items-center gap-2">
            {['VISA', 'MC', 'AMEX', 'PayPal', 'Apple Pay'].map((method) => (
              <span
                key={method}
                className="px-2 py-1 text-[10px] font-bold text-gray-500 bg-gray-100 rounded border border-gray-200"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ name }) => {
  const icons = {
    twitter: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    facebook: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    instagram: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    github: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  };
  return icons[name] || null;
};

export default Footer;
