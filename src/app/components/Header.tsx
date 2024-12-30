"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const links = [
    { href: "/", label: "Inicio" },
    { href: "/biografia/", label: "Biografia" },
    { href: "/galeria/", label: "Galeria" },
    { href: "/blog/", label: "Blog" },
  ];

  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const normalizePath = (path: string) => {
    const trimmedPath = path === "/" ? path : path.replace(/\/$/, "");
    return trimmedPath.toLowerCase();
  };

  const isInicioOrBiografia = normalizePath(pathname) === "/" || normalizePath(pathname) === "/biografia";

  useEffect(() => {
    const splitLinkText = () => {
      document.querySelectorAll<HTMLAnchorElement>('.nav-link').forEach(a => {
        const text = a.textContent?.trim().split('').map((char, index) => {
          const delay = (index + 1) / 20;
          return char === ' ' 
            ? `<span style="transition-delay: ${delay}s">&nbsp;</span>` 
            : `<span style="transition-delay: ${delay}s">${char}</span>`;
        }).join('') || '';
        a.innerHTML = `<div>${text}</div>`;
      });
    };
  
    const splitButtonText = () => {
      document.querySelectorAll<HTMLAnchorElement>('.btn').forEach(a => {
        const text = a.textContent?.trim().split('').map((char, index) => {
          const delay = (index + 1) / 20;
          return char === ' ' 
            ? `<span style="transition-delay: ${delay}s">&nbsp;</span>` 
            : `<span style="transition-delay: ${delay}s">${char}</span>`;
        }).join('') || '';
        a.innerHTML = `<div>${text}</div>`;
      });
    };
  
    const splitDashboardButtonText = () => {
      document.querySelectorAll<HTMLAnchorElement>('.btn-dashboard').forEach(a => {
        const text = a.textContent?.trim().split('').map((char, index) => {
          const delay = (index + 1) / 20;
          return char === ' ' 
            ? `<span style="transition-delay: ${delay}s">&nbsp;</span>` 
            : `<span style="transition-delay: ${delay}s">${char}</span>`;
        }).join('') || '';
        a.innerHTML = `<div>${text}</div>`;
      });
    };
  
    splitLinkText();
    splitButtonText();
    splitDashboardButtonText();
  }, [isMenuOpen, pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const calculateTotalHeight = () => {
    const headerHeight = document.querySelector('header')?.clientHeight || 0;
    const mainHeight = document.querySelector('main')?.clientHeight || 0;
    const footerHeight = document.querySelector('footer')?.clientHeight || 0;
    const newTotalHeight = headerHeight + mainHeight + footerHeight;
    localStorage.setItem('totalHeight', newTotalHeight.toString());
  };

  useEffect(() => {
    const resetAndCalculateHeight = () => {
      setTimeout(calculateTotalHeight, 0);
    };

    resetAndCalculateHeight();
    window.addEventListener('resize', calculateTotalHeight);
    return () => {
      window.removeEventListener('resize', calculateTotalHeight);
    };
  }, []);

  useEffect(() => {
    const resetAndCalculateHeight = () => {
      setTimeout(calculateTotalHeight, 0);
    };

    resetAndCalculateHeight();
  }, [pathname]);

  useEffect(() => {
    const mainElement = document.querySelector('main');
    if (mainElement) {
      const observer = new MutationObserver(() => {
        setTimeout(calculateTotalHeight, 0);
      });

      observer.observe(mainElement, { childList: true, subtree: true });

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  const handleLinkClick = () => {
    setTimeout(calculateTotalHeight, 0);
  };

  return (
    <>
      <header>
        <nav className={`mx-auto flex items-center justify-between8 ${ isInicioOrBiografia ? "bg-opacidad" : "" }`} aria-label="Global">
          <div className="flex lg:flex-1">
            <div className="logo-nk">
              <Link href="/" onClick={handleLinkClick}></Link>
            </div>
          </div>
          <div className="flex lg:hidden">
            <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" onClick={toggleMenu}>
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {links.map((link) => (
              <span key={link.label}>
                <Link className={`nav-link ${normalizePath(pathname) === normalizePath(link.href) ? "active" : "" }`} href={link.href} onClick={handleLinkClick}>
                  {link.label}
                </Link>
              </span>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link href="/login" className="btn dashboard-header" onClick={handleLinkClick}>
              Dashboard
            </Link>
          </div>
        </nav>

        {isMenuOpen && (
          <div className="lg:hidden" role="dialog" aria-modal="true">
            <div className="fixed inset-0 z-10"></div>
            <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <div className="logo-nk">
                  <Link href="/" onClick={handleLinkClick}></Link>
                </div>
                <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700" onClick={toggleMenu}>
                  <span className="sr-only">Close menu</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {links.map((link) => (
                      <span key={link.label} className="flex justify-center">
                        <Link className={`nav-link ${normalizePath(pathname) === normalizePath(link.href) ? "active" : "" }`} href={link.href} onClick={handleLinkClick}>
                          {link.label}
                        </Link>
                      </span>
                    ))}
                  </div>
                  <div className="py-6 w-full px-4 flex justify-center">
                    <Link href="/panel-de-administracion" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold  hover:bg-gray-50" onClick={handleLinkClick}>
                      Dashboard
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}