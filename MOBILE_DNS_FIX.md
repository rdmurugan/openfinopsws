# Fix "Under Construction" Page on Mobile

Your mobile device is caching the old DNS records. Here's how to fix it:

## iPhone/iPad (iOS)

### Method 1: Toggle Airplane Mode (Quickest)
1. Swipe down from top-right (or up from bottom on older iPhones)
2. **Turn ON Airplane Mode** (wait 10 seconds)
3. **Turn OFF Airplane Mode**
4. Open Safari/Chrome in **Private/Incognito mode**
5. Go to: https://openfinops.org

### Method 2: Reset Network Settings
1. Settings → General → Transfer or Reset iPhone
2. Reset → Reset Network Settings
3. Enter passcode
4. Confirm reset
5. Try the website again

### Method 3: Use Different DNS
1. Settings → Wi-Fi
2. Tap the (i) next to your WiFi network
3. Scroll to **DNS**
4. Tap **Configure DNS** → Manual
5. Remove existing DNS servers
6. Add: `8.8.8.8` and `8.8.4.4` (Google DNS)
7. Save
8. Close browser completely and reopen
9. Try: https://openfinops.org

## Android

### Method 1: Clear Browser Cache
1. Settings → Apps → Chrome (or your browser)
2. Storage → Clear Cache
3. Clear Data (optional, removes bookmarks)
4. Open browser in **Incognito mode**
5. Go to: https://openfinops.org

### Method 2: Toggle Airplane Mode
1. Swipe down notification panel
2. **Turn ON Airplane Mode** (wait 10 seconds)
3. **Turn OFF Airplane Mode**
4. Open browser in Incognito mode
5. Try: https://openfinops.org

### Method 3: Change DNS (Android 9+)
1. Settings → Network & Internet → Advanced → Private DNS
2. Select **Private DNS provider hostname**
3. Enter: `dns.google`
4. Save
5. Restart browser
6. Try: https://openfinops.org

## Alternative: Use Direct GitHub URL

If none of the above work immediately, use:

**https://rdmurugan.github.io/openfinopsws/**

This bypasses the custom domain completely and shows the real site.

## Why This Happens

Mobile devices cache DNS even more aggressively than computers:
- Your phone's DNS cache
- Your mobile carrier's DNS servers (may take longer to update)
- Browser cache

The old IPs (198.x.x.x) are serving the "under construction" page from your previous hosting.

## Quick Test

Check if DNS has updated on your mobile network:

**Try in Incognito/Private mode first** - this bypasses browser cache.

If Incognito works but normal browsing doesn't → Browser cache issue
If neither works → DNS cache issue (use Airplane mode trick)

## Timeline

- Airplane mode trick: Immediate
- Browser cache clear: Immediate  
- Mobile carrier DNS: 30 minutes - 4 hours
- Using Google DNS: Immediate

**Fastest solution: Airplane mode + Incognito mode**
