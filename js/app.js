import { $ } from './utils.js';
import { calc, resetAll } from './calculator.js';
import { generatePDF } from './pdfGenerator.js';

/**
 * Initializes the default values (current month, number of days in the month)
 */
function init() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    
    // Set default month
    $('month').value = y + '-' + m;
    
    // Set default days in month
    const days = new Date(y, now.getMonth() + 1, 0).getDate();
    $('total').value = days;
    $('worked').value = days;
    
    // Run initial computation
    calc();
}

// Bind event listeners once the DOM content has loaded
document.addEventListener('DOMContentLoaded', () => {
    // Run initialization
    init();
    
    // Bind numeric inputs to recalculate dynamically on change/input
    ['basic', 'hra', 'travel', 'worked', 'total'].forEach(id => {
        const element = $(id);
        if (element) {
            element.addEventListener('input', calc);
        }
    });

    // Bind action buttons
    const btnReset = document.querySelector('.btn-reset');
    if (btnReset) {
        btnReset.addEventListener('click', resetAll);
    }
    
    const btnPdf = document.querySelector('.btn-pdf');
    if (btnPdf) {
        btnPdf.addEventListener('click', generatePDF);
    }
});
