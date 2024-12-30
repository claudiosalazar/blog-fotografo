import { useEffect, ComponentType } from "react";
import Head from "next/head";
import { usePathname } from "next/navigation";

const Title = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const ComponentTitle = (props: React.ComponentProps<typeof WrappedComponent>) => {
    const pathname = usePathname();

    useEffect(() => {
      if (typeof window !== "undefined") {
        const segments = pathname.split('/').filter(Boolean);
        const lastSegment = segments.length > 0 ? segments[segments.length - 1] : '';
        const formattedPath = lastSegment ? `${lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)} - Nikolas Canons` : 'Nikolas Canons';
        document.title = formattedPath;
      }
    }, [pathname]);

    return (
      <>
        <Head>
          <title>{typeof window !== "undefined" ? document.title : "Nikolas Canons"}</title>
        </Head>
        <WrappedComponent {...props} />
      </>
    );
  };

  ComponentTitle.displayName = `Title(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return ComponentTitle;
};

export default Title;