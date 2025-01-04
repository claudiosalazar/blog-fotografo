'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const [isForceBottom, setIsForceBottom] = useState(false);
  const [initialTotalHeight, setInitialTotalHeight] = useState<number | null>(null);

  const logWindowHeight = () => {
    const windowHeight = window.innerHeight;
    return windowHeight;
  };

  const logStoredTotalHeight = () => {
    const storedTotalHeight = localStorage.getItem('totalHeight');
    const windowHeight = logWindowHeight();
    if (storedTotalHeight) {
      const totalHeight = parseInt(storedTotalHeight, 10);
      if (initialTotalHeight === null) {
        setInitialTotalHeight(totalHeight);
      }
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

  useEffect(() => {
    const mainElement = document.querySelector('main');
    if (mainElement) {
      const resizeObserver = new ResizeObserver(() => {
        logStoredTotalHeight();
      });

      resizeObserver.observe(mainElement);

      return () => {
        resizeObserver.disconnect();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (initialTotalHeight !== null) {
      const storedTotalHeight = localStorage.getItem('totalHeight');
      if (storedTotalHeight) {
        const totalHeight = parseInt(storedTotalHeight, 10);
        if (totalHeight !== initialTotalHeight) {
          logStoredTotalHeight();
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTotalHeight]);

  return (
    <footer className={!isForceBottom ? 'force-bottom' : ''}>
      <small className='flex justify-center flex-col md:flex-row align-items-center'>
        <span className='d-block pe-0 md:pe-2'>
          Nikonlas Canons © 2024 - V.1 
        </span>
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