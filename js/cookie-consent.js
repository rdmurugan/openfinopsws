/**
 * GDPR Cookie Consent Manager
 * Copyright (c) 2025 Infinidatum LLC
 *
 * Manages cookie consent for GDPR compliance
 * Handles Google Analytics initialization based on user consent
 */

(function() {
    'use strict';

    const CONSENT_COOKIE_NAME = 'openfinops_cookie_consent';
    const CONSENT_EXPIRY_DAYS = 365;

    // Check if consent has been given
    function hasConsent() {
        const consent = getCookie(CONSENT_COOKIE_NAME);
        return consent === 'accepted';
    }

    // Check if consent has been denied
    function hasDeclined() {
        const consent = getCookie(CONSENT_COOKIE_NAME);
        return consent === 'declined';
    }

    // Get cookie value
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    // Set cookie
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
    }

    // Initialize Google Analytics
    function initializeAnalytics() {
        if (typeof gtag === 'function') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
            console.log('Google Analytics consent granted');
        }
    }

    // Disable Google Analytics
    function disableAnalytics() {
        if (typeof gtag === 'function') {
            gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });
            console.log('Google Analytics consent denied');
        }
        // Set GA opt-out
        window['ga-disable-G-GCTB1YQQEM'] = true;
    }

    // Show cookie banner
    function showCookieBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.style.display = 'block';
            // Fade in animation
            setTimeout(() => {
                banner.classList.add('show');
            }, 100);
        }
    }

    // Hide cookie banner
    function hideCookieBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(() => {
                banner.style.display = 'none';
            }, 300);
        }
    }

    // Accept cookies
    function acceptCookies() {
        setCookie(CONSENT_COOKIE_NAME, 'accepted', CONSENT_EXPIRY_DAYS);
        initializeAnalytics();
        hideCookieBanner();
    }

    // Decline cookies
    function declineCookies() {
        setCookie(CONSENT_COOKIE_NAME, 'declined', CONSENT_EXPIRY_DAYS);
        disableAnalytics();
        hideCookieBanner();
    }

    // Initialize on page load
    function init() {
        // Check if user has already made a choice
        if (hasConsent()) {
            initializeAnalytics();
        } else if (hasDeclined()) {
            disableAnalytics();
        } else {
            // Show banner if no choice has been made
            showCookieBanner();
        }

        // Add event listeners
        const acceptBtn = document.getElementById('cookie-accept');
        const declineBtn = document.getElementById('cookie-decline');
        const settingsLink = document.getElementById('cookie-settings');

        if (acceptBtn) {
            acceptBtn.addEventListener('click', acceptCookies);
        }

        if (declineBtn) {
            declineBtn.addEventListener('click', declineCookies);
        }

        if (settingsLink) {
            settingsLink.addEventListener('click', function(e) {
                e.preventDefault();
                showCookieBanner();
            });
        }
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose functions globally for manual control
    window.CookieConsent = {
        accept: acceptCookies,
        decline: declineCookies,
        hasConsent: hasConsent,
        showBanner: showCookieBanner
    };

})();
