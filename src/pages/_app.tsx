import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import { dark } from "@clerk/themes";
import "~/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider
      {...pageProps}
      appearance={{
        baseTheme: dark,
      }}
    >
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default MyApp;
