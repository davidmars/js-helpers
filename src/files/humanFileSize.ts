import {filesize} from "filesize";

/**
 * Convert a number of bytes to a human readable string
 * @param bytes
 * @param locale
 * @param standard
 */
export default function humanFileSize(bytes: number, locale:string|'fr'|'en'|'es' = "", standard: 'si' | 'iec' | 'jedec' = 'si') {

  let r = 0;
  if (bytes > 1024 * 1024) {
    r = 1;
  }
  let res = "" + filesize(bytes,
    {
      standard: standard,
      pad: true,
      round: r,
    }
  );

  switch (locale) {
    case "fr":
      res = res.replace(/\./, ',');
      res = res.replace(/ B$/, ' o');

      res = res.replace(/ TB$/, ' To');
      res = res.replace(/ GB$/, ' Go');
      res = res.replace(/ MB$/, ' Mo');
      res = res.replace(/ kB$/, ' ko');

      res = res.replace(/ TiB$/, ' Tio');
      res = res.replace(/ GiB$/, ' Gio');
      res = res.replace(/ MiB/, ' Mio');
      res = res.replace(/ KiB$/, ' Kio');

      break;
  }

  return ""+ res;
}
