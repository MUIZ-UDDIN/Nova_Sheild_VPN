import { useEffect, useRef, useState } from 'react';

const ADSENSE_CLIENT = 'ca-pub-7371724572682611';

export default function AdBanner({ slot, format = 'auto', responsive = true, className = '' }) {
  const adRef = useRef(null);
  const containerRef = useRef(null);
  const pushed = useRef(false);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    if (pushed.current) return;

    const tryPush = () => {
      try {
        if (window.adsbygoogle && adRef.current) {
          window.adsbygoogle.push({});
          pushed.current = true;
        }
      } catch (e) {
        console.warn('AdSense error:', e);
      }
    };

    // Try immediately, or wait for script to load
    if (window.adsbygoogle) {
      tryPush();
    } else {
      const interval = setInterval(() => {
        if (window.adsbygoogle) {
          tryPush();
          clearInterval(interval);
        }
      }, 500);
      // Stop trying after 10 seconds
      setTimeout(() => clearInterval(interval), 10000);
    }
  }, []);

  // Observe the ad container for size changes — if it gets height, ad loaded
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new MutationObserver(() => {
      const ins = containerRef.current?.querySelector('ins.adsbygoogle');
      if (ins) {
        const height = ins.offsetHeight || parseInt(ins.style.height, 10) || 0;
        if (height > 0) {
          setAdLoaded(true);
          observer.disconnect();
        }
      }
    });

    observer.observe(containerRef.current, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'data-ad-status'],
    });

    // Also check periodically for 15 seconds
    const checkInterval = setInterval(() => {
      const ins = containerRef.current?.querySelector('ins.adsbygoogle');
      if (ins) {
        const status = ins.getAttribute('data-ad-status');
        const height = ins.offsetHeight || 0;
        if (status === 'filled' || height > 0) {
          setAdLoaded(true);
          clearInterval(checkInterval);
          observer.disconnect();
        }
        // If unfilled after check, keep hidden
        if (status === 'unfilled') {
          clearInterval(checkInterval);
          observer.disconnect();
        }
      }
    }, 1000);

    return () => {
      observer.disconnect();
      clearInterval(checkInterval);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`ad-container overflow-hidden transition-all duration-500 ${
        adLoaded ? 'opacity-100 max-h-[400px]' : 'opacity-0 max-h-0'
      } ${className}`}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
