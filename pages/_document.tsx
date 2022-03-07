import React, { ReactElement } from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render(): ReactElement {
    return (
      <Html>
        <Head />
        <body className="dark:bg-app-dark bg-app-light">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
