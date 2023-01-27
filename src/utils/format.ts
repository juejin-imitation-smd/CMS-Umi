// 示例方法，没有实际意义
export function trim(str: string) {
  return str.trim();
}

function addZero(str: string | number) {
  return +str < 10 ? "0" + str : str;
}

export function now() {
  const date = new Date();
  return `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(
    date.getDate(),
  )} ${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(
    date.getSeconds(),
  )}`;
}

export function formatTime(time: number) {
  const date = new Date(time);
  return `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(
    date.getDate(),
  )} ${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(
    date.getSeconds(),
  )}`;
}
