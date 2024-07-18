export default function mailTo(to = "", subject = "", body = "") {
  const u = [];
  u.push("mailto:", to);
  u.push("?subject=", encodeURIComponent(subject));
  u.push("&body=", encodeURIComponent(body));
  return u.join("");
}
