export default function keySortAlpha(data: object) {
  const r: any = {}
  Object.keys(data)
    .sort()
    .forEach((v, i) => {
      // @ts-ignore
      r[v] = data[v];
    });
  return r
}
