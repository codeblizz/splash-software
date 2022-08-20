  export const isEmpty = (value) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "object" &&
        Object.values(value).every(
          (x) => x === null || x === "" || x === undefined
        )) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  };

  export const formatTo2Decimals = (value, decimalPlaces = 2) => {
    return Number(Math.round(parseFloat(value + 'e' + decimalPlaces)) + 'e-' + decimalPlaces).toFixed(
      decimalPlaces,
    );
  };

  export const thousandsSeparators = (value) => {
    if (isNaN(value)) return '';
    let reg = /\B(?=(\d{3})+(?!\d))/g;
    let num = formatTo2Decimals(value);
    let numberParts = num.split('.');
    numberParts[0] = numberParts[0].replace(reg, ',');
    return numberParts.join('.');
  };
  
