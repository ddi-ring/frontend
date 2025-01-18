import stylex from "@stylexjs/stylex";
import { ComponentProps, ReactNode } from "react";
import {
  LinkDescriptor,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { favicons } from "./constant/favicon";
import stylesheet from "./index.css?url";

export function links() {
  return [
    ...favicons,
    { rel: "stylesheet", href: stylesheet },
  ] satisfies LinkDescriptor[];
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>띠링</title>
        <Meta />
        <Links />
      </head>
      <body>
        <MobileViewport>{children}</MobileViewport>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function MobileViewport(props: ComponentProps<"div">) {
  return <div {...stylex.props(styles.mobileViewport)} {...props} />;
}

const styles = stylex.create({
  mobileViewport: {
    backgroundColor: "#fff",
    maxWidth: 390,
    margin: "0 auto",
  },
});

export default function Root() {
  return <Outlet />;
}
