import { $, fmtINR } from './utils.js';

/**
 * Reads all salary and days input values from the DOM and performs pro-rata calculations
 * @returns {object} Calculated payroll elements
 */
export function getVals() {
    const basic = parseFloat($('basic').value) || 0;
    const hra = parseFloat($('hra').value) || 0;
    const travel = parseFloat($('travel').value) || 0;
    const worked = parseFloat($('worked').value) || 0;
    const total = parseFloat($('total').value) || 1;
    
    const gross = basic + hra + travel;
    const factor = total > 0 ? Math.min(worked / total, 1) : 1;
    const net = gross * factor;
    
    return { basic, hra, travel, worked, total, gross, factor, net };
}

/**
 * Calculates current values and updates DOM elements in real-time
 */
export function calc() {
    const v = getVals();
    
    // Update calculated individual amounts
    $('r-basic').textContent = fmtINR(v.basic * v.factor);
    $('r-hra').textContent = fmtINR(v.hra * v.factor);
    $('r-travel').textContent = fmtINR(v.travel * v.factor);
    $('r-gross').textContent = fmtINR(v.gross);
    $('r-net').textContent = fmtINR(v.net);
    
    // Update the pro-rata distribution visual bar
    if (v.gross > 0) {
        $('bar-b').style.width = ((v.basic / v.gross) * 100).toFixed(1) + '%';
        $('bar-h').style.width = ((v.hra / v.gross) * 100).toFixed(1) + '%';
        $('bar-t').style.width = ((v.travel / v.gross) * 100).toFixed(1) + '%';
    } else {
        ['bar-b', 'bar-h', 'bar-t'].forEach(function (id) {
            $(id).style.width = '0%';
        });
    }
}

/**
 * Resets all input values to empty and resets dates to current defaults
 */
export function resetAll() {
    ['name', 'empid', 'role', 'dept', 'doj', 'basic', 'hra', 'travel'].forEach(function (id) {
        $(id).value = '';
    });
    
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    $('month').value = y + '-' + m;
    
    const days = new Date(y, now.getMonth() + 1, 0).getDate();
    $('total').value = days;
    $('worked').value = days;
    
    calc();
}
