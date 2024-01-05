document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("convertButton").addEventListener("click", convert);
});

async function convert() {
  try {
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const amount = document.getElementById("amount").value;

    if (!amount || !fromCurrency || !toCurrency) return;

    const response = await fetch(
      `http://openexchangerates.org/api/latest.json?app_id=262743abcb8a44f6bb5fdb08d192a850&base=${fromCurrency}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const convertedAmount = (data.rates[toCurrency] * amount).toFixed(2);

    document.getElementById(
      "convertedAmount"
    ).value = `${toCurrency} ${convertedAmount}`;
  } catch (error) {
    console.error(`Conversion error: ${error.message}`);
    alert(`Conversion error: ${error.message}`);
  }
}
