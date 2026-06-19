import Link from 'next/link'

export function Footer() {
  return (
    <footer style={{ background: '#1c0f08', color: '#f8f4ef' }}>
      {/* Top accent line */}
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <span
                className="block text-lg tracking-[0.1em] uppercase font-semibold"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#c9a84c' }}
              >
                Chocolate Shopee
              </span>
              <span
                className="block text-[9px] tracking-[0.3em] uppercase mt-0.5"
                style={{ fontFamily: 'Jost, Inter, sans-serif', fontWeight: 300, color: 'rgba(248,244,239,0.4)' }}
              >
                Bhagya Nagar Road, Nanded
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: 'rgba(248,244,239,0.6)', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 300 }}
            >
              Nanded&apos;s favourite chocolate shop since 2001. Every brand, every flavour — all in one place on Bhagya Nagar Road.
            </p>
            <a
              href="https://wa.me/1234567890?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20chocolates%20at%20Chocolate%20Shopee%2C%20Nanded"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase py-2.5 px-5 border transition-all duration-300 hover:bg-[#c9a84c] hover:text-[#1c0f08]"
              style={{
                borderColor: '#c9a84c',
                color: '#c9a84c',
                fontFamily: 'Jost, Inter, sans-serif',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
          </div>

          {/* Collection */}
          <div>
            <h4
              className="text-xs tracking-[0.25em] uppercase mb-6"
              style={{ color: '#c9a84c', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 500 }}
            >
              Collection
            </h4>
            <ul className="space-y-3">
              {['All Chocolates', 'Dark Chocolate', 'Milk Chocolate', 'Imported Brands', 'Gift Hampers'].map((item) => (
                <li key={item}>
                  <Link
                    href="/products"
                    className="text-sm transition-colors duration-300 hover:text-[#c9a84c]"
                    style={{ color: 'rgba(248,244,239,0.6)', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 300 }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              className="text-xs tracking-[0.25em] uppercase mb-6"
              style={{ color: '#c9a84c', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 500 }}
            >
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Gallery', href: '/gallery' },
                { label: 'Contact', href: '/contact' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors duration-300 hover:text-[#c9a84c]"
                    style={{ color: 'rgba(248,244,239,0.6)', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 300 }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-xs tracking-[0.25em] uppercase mb-6"
              style={{ color: '#c9a84c', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 500 }}
            >
              Get in Touch
            </h4>
            <div className="space-y-3">
              <p className="text-sm" style={{ color: 'rgba(248,244,239,0.6)', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 300 }}>
                <a href="mailto:hello@chocolateshopee.com" className="hover:text-[#c9a84c] transition-colors">
                  hello@chocolateshopee.com
                </a>
              </p>
              <p className="text-sm" style={{ color: 'rgba(248,244,239,0.6)', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 300 }}>
                <a href="tel:+911234567890" className="hover:text-[#c9a84c] transition-colors">
                  +91 12345 67890
                </a>
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(248,244,239,0.6)', fontFamily: 'Jost, Inter, sans-serif', fontWeight: 300 }}>
                Bhagya Nagar Road,<br />
                Nanded, Maharashtra<br />
                <span style={{ color: '#c9a84c', fontSize: 11, letterSpacing: '0.1em' }}>Open until 10:00 PM</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(201,168,76,0.15)' }}
        >
          <p
            className="text-xs tracking-[0.1em]"
            style={{ color: 'rgba(248,244,239,0.4)', fontFamily: 'Jost, Inter, sans-serif' }}
          >
            © 2025 Chocolate Shoppee. All rights reserved.
          </p>
          <p
            className="text-xs tracking-[0.1em]"
            style={{ color: 'rgba(248,244,239,0.3)', fontFamily: 'Jost, Inter, sans-serif' }}
          >
            23 Years in Business · Nanded&apos;s Chocolate Destination
          </p>
        </div>
      </div>
    </footer>
  )
}
