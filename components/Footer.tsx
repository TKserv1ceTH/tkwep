import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black text-white p-5 text-center" aria-label="Footer">
      <p className="text-sm">© 2025 TKserviceTHL.com All rights reserved</p>

      <div className="flex justify-center gap-4 mt-3 flex-wrap">
        {[
          { name: 'Visa', src: '/visa.png' },
          { name: 'PayPal', src: '/paypal.png' },
          { name: 'MasterCard', src: '/mastercard.png' },
          { name: 'eBay', src: '/ebay.png' },
        ].map(({ name, src }, idx) => (
          <div key={idx} className="p-2 bg-white rounded-lg">
            <Image
              src={src}
              alt={`${name} Logo`}
              width={40}
              height={40}
              priority
              className="hover:scale-110 transition-transform"
            />
          </div>
        ))}
      </div>
    </footer>
  );
}
