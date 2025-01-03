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
  const [menuClass, setMenuClass] = useState("close-menu-mobile");

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
    if (isMenuOpen) {
      setMenuClass("close-menu-mobile");
      setTimeout(() => {
        setIsMenuOpen(false);
      }, 500); // Duration of fade-out animation
    } else {
      setIsMenuOpen(true);
      setMenuClass("open-menu-mobile");
    }
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
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  return (
    <>
      <header>
        <nav className={`mx-auto flex items-center justify-between ${ isInicioOrBiografia ? "bg-opacidad" : "" }`} aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" onClick={handleLinkClick} className="logo-nk"></Link>
          </div>
          <div className="flex lg:hidden">
            <button className="btn-menu-mobile" type="button" onClick={toggleMenu}>
              <div className={`wrapper-menu ${isMenuOpen ? "open" : ""}`}>
                <div className="line-menu half start"></div>
                <div className="line-menu"></div>
                <div className="line-menu half end"></div>
              </div>
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
            {/* <Link href="/login" className="btn dashboard-header" onClick={handleLinkClick}>
              Dashboard
            </Link> */}
          </div>
        </nav>

        <div className={`lg:hidden menu-mobile ${menuClass}`} role="dialog" aria-modal="true">
          <div className="flex items-center justify-center">
            <Link href="/" onClick={handleLinkClick} className="logo-nk mb-4"></Link>
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
              {/* <div className="py-6 w-full px-4 flex justify-center">
                <Link href="/login" className="btn dashboard-header" onClick={handleLinkClick}>
                  Dashboard
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}