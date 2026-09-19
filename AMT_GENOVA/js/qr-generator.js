// QR Code Generator
// Generates QR codes dynamically based on ticket codes
// Uses CDN library for QR code generation

(function() {
    'use strict';
    
    let qrCodeLibraryLoaded = false;
    let qrCodeGenerated = false;
    
    // Function to generate QR code
    function generateQRCode(ticketCode) {
        if (!ticketCode || ticketCode === 'TYM90Q76J' || ticketCode.length < 5) {
            return false; // Don't generate for placeholder or invalid codes
        }
        
        const qrSection = document.querySelector('.qr_section');
        if (!qrSection) {
            console.log('QR section not found');
            return false;
        }
        
        // Clear existing content
        qrSection.innerHTML = '';
        
        // Check if QRCode library is available
        if (typeof QRCode === 'undefined') {
            console.log('QRCode library not loaded yet');
            qrSection.innerHTML = '<div style="text-align:center;padding:20px;color:#666;">Loading QR Code...</div>';
            return false;
        }
        
        // Create canvas element
        const canvas = document.createElement('canvas');
        canvas.id = 'qrcode-canvas';
        qrSection.appendChild(canvas);
        
        try {
            // Generate QR code
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
                    qrSection.innerHTML = '<div style="text-align:center;padding:20px;color:#666;">QR Code Error<br/><small>' + ticketCode + '</small></div>';
                } else {
                    qrCodeGenerated = true;
                    console.log('QR Code generated successfully for:', ticketCode);
                }
            });
            return true;
        } catch (error) {
            console.error('QR Code generation exception:', error);
            qrSection.innerHTML = '<div style="text-align:center;padding:20px;color:#666;">QR Code Error<br/><small>' + ticketCode + '</small></div>';
            return false;
        }
    }
    
    // Function to get ticket code from page
    function getTicketCode() {
        const ticketCodeElement = document.querySelector('.ticket_code');
        if (ticketCodeElement && ticketCodeElement.textContent) {
            const code = ticketCodeElement.textContent.trim();
            return code;
        }
        return null;
    }
    
    // Function to try generating QR code
    function tryGenerateQRCode() {
        if (qrCodeGenerated) {
            return; // Already generated
        }
        
        const ticketCode = getTicketCode();
        console.log('Attempting to generate QR code. Ticket code:', ticketCode);
        
        if (ticketCode && ticketCode !== 'TYM90Q76J' && ticketCode.length >= 5) {
            if (qrCodeLibraryLoaded && typeof QRCode !== 'undefined') {
                generateQRCode(ticketCode);
            } else {
                console.log('QRCode library not ready yet');
            }
        } else {
            console.log('Ticket code not ready or invalid:', ticketCode);
        }
    }
    
    // Function to load QRCode library
    function loadQRCodeLibrary() {
        if (qrCodeLibraryLoaded || typeof QRCode !== 'undefined') {
            qrCodeLibraryLoaded = true;
            setTimeout(tryGenerateQRCode, 100);
            return;
        }
        
        // Check if script already exists
        if (document.querySelector('script[src*="qrcode"]')) {
            console.log('QRCode script already loading');
            // Script already loading, wait for it
            const checkInterval = setInterval(function() {
                if (typeof QRCode !== 'undefined') {
                    clearInterval(checkInterval);
                    qrCodeLibraryLoaded = true;
                    tryGenerateQRCode();
                }
            }, 100);
            setTimeout(function() {
                clearInterval(checkInterval);
            }, 5000);
            return;
        }
        
        console.log('Loading QRCode library...');
        // Load QRCode library
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js';
        script.async = true;
        
        script.onload = function() {
            console.log('QRCode library loaded');
            qrCodeLibraryLoaded = true;
            setTimeout(tryGenerateQRCode, 100);
        };
        
        script.onerror = function() {
            console.error('Failed to load QRCode library');
            const qrSection = document.querySelector('.qr_section');
            if (qrSection) {
                qrSection.innerHTML = '<div style="text-align:center;padding:20px;color:#666;">QR Code Library Failed to Load</div>';
            }
        };
        
        document.head.appendChild(script);
    }
    
    // Initialize when DOM is ready
    function init() {
        console.log('QR Generator initializing...');
        
        // Load library immediately
        loadQRCodeLibrary();
        
        // Try generating after delays to ensure ticket code is set
        setTimeout(tryGenerateQRCode, 300);
        setTimeout(tryGenerateQRCode, 600);
        setTimeout(tryGenerateQRCode, 1000);
        
        // Listen for ticket code changes
        const ticketCodeElement = document.querySelector('.ticket_code');
        if (ticketCodeElement) {
            console.log('Setting up MutationObserver for ticket code');
            // Use MutationObserver to watch for changes
            const observer = new MutationObserver(function() {
                console.log('Ticket code changed, attempting QR generation');
                if (!qrCodeGenerated) {
                    setTimeout(tryGenerateQRCode, 200);
                }
            });
            
            observer.observe(ticketCodeElement, {
                childList: true,
                characterData: true,
                subtree: true
            });
        } else {
            console.log('Ticket code element not found');
        }
        
        // Also listen for custom event
        document.addEventListener('ticketCodeSet', function() {
            console.log('Ticket code set event received');
            setTimeout(tryGenerateQRCode, 300);
        });
        
        // Fallback: check periodically
        let attempts = 0;
        const checkInterval = setInterval(function() {
            attempts++;
            if (attempts > 15) {
                clearInterval(checkInterval);
                console.log('Stopped checking for QR code generation after 15 attempts');
            }
            if (!qrCodeGenerated) {
                tryGenerateQRCode();
            } else {
                clearInterval(checkInterval);
                console.log('QR code generated, stopping checks');
            }
        }, 500);
    }
    
    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM already ready
        setTimeout(init, 100);
    }
    
    // Expose generateQRCode function globally for manual calls
    window.generateQRCode = generateQRCode;
})();
