/**
 * DOM query selector helper
 * @param {string} id - The element ID
 * @returns {HTMLElement}
 */
export const $ = function (id) {
    return document.getElementById(id);
};

/**
 * Format a number as an INR Currency string (e.g. ₹50,000)
 * @param {number} n - The numerical amount
 * @returns {string}
 */
export const fmtINR = function (n) {
    return '\u20B9' + Math.round(n).toLocaleString('en-IN');
};

/**
 * Format a number as an INR numerical string with commas (e.g. 50,000)
 * @param {number} n - The numerical amount
 * @returns {string}
 */
export const numINR = function (n) {
    return Math.round(n).toLocaleString('en-IN');
};

/**
 * Convert month input string (YYYY-MM) to human-readable month string (e.g. "January 2026")
 * @param {string} val - YYYY-MM formatted date
 * @returns {string}
 */
export const monthLabel = function (val) {
    if (!val) return '';
    const parts = val.split('-');
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[parseInt(parts[1], 10) - 1] + ' ' + parts[0];
};

/**
 * Convert a number to Indian Rupee words format
 * @param {number} n - The numerical amount
 * @returns {string}
 */
export const inWords = function (n) {
    n = Math.round(n);
    if (n === 0) return 'Zero';
    
    const ones = [
        '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
        'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
    ];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    
    function two(num) {
        return num < 20 ? ones[num] : tens[Math.floor(num / 10)] + (num % 10 ? ' ' + ones[num % 10] : '');
    }
    
    function three(num) {
        return num >= 100 
            ? ones[Math.floor(num / 100)] + ' Hundred' + (num % 100 ? ' ' + two(num % 100) : '') 
            : two(num);
    }
    
    let lakh = Math.floor(n / 100000);
    n %= 100000;
    let thou = Math.floor(n / 1000);
    n %= 1000;
    let rest = n;
    
    let out = '';
    if (lakh) out += three(lakh) + ' Lakh ';
    if (thou) out += three(thou) + ' Thousand ';
    if (rest) out += three(rest);
    
    return out.trim() + ' Rupees Only';
};
