# Polynode AWS Deployment — Design Spec

**Date:** 2026-04-10  
**Status:** Approved

---

## Overview

Deploy Polynode (a static Vite/React build) to AWS using S3 + CloudFront. GitHub Actions runs tests and deploys on every push to `main`. The app is served at `polynode.666mo.de` via a CNAME in INWX pointing to the CloudFront distribution.

---

## Architecture

```
GitHub (main) → GitHub Actions → S3 (eu-central-1)
                                        ↓
                               CloudFront (global)
                                        ↓
                            polynode.666mo.de (INWX CNAME)
```

---

## Infrastructure

### S3 Bucket

- **Region:** `eu-central-1` (Frankfurt)
- **Name:** `polynode-666mode` (globally unique, no dots — dots cause SSL issues with path-style requests)
- **Access:** Private. No public bucket policy. CloudFront accesses via Origin Access Control (OAC).
- **Versioning:** Enabled
- **Static website hosting:** Disabled (CloudFront serves directly from bucket via OAC, not the S3 website endpoint)

### ACM Certificate

- **Region:** `us-east-1` (required for CloudFront — certificates for CloudFront must be in us-east-1 regardless of bucket region)
- **Domain:** `polynode.666mo.de`
- **Validation:** DNS validation — AWS provides a CNAME name + value; add to INWX once during setup, then ACM issues the cert (~5 min)

### CloudFront Distribution

- **Origin:** S3 bucket via Origin Access Control (OAC) — not the S3 website endpoint
- **SSL:** ACM certificate for `polynode.666mo.de`
- **Alternate domain (CNAME):** `polynode.666mo.de`
- **Default root object:** `index.html`
- **Custom error response:** HTTP 404 → `index.html`, response code 200 (SPA fallback)
- **Cache behavior:**
  - `/index.html`: Cache-Control `no-cache` (always fetch latest)
  - Everything else (`/assets/*`): managed CachingOptimized policy (long TTL, Vite adds content hash to filenames)
- **HTTP → HTTPS:** Redirect all HTTP to HTTPS
- **Price class:** PriceClass_100 (US, EU, Israel) — sufficient for European audience

---

## GitHub Actions Workflow

**File:** `.github/workflows/deploy.yml`  
**Trigger:** `push` to `main` branch

### Steps

1. `actions/checkout@v4`
2. `actions/setup-node@v4` — Node 22, `cache: 'npm'`
3. `npm ci`
4. `npm run test -- --run` — full Vitest suite; workflow fails and does not deploy if any test fails
5. `npm run build` — produces `dist/`
6. `aws s3 sync dist/ s3://$S3_BUCKET --delete` — uploads new files, removes deleted ones
7. `aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"` — clears CDN cache so users get the new version immediately

### GitHub Secrets Required

| Secret | Value |
|---|---|
| `AWS_ACCESS_KEY_ID` | IAM user access key |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret |
| `AWS_REGION` | `eu-central-1` |
| `S3_BUCKET` | `polynode-666mode` |
| `CLOUDFRONT_DISTRIBUTION_ID` | e.g. `E1ABCDEF123456` |

---

## IAM User & Policy

A dedicated IAM user `polynode-deploy` with no console access. Minimal inline policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:DeleteObject", "s3:GetObject"],
      "Resource": "arn:aws:s3:::polynode-666mode/*"
    },
    {
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::polynode-666mode"
    },
    {
      "Effect": "Allow",
      "Action": "cloudfront:CreateInvalidation",
      "Resource": "arn:aws:cloudfront::*:distribution/DISTRIBUTION_ID"
    }
  ]
}
```

`DISTRIBUTION_ID` is replaced with the actual CloudFront distribution ID after creation.

---

## DNS Setup (INWX)

### Step 1 — ACM Validation (one-time)

During ACM certificate creation, AWS provides a CNAME record for DNS validation:

- Add the CNAME to INWX under `666mo.de`
- Wait ~5 minutes for ACM to issue the certificate
- The record can be left in place (harmless) or deleted after issuance

### Step 2 — Point Subdomain to CloudFront

Add to INWX DNS for `666mo.de`:

```
Type:  CNAME
Name:  polynode
Value: <CloudFront distribution domain, e.g. d1234abcd.cloudfront.net>
TTL:   300
```

---

## Out of Scope

- Infrastructure-as-code (Terraform / CDK)
- Multiple environments (staging / production)
- Route 53
- Automatic subdomain provisioning
- Monitoring / alerting

---

## Success Criteria

- Pushing to `main` triggers the workflow; tests must pass before deploy
- `https://polynode.666mo.de` serves the app with valid SSL
- Stale content is cleared on every deploy (CloudFront invalidation)
- A failed test suite blocks the deploy
