export function thousandSeparator(value) {
  let numb = parseFloat(value || 0).toFixed(2);
  const result = `Rp ${new Intl.NumberFormat("id-ID", {
    currency: "IDR",
  }).format(numb)}`;
  return result;
}
