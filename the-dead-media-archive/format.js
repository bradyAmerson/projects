// format.js
function formatCount(n) {
  return n.toLocaleString();
}

function formatAmount(x) {
  if (x >= 100) return Math.round(x).toLocaleString();
  if (x >= 10) return (Math.round(x * 10) / 10).toFixed(1);
  if (x >= 1) return (Math.round(x * 100) / 100).toFixed(2);
  if (x >= 0.0001) return String(Number(x.toPrecision(2)));
  return "less than 0.0001";
}

function formatBytes(bytes) {
  if (!bytes || bytes <= 0) return "0 Bytes";
  const k = 1000;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const val = bytes / Math.pow(k, i);
  return `${i === 0 ? val : val.toFixed(val < 10 ? 2 : 1)} ${sizes[i]}`;
}

function formatLength(mm) {
  const totalInches = mm / 25.4;
  if (totalInches < 12) {
    return `${totalInches < 1 ? totalInches.toFixed(2) : totalInches.toFixed(1)} inches`;
  }
  const totalFeet = totalInches / 12;
  if (totalFeet < 50) {
    const feet = Math.floor(totalFeet);
    const inches = Math.round(totalInches % 12);
    return inches > 0 ? `${feet} ft ${inches} in` : `${feet} ft`;
  }
  if (totalFeet < 5280) {
    return `${Math.round(totalFeet).toLocaleString()} ft`;
  }
  const miles = totalFeet / 5280;
  return `${miles < 10 ? miles.toFixed(2) : Math.round(miles).toLocaleString()} miles`;
}

function formatMoney(n) {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)} trillion`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)} billion`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)} million`;
  if (n >= 100) return `$${Math.round(n).toLocaleString()}`;
  return `$${n.toFixed(2)}`;
}

// Price of one unit: keeps sub-cent prices readable ($0.001)
function formatUnitPrice(p) {
  return p >= 1 ? formatMoney(p) : `$${String(p)}`;
}
