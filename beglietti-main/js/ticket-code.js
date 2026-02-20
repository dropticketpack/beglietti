// Ticket Code Generation Utility
// Generates random ticket codes in format: XXXX##XXX (e.g., TYM90Q76J)

function generateRandomTicketCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    
    // Generate first 3 characters (letters/numbers)
    for (let i = 0; i < 3; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // Generate 2 numbers
    code += Math.floor(Math.random() * 90 + 10).toString();
    
    // Generate 1 character
    code += chars.charAt(Math.floor(Math.random() * 26));
    
    // Generate 2 numbers
    code += Math.floor(Math.random() * 90 + 10).toString();
    
    // Generate 1 character
    code += chars.charAt(Math.floor(Math.random() * 26));
    
    return code;
}

// Function to get or generate ticket code for a specific ticket
function getTicketCode(ticketId, instance = 1) {
    // For files with two tickets, use instance number to differentiate
    const storageKey = instance > 1 ? `ticket_code_${ticketId}_${instance}` : `ticket_code_${ticketId}`;
    let code = localStorage.getItem(storageKey);
    
    if (!code) {
        code = generateRandomTicketCode();
        localStorage.setItem(storageKey, code);
    }
    
    return code;
}

// Function to set ticket code in the page
function setTicketCode(ticketId, instance = null) {
    // Auto-detect instance from URL if not provided
    if (instance === null) {
        const urlParams = new URLSearchParams(window.location.search);
        const urlInstance = urlParams.get('instance');
        instance = urlInstance ? parseInt(urlInstance) : 1;
    }
    
    const codeElements = document.getElementsByClassName('ticket_code');
    if (codeElements.length > 0) {
        const code = getTicketCode(ticketId, instance);
        for (let i = 0; i < codeElements.length; i++) {
            codeElements[i].textContent = code;
        }
    }
}

// Function to detect ticket ID from current page path
function detectTicketId() {
    const path = window.location.pathname;
    const filename = path.split('/').pop().replace('.html', '');
    
    // Extract folder name from path
    const pathParts = path.split('/');
    const folderName = pathParts[pathParts.length - 2];
    
    // Create ticket ID from folder and filename
    return `${folderName}_${filename}`;
}

// Auto-set ticket code on page load
document.addEventListener('DOMContentLoaded', function() {
    const ticketId = detectTicketId();
    setTicketCode(ticketId);
});

