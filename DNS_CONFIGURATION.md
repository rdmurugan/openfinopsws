# DNS Configuration for openfinops.org

## Current Issue

The SSL certificate error occurs because:
1. ✅ Custom domain is configured in GitHub Pages
2. ❌ DNS apex domain (openfinops.org) points to wrong IPs
3. ⏳ GitHub is waiting to verify domain ownership before issuing SSL certificate

## Current DNS Configuration (INCORRECT)

```
openfinops.org → 198.185.159.144, 198.185.159.145, 198.49.23.144, 198.49.23.145 ❌
www.openfinops.org → rdmurugan.github.io → 185.199.108-111.153 ✅
```

## Required DNS Configuration (CORRECT)

Configure these DNS records at your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.):

### Option 1: A Records (Recommended for most providers)

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |
| CNAME | www | rdmurugan.github.io | 3600 |

**Note:** `@` represents the apex domain (openfinops.org)

### Option 2: ALIAS/ANAME Record (If your DNS provider supports it)

| Type | Name | Value | TTL |
|------|------|-------|-----|
| ALIAS | @ | rdmurugan.github.io | 3600 |
| CNAME | www | rdmurugan.github.io | 3600 |

Providers that support ALIAS/ANAME records:
- Cloudflare (CNAME Flattening)
- DNSimple (ALIAS)
- DNS Made Easy (ANAME)
- Route53 (ALIAS)

## Step-by-Step Instructions

### Step 1: Update DNS Records

1. Log in to your domain registrar (where you purchased openfinops.org)
2. Navigate to DNS Management / DNS Settings
3. **Delete** the existing A records for @ (apex domain) pointing to 198.185.159.x
4. **Add** the four new A records pointing to GitHub Pages IPs (see table above)
5. **Verify** www CNAME record points to rdmurugan.github.io (already correct)
6. Save changes

### Step 2: Wait for DNS Propagation

- DNS changes can take 5 minutes to 48 hours to propagate worldwide
- Typically takes 15-60 minutes for most providers
- Check propagation status: https://dnschecker.org/#A/openfinops.org

### Step 3: Verify DNS Configuration

Run these commands to verify:

```bash
# Check apex domain (should return GitHub IPs)
dig openfinops.org +short

# Expected output:
# 185.199.108.153
# 185.199.109.153
# 185.199.110.153
# 185.199.111.153

# Check www subdomain
dig www.openfinops.org +short

# Expected output:
# rdmurugan.github.io.
# 185.199.108.153
# ... (GitHub IPs)
```

### Step 4: Wait for GitHub to Provision SSL Certificate

Once DNS is correctly configured:

1. GitHub will automatically detect the correct DNS configuration
2. GitHub will request a Let's Encrypt SSL certificate (takes 5-10 minutes)
3. Certificate state will change from "new" → "generating" → "issued"
4. HTTPS will become available automatically

Check certificate status:
```bash
gh api repos/rdmurugan/openfinopsws/pages | grep -A 5 https_certificate
```

### Step 5: Enable HTTPS Enforcement (After certificate is issued)

Once the certificate is issued:

1. Go to: https://github.com/rdmurugan/openfinopsws/settings/pages
2. Check "Enforce HTTPS" checkbox
3. All HTTP requests will redirect to HTTPS

Or via command line:
```bash
gh api repos/rdmurugan/openfinopsws/pages -X PUT -f https_enforced=true
```

## Troubleshooting

### Problem: Certificate still shows "new" state after 24 hours

**Solution:**
1. Verify DNS is correctly configured using `dig openfinops.org`
2. Remove and re-add custom domain:
   ```bash
   # Remove custom domain
   rm CNAME
   git add CNAME
   git commit -m "Remove custom domain temporarily"
   git push
   
   # Wait 5 minutes, then re-add
   echo "openfinops.org" > CNAME
   git add CNAME
   git commit -m "Re-add custom domain"
   git push
   ```

### Problem: DNS not propagating

**Solution:**
1. Clear your local DNS cache:
   ```bash
   # macOS
   sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
   
   # Windows
   ipconfig /flushdns
   
   # Linux
   sudo systemd-resolve --flush-caches
   ```
2. Use different DNS server (e.g., 8.8.8.8) to check:
   ```bash
   dig @8.8.8.8 openfinops.org
   ```

### Problem: CAA records blocking certificate

**Solution:**
If you have CAA records, ensure they allow Let's Encrypt:
```
openfinops.org. CAA 0 issue "letsencrypt.org"
openfinops.org. CAA 0 issuewild "letsencrypt.org"
```

## Current Status

✅ CNAME file created with "openfinops.org"  
✅ GitHub Pages custom domain configured  
⏳ SSL certificate in "new" state - waiting for DNS verification  
❌ DNS apex domain needs to be updated (currently pointing to wrong IPs)

## Next Steps

1. **Update DNS records** at your domain registrar (see Step 1 above)
2. **Wait 15-60 minutes** for DNS propagation
3. **Verify DNS** using `dig openfinops.org`
4. **Wait for GitHub** to provision SSL certificate (automatic)
5. **Enable HTTPS enforcement** once certificate is issued

## Timeline

- DNS update: 2-5 minutes (at registrar)
- DNS propagation: 15-60 minutes
- SSL certificate provisioning: 5-10 minutes after DNS is verified
- **Total estimated time: 30-90 minutes**

## Verification Commands

```bash
# Check DNS configuration
dig openfinops.org +short

# Check GitHub Pages status
gh api repos/rdmurugan/openfinopsws/pages | jq '.https_certificate'

# Test website (after certificate is issued)
curl -I https://openfinops.org
```

## Resources

- [GitHub Pages Custom Domain Documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [GitHub Pages IP Addresses](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain)
- [DNS Checker Tool](https://dnschecker.org/)
- [Let's Encrypt](https://letsencrypt.org/)
