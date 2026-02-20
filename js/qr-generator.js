// QR Code Generator
// Generates QR codes dynamically based on ticket codes
// Uses CDN library for QR code generation

function generateQRCode(ticketCode) {
    // Find the QR section
    const qrSection = document.querySelector('.qr_section');
    if (!qrSection) return;
    
    // Clear any existing content
    qrSection.innerHTML = '';
    
    // Create canvas element for QR code
    const canvas = document.createElement('canvas');
    canvas.id = 'qrcode-canvas';
    qrSection.appendChild(canvas);
    
    // Use QRCode.js library (loaded from CDN)
    if (typeof QRCode !== 'undefined') {
        QRCode.toCanvas(canvas, ticketCode, {
            width: 120,
            margin: 1,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            }
        }, function (error) {
            if (error) {
                console.error('QR Code generation error:', error);
                // Fallback: create a simple text display
                qrSection.innerHTML = '<div style="text-align:center;padding:20px;">QR Code<br/>' + ticketCode + '</div>';
            }
        });
    } else {
        // Fallback if library not loaded
        qrSection.innerHTML = '<div style="text-align:center;padding:20px;">QR Code<br/>' + ticketCode + '</div>';
    }
}

// Function to initialize QR code after ticket code is set
function initializeQRCode() {
    const ticketCodeElement = document.querySelector('.ticket_code');
    if (ticketCodeElement && ticketCodeElement.textContent) {
        const ticketCode = ticketCodeElement.textContent.trim();
        if (ticketCode && ticketCode !== 'TYM90Q76J') { // Don't use placeholder
            generateQRCode(ticketCode);
            return true;
        }
    }
    return false;
}

// Function to load QRCode library and generate QR code
function loadQRCodeLibraryAndGenerate() {
    if (typeof QRCode === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js';
        script.onload = function() {
            if (!initializeQRCode()) {
                // If ticket code not ready, wait a bit more
                setTimeout(function() {
                    initializeQRCode();
                }, 200);
            }
        };
        script.onerror = function() {
            console.error('Failed to load QRCode library');
            initializeQRCode(); // Still try with fallback
        };
        document.head.appendChild(script);
    } else {
        if (!initializeQRCode()) {
            setTimeout(function() {
                initializeQRCode();
            }, 200);
        }
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    loadQRCodeLibraryAndGenerate();
    
    // Listen for custom event when ticket code is set
    document.addEventListener('ticketCodeSet', function() {
        setTimeout(function() {
            if (typeof QRCode !== 'undefined') {
                initializeQRCode();
            } else {
                loadQRCodeLibraryAndGenerate();
            }
        }, 100);
    });
    
    // Also listen for ticket code updates via MutationObserver
    setTimeout(function() {
        const ticketCodeElement = document.querySelector('.ticket_code');
        if (ticketCodeElement) {
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'childList' || mutation.type === 'characterData') {
                        const code = ticketCodeElement.textContent.trim();
                        if (code && code !== 'TYM90Q76J' && typeof QRCode !== 'undefined') {
                            generateQRCode(code);
                        }
                    }
                });
            });
            
            observer.observe(ticketCodeElement, {
                childList: true,
                characterData: true,
                subtree: true
            });
        }
    }, 300);
});
