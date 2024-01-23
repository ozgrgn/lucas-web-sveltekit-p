export function isDesktop() {
  try {
    if (
      /Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      return false;
    }
    return true;
  } catch (e) {
    return true;
  }
}

export const formatTRY = (price) => {
  let currency_symbol = "₺";
  let formattedOutput = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0, 
    minimumFractionDigits: 0,
  });
  return formattedOutput.format(price).replace(currency_symbol, "");
};

export default {
  isDesktop,
  formatTRY,
};
