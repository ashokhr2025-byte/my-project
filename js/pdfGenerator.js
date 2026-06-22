import { $, monthLabel, numINR, inWords } from './utils.js';
import { getVals } from './calculator.js';

/**
 * Compiles all data and renders a professional PDF payslip using jsPDF
 */
export function generatePDF() {
    const v = getVals();
    const name = $('name').value.trim() || 'N/A';
    const empid = $('empid').value.trim() || 'N/A';
    const role = $('role').value.trim() || 'N/A';
    const dept = $('dept').value.trim() || 'N/A';
    const doj = $('doj').value || 'N/A';
    const mon = monthLabel($('month').value) || 'N/A';

    const { jsPDF } = window.jspdf;
    if (!jsPDF) {
        console.error('jsPDF library not loaded');
        return;
    }
    
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const W = 210;
    const L = 16;
    const R = W - 16;
    const col2 = 110;

    // Header background (Dark Navy blue)
    doc.setFillColor(26, 26, 46);
    doc.rect(0, 0, W, 38, 'F');

    // Company name
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(15);
    doc.setFont('helvetica', 'bold');
    doc.text('I-BACUS-TECH SOLUTIONS PRIVATE LIMITED', W / 2, 13, { align: 'center' });

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('HR & Payroll Division', W / 2, 20, { align: 'center' });

    // Payslip title band
    doc.setFillColor(74, 111, 165);
    doc.rect(0, 28, W, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('SALARY PAYSLIP \u2014 ' + mon.toUpperCase(), W / 2, 34.5, { align: 'center' });

    // Employee details box
    let y = 48;
    doc.setDrawColor(200, 210, 230);
    doc.setFillColor(240, 245, 255);
    doc.rect(L, y, R - L, 38, 'FD');

    doc.setTextColor(80, 80, 120);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('EMPLOYEE DETAILS', L + 4, y + 7);

    doc.setDrawColor(74, 111, 165);
    doc.line(L + 4, y + 9, L + 60, y + 9);

    const details = [
        ['Employee Name', name, 'Employee ID', empid],
        ['Designation', role, 'Department', dept],
        ['Date of Joining', doj, 'Pay Period', mon],
        ['Days Worked', v.worked + ' / ' + v.total + ' days', '', ''],
    ];

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    details.forEach(function (row, i) {
        const ry = y + 16 + i * 8;
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(100, 100, 130);
        doc.setFontSize(8);
        doc.text(row[0] + ':', L + 4, ry);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(30, 30, 30);
        doc.setFontSize(9);
        doc.text(row[1], L + 40, ry);
        if (row[2]) {
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(100, 100, 130);
            doc.setFontSize(8);
            doc.text(row[2] + ':', col2, ry);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(30, 30, 30);
            doc.setFontSize(9);
            doc.text(row[3], col2 + 32, ry);
        }
    });

    // Earnings table header
    y = 95;
    doc.setFillColor(26, 26, 46);
    doc.rect(L, y, R - L, 9, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('EARNINGS', L + 4, y + 6);
    doc.text('AMOUNT (₹)', R - 4, y + 6, { align: 'right' });

    const rows = [
        ['Basic Pay', Math.round(v.basic * v.factor)],
        ['House Rent Allowance (HRA)', Math.round(v.hra * v.factor)],
        ['Travel Allowance', Math.round(v.travel * v.factor)],
    ];

    doc.setTextColor(30, 30, 30);
    doc.setFont('helvetica', 'normal');
    rows.forEach(function (row, i) {
        const ry = y + 9 + i * 10;
        doc.setFillColor(i % 2 === 0 ? 248 : 255, i % 2 === 0 ? 250 : 255, i % 2 === 0 ? 255 : 255);
        doc.rect(L, ry, R - L, 10, 'F');
        doc.setDrawColor(220, 228, 245);
        doc.line(L, ry + 10, R, ry + 10);
        doc.setFontSize(9);
        doc.setTextColor(50, 50, 50);
        doc.text(row[0], L + 4, ry + 7);
        doc.text(numINR(row[1]), R - 4, ry + 7, { align: 'right' });
    });

    // Gross row
    const gy = y + 9 + rows.length * 10;
    doc.setFillColor(230, 238, 255);
    doc.rect(L, gy, R - L, 10, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(26, 26, 46);
    doc.setFontSize(9);
    doc.text('Gross Salary', L + 4, gy + 7);
    doc.text(numINR(v.gross), R - 4, gy + 7, { align: 'right' });

    // Deductions box
    const dy = gy + 14;
    doc.setFillColor(240, 245, 255);
    doc.setDrawColor(200, 210, 230);
    doc.rect(L, dy, R - L, 14, 'FD');
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(80, 80, 120);
    doc.setFontSize(8);
    doc.text('DEDUCTIONS', L + 4, dy + 6);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.setFontSize(8.5);
    doc.text('No deductions applicable (EPF / ESI not applicable)', L + 4, dy + 11);

    // Net payable
    const np = dy + 18;
    doc.setFillColor(26, 26, 46);
    doc.rect(L, np, R - L, 14, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('NET PAYABLE SALARY', L + 4, np + 9);
    doc.text('\u20B9 ' + numINR(v.net), R - 4, np + 9, { align: 'right' });

    // Amount in words
    const aw = np + 18;
    doc.setFillColor(255, 253, 230);
    doc.setDrawColor(200, 190, 100);
    doc.rect(L, aw, R - L, 10, 'FD');
    doc.setTextColor(80, 70, 20);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.text('Amount in words: ' + inWords(v.net), L + 4, aw + 7);

    // Signature section
    const sig = aw + 16;
    doc.setDrawColor(180, 180, 180);
    doc.line(L, sig + 10, L + 50, sig + 10);
    doc.line(R - 50, sig + 10, R, sig + 10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(8);
    doc.text("Employee's Signature", L, sig + 15);
    doc.text("Authorized Signatory", R - 50, sig + 15);
    doc.text('HR Department \u2014 I-BACUS-TECH SOLUTIONS PVT. LTD.', R, sig + 15, { align: 'right' });

    // Footer
    doc.setFillColor(240, 242, 248);
    doc.rect(0, 272, W, 25, 'F');
    doc.setTextColor(120, 120, 150);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'italic');
    doc.text('This is a system-generated payslip and does not require a physical signature.', W / 2, 280, { align: 'center' });
    doc.text('I-BACUS-TECH SOLUTIONS PRIVATE LIMITED | HR Division', W / 2, 286, { align: 'center' });
    doc.text('Confidential \u2014 For Internal Use Only', W / 2, 292, { align: 'center' });

    const fname = 'Payslip_' + name.replace(/ /g, '_') + '_' + (mon.replace(/ /g, '_') || 'Month') + '.pdf';
    doc.save(fname);

    // Show Success Toast
    const msg = $('msg');
    msg.classList.add('show');
    setTimeout(function () {
        msg.classList.remove('show');
    }, 3000);
}
