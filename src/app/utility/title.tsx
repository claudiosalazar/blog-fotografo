import { ComponentType } from "react";
import Head from "next/head";

const Title = <P extends object>(WrappedComponent: ComponentType<P>, pageTitle: string) => {
  const ComponentTitle = (props: React.ComponentProps<typeof WrappedComponent>) => {
    return (
      <>
        <Head>
          <title>{pageTitle} - Nikolas Canons</title>
        </Head>
        <WrappedComponent {...props} />
      </>
    );
  };

  ComponentTitle.displayName = `Title(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return ComponentTitle;
};

export default Title;