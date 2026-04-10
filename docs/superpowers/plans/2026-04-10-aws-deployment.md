# Polynode AWS Deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deploy Polynode to `https://polynode.666mo.de` via S3 + CloudFront with GitHub Actions auto-deploy on push to `main`.

**Architecture:** Vite build output (`dist/`) is synced to a private S3 bucket in eu-central-1. CloudFront serves it globally over HTTPS using an ACM certificate. GitHub Actions runs tests first and blocks deploys on failure.

**Tech Stack:** AWS S3, AWS CloudFront, AWS ACM, AWS IAM, GitHub Actions, AWS CLI v2

---

## Prerequisites

- AWS CLI v2 installed and configured with admin credentials (`aws configure`)
- AWS account ID known — run `aws sts get-caller-identity --query Account --output text` to get it
- GitHub repo: `https://github.com/dlacorte/poly_node`
- Domain `666mo.de` managed in INWX

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `.github/workflows/deploy.yml` | Create | CI/CD pipeline: test → build → S3 sync → CF invalidation |
| `docs/aws/bucket-policy.json` | Create | S3 bucket policy template (CloudFront OAC access) |
| `docs/aws/iam-policy.json` | Create | IAM deploy user policy template |

---

## Task 1: Create S3 Bucket

**No test files — verification via AWS CLI.**

- [ ] **Step 1: Create the bucket**

```bash
aws s3api create-bucket \
  --bucket polynode-666mode \
  --region eu-central-1 \
  --create-bucket-configuration LocationConstraint=eu-central-1
```

Expected output:
```json
{
    "Location": "http://polynode-666mode.s3.amazonaws.com/"
}
```

- [ ] **Step 2: Enable versioning**

```bash
aws s3api put-bucket-versioning \
  --bucket polynode-666mode \
  --versioning-configuration Status=Enabled
```

No output on success.

- [ ] **Step 3: Block all public access**

```bash
aws s3api put-public-access-block \
  --bucket polynode-666mode \
  --public-access-block-configuration \
    "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"
```

No output on success.

- [ ] **Step 4: Verify bucket config**

```bash
aws s3api get-bucket-versioning --bucket polynode-666mode
aws s3api get-public-access-block --bucket polynode-666mode
```

Expected: versioning `Enabled`, all four public-access-block settings `true`.

- [ ] **Step 5: Commit bucket policy template**

Create `docs/aws/bucket-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::polynode-666mode/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::ACCOUNT_ID:distribution/DISTRIBUTION_ID"
        }
      }
    }
  ]
}
```

```bash
mkdir -p /Users/lacorte/Projects/repositories/poly_node/docs/aws
# create the file above, then:
git add docs/aws/bucket-policy.json
git commit -m "chore: add S3 bucket policy template for CloudFront OAC"
```

---

## Task 2: Request ACM Certificate

**Must be done in us-east-1 — CloudFront requires certificates in that region.**

- [ ] **Step 1: Request the certificate**

```bash
aws acm request-certificate \
  --domain-name polynode.666mo.de \
  --validation-method DNS \
  --region us-east-1
```

Expected output:
```json
{
    "CertificateArn": "arn:aws:acm:us-east-1:123456789012:certificate/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

**Save the CertificateArn — you need it in Task 3.**

- [ ] **Step 2: Get the DNS validation record**

```bash
aws acm describe-certificate \
  --certificate-arn <CERTIFICATE_ARN> \
  --region us-east-1 \
  --query "Certificate.DomainValidationOptions[0].ResourceRecord"
```

Expected output:
```json
{
    "Name": "_abc123def456.polynode.666mo.de.",
    "Type": "CNAME",
    "Value": "_xyz789.acm-validations.aws."
}
```

- [ ] **Step 3: Add validation CNAME in INWX**

Log in to INWX → DNS → `666mo.de` → Add record:

```
Type:  CNAME
Name:  _abc123def456.polynode   (strip the trailing .666mo.de. from the Name)
Value: _xyz789.acm-validations.aws.
TTL:   300
```

- [ ] **Step 4: Wait for certificate to be issued**

```bash
aws acm wait certificate-validated \
  --certificate-arn <CERTIFICATE_ARN> \
  --region us-east-1
```

This command blocks until validation completes (typically 2–5 minutes). Returns with no output on success.

- [ ] **Step 5: Verify**

```bash
aws acm describe-certificate \
  --certificate-arn <CERTIFICATE_ARN> \
  --region us-east-1 \
  --query "Certificate.Status"
```

Expected: `"ISSUED"`

---

## Task 3: Create CloudFront Distribution

**Requires:** S3 bucket (Task 1), ACM certificate ARN (Task 2), AWS account ID.

- [ ] **Step 1: Create an Origin Access Control (OAC)**

```bash
aws cloudfront create-origin-access-control \
  --origin-access-control-config '{
    "Name": "polynode-oac",
    "Description": "OAC for polynode S3 bucket",
    "SigningProtocol": "sigv4",
    "SigningBehavior": "always",
    "OriginAccessControlOriginType": "s3"
  }'
```

Expected output includes an `Id` field. **Save the OAC Id.**

```json
{
    "OriginAccessControl": {
        "Id": "EXXXXXXXXXXXXXXXXX",
        ...
    }
}
```

- [ ] **Step 2: Create the distribution**

```bash
aws cloudfront create-distribution --distribution-config '{
  "CallerReference": "polynode-666mode-'$(date +%s)'",
  "Aliases": {
    "Quantity": 1,
    "Items": ["polynode.666mo.de"]
  },
  "DefaultRootObject": "index.html",
  "Origins": {
    "Quantity": 1,
    "Items": [{
      "Id": "s3-polynode-666mode",
      "DomainName": "polynode-666mode.s3.eu-central-1.amazonaws.com",
      "S3OriginConfig": {"OriginAccessIdentity": ""},
      "OriginAccessControlId": "<OAC_ID>"
    }]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "s3-polynode-666mode",
    "ViewerProtocolPolicy": "redirect-to-https",
    "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6",
    "AllowedMethods": {
      "Quantity": 2,
      "Items": ["GET", "HEAD"],
      "CachedMethods": {"Quantity": 2, "Items": ["GET", "HEAD"]}
    },
    "Compress": true,
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": {"Forward": "none"}
    },
    "MinTTL": 0
  },
  "CacheBehaviors": {
    "Quantity": 1,
    "Items": [{
      "PathPattern": "/index.html",
      "TargetOriginId": "s3-polynode-666mode",
      "ViewerProtocolPolicy": "redirect-to-https",
      "CachePolicyId": "4135ea2d-6df8-44a3-9df3-4b5a84be39ad",
      "AllowedMethods": {
        "Quantity": 2,
        "Items": ["GET", "HEAD"],
        "CachedMethods": {"Quantity": 2, "Items": ["GET", "HEAD"]}
      },
      "Compress": true,
      "ForwardedValues": {
        "QueryString": false,
        "Cookies": {"Forward": "none"}
      },
      "MinTTL": 0
    }]
  },
  "CustomErrorResponses": {
    "Quantity": 1,
    "Items": [{
      "ErrorCode": 404,
      "ResponsePagePath": "/index.html",
      "ResponseCode": "200",
      "ErrorCachingMinTTL": 0
    }]
  },
  "Comment": "Polynode drum machine",
  "PriceClass": "PriceClass_100",
  "Enabled": true,
  "ViewerCertificate": {
    "ACMCertificateArn": "<CERTIFICATE_ARN>",
    "SSLSupportMethod": "sni-only",
    "MinimumProtocolVersion": "TLSv1.2_2021"
  },
  "HttpVersion": "http2and3",
  "IsIPV6Enabled": true
}'
```

**Cache policy IDs used above:**
- `658327ea-f89d-4fab-a63d-7e88639e58f6` = `CachingOptimized` (AWS managed, for assets)
- `4135ea2d-6df8-44a3-9df3-4b5a84be39ad` = `CachingDisabled` (AWS managed, for index.html)

**Save from the output:**
- `Distribution.Id` → the distribution ID (e.g. `E1ABCDEF123456`)
- `Distribution.DomainName` → the CloudFront domain (e.g. `d1234abcd.cloudfront.net`)

- [ ] **Step 3: Apply bucket policy**

Get your AWS account ID:
```bash
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
```

Copy `docs/aws/bucket-policy.json` to a temp file and substitute values:
```bash
sed \
  -e "s/ACCOUNT_ID/$ACCOUNT_ID/" \
  -e "s/DISTRIBUTION_ID/<DISTRIBUTION_ID>/" \
  docs/aws/bucket-policy.json > /tmp/bucket-policy-final.json

aws s3api put-bucket-policy \
  --bucket polynode-666mode \
  --policy file:///tmp/bucket-policy-final.json
```

No output on success.

- [ ] **Step 4: Verify distribution is deploying**

```bash
aws cloudfront get-distribution \
  --id <DISTRIBUTION_ID> \
  --query "Distribution.Status"
```

Expected: `"InProgress"` (takes 5–15 minutes to reach `"Deployed"`). Continue to next tasks while it deploys.

---

## Task 4: Create IAM Deploy User

- [ ] **Step 1: Create the IAM user**

```bash
aws iam create-user --user-name polynode-deploy
```

Expected:
```json
{
    "User": {
        "UserName": "polynode-deploy",
        ...
    }
}
```

- [ ] **Step 2: Create and save IAM policy template**

Create `docs/aws/iam-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:GetObject"
      ],
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
      "Resource": "arn:aws:cloudfront::ACCOUNT_ID:distribution/DISTRIBUTION_ID"
    }
  ]
}
```

```bash
git add docs/aws/iam-policy.json
git commit -m "chore: add IAM deploy user policy template"
```

- [ ] **Step 3: Apply policy to user**

```bash
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

sed \
  -e "s/ACCOUNT_ID/$ACCOUNT_ID/" \
  -e "s/DISTRIBUTION_ID/<DISTRIBUTION_ID>/" \
  docs/aws/iam-policy.json > /tmp/iam-policy-final.json

aws iam put-user-policy \
  --user-name polynode-deploy \
  --policy-name polynode-deploy-policy \
  --policy-document file:///tmp/iam-policy-final.json
```

- [ ] **Step 4: Create access key**

```bash
aws iam create-access-key --user-name polynode-deploy
```

Expected:
```json
{
    "AccessKey": {
        "AccessKeyId": "AKIAIOSFODNN7EXAMPLE",
        "SecretAccessKey": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
        ...
    }
}
```

**Save `AccessKeyId` and `SecretAccessKey` — the secret is only shown once.**

- [ ] **Step 5: Verify permissions**

```bash
# Test S3 access with the new credentials
AWS_ACCESS_KEY_ID=<AccessKeyId> \
AWS_SECRET_ACCESS_KEY=<SecretAccessKey> \
AWS_DEFAULT_REGION=eu-central-1 \
aws s3 ls s3://polynode-666mode/
```

Expected: empty listing (no error). If you get `AccessDenied`, recheck the policy.

---

## Task 5: GitHub Actions Workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Add GitHub secrets**

Go to `https://github.com/dlacorte/poly_node/settings/secrets/actions` → New repository secret. Add all five:

| Secret name | Value |
|---|---|
| `AWS_ACCESS_KEY_ID` | The `AccessKeyId` from Task 4 |
| `AWS_SECRET_ACCESS_KEY` | The `SecretAccessKey` from Task 4 |
| `AWS_REGION` | `eu-central-1` |
| `S3_BUCKET` | `polynode-666mode` |
| `CLOUDFRONT_DISTRIBUTION_ID` | The distribution ID from Task 3 (e.g. `E1ABCDEF123456`) |

- [ ] **Step 2: Create the workflow file**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test -- --run

      - name: Build
        run: npm run build

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ secrets.AWS_REGION }}

      - name: Deploy to S3
        run: aws s3 sync dist/ s3://${{ secrets.S3_BUCKET }} --delete

      - name: Invalidate CloudFront cache
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} \
            --paths "/*"
```

- [ ] **Step 3: Commit and push**

```bash
cd /Users/lacorte/Projects/repositories/poly_node
mkdir -p .github/workflows
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Actions deploy workflow (S3 + CloudFront)"
git push origin main
```

- [ ] **Step 4: Verify the workflow runs**

Go to `https://github.com/dlacorte/poly_node/actions`. The `Deploy` workflow should appear and run. Watch it complete:

- ✅ Install → Test → Build → Configure AWS → Deploy to S3 → Invalidate CloudFront

If any step fails, click the step to see the error output.

- [ ] **Step 5: Verify files are in S3**

```bash
aws s3 ls s3://polynode-666mode/ --recursive | head -20
```

Expected: list of `dist/` files (`index.html`, `assets/index-xxx.js`, etc.)

---

## Task 6: INWX DNS + Final Verification

**Requires:** CloudFront distribution status `Deployed` (from Task 3 Step 4).

- [ ] **Step 1: Confirm distribution is deployed**

```bash
aws cloudfront get-distribution \
  --id <DISTRIBUTION_ID> \
  --query "Distribution.Status"
```

Expected: `"Deployed"`. If still `"InProgress"`, wait and re-run.

- [ ] **Step 2: Add CNAME in INWX**

Log in to INWX → DNS → `666mo.de` → Add record:

```
Type:  CNAME
Name:  polynode
Value: <CloudFront DomainName from Task 3, e.g. d1234abcd.cloudfront.net>
TTL:   300
```

Save the record.

- [ ] **Step 3: Wait for DNS propagation**

```bash
# Check every 30s until it resolves
watch -n 30 dig polynode.666mo.de CNAME +short
```

Expected: `d1234abcd.cloudfront.net.`

Alternatively without `watch`:
```bash
dig polynode.666mo.de CNAME +short
```

Typically resolves within 1–3 minutes with TTL 300.

- [ ] **Step 4: Verify HTTPS**

```bash
curl -I https://polynode.666mo.de
```

Expected:
```
HTTP/2 200
content-type: text/html
...
```

- [ ] **Step 5: Open in browser**

```bash
open https://polynode.666mo.de
```

Verify the Polynode app loads, audio plays, PRESETS modal opens.

- [ ] **Step 6: Verify deploy pipeline end-to-end**

Make a trivial change (e.g. bump a comment in `src/App.tsx`), push to `main`, and confirm:

1. GitHub Actions workflow runs and passes
2. `curl -I https://polynode.666mo.de` returns updated content (check `x-cache` header shows `Miss` then `Hit` on second request)

---

## Notes

**CloudFront distribution takes 5–15 minutes** to fully deploy after creation (Task 3). Tasks 4 and 5 can be done in parallel while waiting.

**ACM certificate ARN** needed in Task 3 — note it after Task 2.

**Distribution ID** needed in Tasks 4 and 5 — note it after Task 3 Step 2.

**The INWX ACM validation CNAME** (added in Task 2 Step 3) can remain in DNS permanently — it is harmless and will be needed if the certificate is ever renewed.
