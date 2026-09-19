// PIN Authentication System
const PIN_CODE = '8899';
const PIN_COOKIE_NAME = 'ticket_pin_verified';

// Function to get cookie value
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// Function to set cookie
function setCookie(name, value, days = 365) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
}

// Function to check if PIN is verified
function isPinVerified() {
    return getCookie(PIN_COOKIE_NAME) === 'true';
}

// Function to verify PIN
function verifyPin() {
    const pin = prompt('Please enter the PIN to access your tickets:');
    if (pin === PIN_CODE) {
        setCookie(PIN_COOKIE_NAME, 'true');
        return true;
    } else if (pin !== null) {
        alert('Incorrect PIN. Please try again.');
        return false;
    }
    return false;
}

// Function to require PIN authentication
function requirePinAuth() {
    if (!isPinVerified()) {
        if (!verifyPin()) {
            // Redirect to index or prevent access
            const currentPath = window.location.pathname;
            const indexPath = currentPath.substring(0, currentPath.lastIndexOf('/')) + '/index.html';
            window.location.href = indexPath;
            return false;
        }
    }
    return true;
}

// Auto-check on page load
document.addEventListener('DOMContentLoaded', function() {
    // Only check PIN on ticket detail pages, not on index pages
    const pathname = window.location.pathname;
    const isTicketDetailPage = pathname.includes('.html') && 
                                !pathname.includes('index.html') &&
                                (pathname.includes('EE') || pathname.includes('PDTU') || pathname.includes('AERO'));
    
    if (isTicketDetailPage) {
        if (!requirePinAuth()) {
            // If PIN verification failed, stop execution
            return;
        }
    }
});

