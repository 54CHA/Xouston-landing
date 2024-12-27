"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    ym: (id: number, action: string, params?: any) => void;
  }
}

type MetrikaWindow = Window & {
  [key: string]: any;
};

export default function YandexMetrika() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      (function (
        m: MetrikaWindow,
        e: Document,
        t: string,
        r: string,
        i: string,
        k: HTMLScriptElement,
        a: HTMLElement
      ) {
        m[i] =
          m[i] ||
          function () {
            (m[i].a = m[i].a || []).push(arguments);
          };
        m[i].l = 1 * new Date().getTime();
        k = e.createElement(t);
        a = e.getElementsByTagName(t)[0];
        k.async = 1;
        k.src = r;
        a.parentNode?.insertBefore(k, a);
      })(
        window as MetrikaWindow,
        document,
        "script",
        "https://mc.yandex.ru/metrika/tag.js",
        "ym",
        document.createElement("script"),
        document.getElementsByTagName("script")[0]
      );

      window.ym(99330553, "init", {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
      });
    }
  }, []);

  return (
    <>
      <noscript>
        <div>
          <img
            src="https://mc.yandex.ru/watch/99330553"
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
