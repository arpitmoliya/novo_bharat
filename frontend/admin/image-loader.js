// Custom next/image loader.
//
// The admin panel is served under a basePath (/admin). next/image does not
// reliably prepend the basePath to local public assets in this setup, so we do
// it here for every image. This keeps all <Image src="/images/..."> references
// working without editing each call site.
//
// Keep BASE_PATH in sync with `basePath` in next.config.ts.
const BASE_PATH = "/admin";

export default function basePathImageLoader({ src }) {
  // Leave absolute/remote URLs and already-prefixed paths untouched.
  if (/^https?:\/\//.test(src) || src.startsWith(BASE_PATH + "/")) {
    return src;
  }
  return `${BASE_PATH}${src.startsWith("/") ? "" : "/"}${src}`;
}
