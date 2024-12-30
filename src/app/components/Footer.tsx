'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const [isForceBottom, setIsForceBottom] = useState(false);

  const logWindowHeight = () => {
    const windowHeight = window.innerHeight;
    return windowHeight;
  };

  const logStoredTotalHeight = () => {
    const storedTotalHeight = localStorage.getItem('totalHeight');
    const windowHeight = logWindowHeight();
    if (storedTotalHeight) {
      const totalHeight = parseInt(storedTotalHeight, 10);
      if (totalHeight <= windowHeight) {
        setIsForceBottom(false);
      } else {
        setIsForceBottom(true);
      }
    } else {
      setIsForceBottom(false);
    }
  };

  useEffect(() => {
    logWindowHeight();
    logStoredTotalHeight();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'totalHeight') {
        logStoredTotalHeight();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    logWindowHeight();
    logStoredTotalHeight();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      logWindowHeight();
      logStoredTotalHeight();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const mainElement = document.querySelector('main');
    if (mainElement) {
      const observer = new MutationObserver(() => {
        logStoredTotalHeight();
      });

      observer.observe(mainElement, { childList: true, subtree: true });

      return () => {
        observer.disconnect();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <footer className={!isForceBottom ? 'force-bottom' : ''}>
      <small className='flex-column flex-md-row d-flex align-items-center'>
        <span className='d-block'>
          Nikonlas Canons © 2024 - V.1 
        </span>
        <span className='d-none d-md-block'>- </span>
        <span className='d-block'>
          Desarrollo por <Link href='https://www.claudiosalazar.cl' className="link" target='_blank' rel='noopener noreferrer'>Claudio Salazar</Link>
        </span>
      </small>
      <ul>
        <li>
          <Link href="#" className="ico-fb"></Link>
        </li>
        <li>
          <Link href="#" className="ico-ins"></Link>
        </li>
        <li>
          <Link href="#" className="ico-lk"></Link>
        </li>
        <li>
          <Link href="#" className="ico-x"></Link>
        </li>
      </ul>
    </footer>
  );
}