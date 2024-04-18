export function clean(value: string): string {
  return value
    .replace(/\s+/g, ' ')
    .replace(/\n/g, '')
    .replace(/\t/g, '')
    .trim();
}

export function commaClean(value: string): string {
  return value
    .replace(/,/g, '')
    .replaceAll('、', ',')
    .trim();
}

export function add(separator = ' ', ...values: string[]): string {
  return values.join(separator);
}

export function japaneseCharFind(str: string) {
    return /[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g.test(str);
  };
  