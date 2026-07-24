# AWS Security Checklist

## IAM

- [ ] Root account has MFA enabled (hardware MFA recommended)
- [ ] No IAM access keys for root user
- [ ] IAM users: MFA enabled for all privileged users
- [ ] Least privilege: IAM policies grant only required actions
- [ ] No `*` resource in IAM policies (unless truly needed)
- [ ] IAM password policy: min 14 chars, require symbols, numbers, uppercase/lowercase, password reuse prevention (24 passwords)
- [ ] Access keys rotated every 90 days
- [ ] IAM roles for EC2/ECS/Lambda (not hardcoded credentials)
- [ ] Service control policies (SCPs) in AWS Organizations enforcing restrictions
- [ ] IAM access analyzer enabled

## EC2 / Compute

- [ ] Security groups: least privilege (no 0.0.0.0/0 on SSH/RDP)
- [ ] Instances in private subnets (no public IP) unless serving internet
- [ ] IMDSv2 enforced (`HttpTokens=required`)
- [ ] IAM roles attached, not embedded credentials
- [ ] Unused instances terminated
- [ ] Base images from trusted sources (Amazon Linux, Ubuntu)
- [ ] Regular patching (automated or scheduled)

## S3

- [ ] Buckets private by default (no public-read ACLs)
- [ ] Block public access settings enabled
- [ ] Bucket policies least privilege
- [ ] Encryption at rest enabled (SSE-S3, SSE-KMS, or SSE-C)
- [ ] Versioning enabled for critical data
- [ ] Lifecycle policies for old versions
- [ ] Access logging enabled
- [ ] Pre-signed URLs with short expiry for temporary access
- [ ] No sensitive data in bucket names or object keys

## RDS / Databases

- [ ] Not publicly accessible
- [ ] Encrypted at rest (KMS)
- [ ] Backups encrypted
- [ ] Strong password (auto-generated preferred)
- [ ] In transit: SSL/TLS required
- [ ] Security groups restrict access to app servers only
- [ ] Automated backups with retention period configured
- [ ] Deletion protection enabled (prevent accidental drop)
- [ ] Parameter groups: `log_connections=1`, `log_disconnections=1`

## VPC

- [ ] No default VPC in use (or properly locked down)
- [ ] Public subnets: only for load balancers/NAT gateways
- [ ] Private subnets for application servers, databases
- [ ] NACLs deny all by default, explicit allow
- [ ] Flow logs enabled for network traffic analysis
- [ ] VPC endpoints for S3, DynamoDB (keep traffic on AWS network)
- [ ] No internet gateway attached to private subnets

## CloudFront / CDN

- [ ] Origin access identity (OAI) for S3 origins (prevent direct S3 access)
- [ ] WAF enabled with OWASP Core Rule Set
- [ ] HTTPS only (viewer protocol policy: Redirect HTTP to HTTPS)
- [ ] TLS 1.2+ only (TLS security policy 2021 or later)
- [ ] Origin shield enabled (optional for caching)
- [ ] Geo-restriction if appropriate
- [ ] Signed URLs/cookies for restricted content

## Lambda

- [ ] Least privilege IAM role
- [ ] No environment variable secrets (use AWS Secrets Manager or Parameter Store)
- [ ] VPC attached if accessing private resources
- [ ] Timeout set appropriately (not infinite)
- [ ] Memory appropriately sized (cost + performance)
- [ ] Dead letter queue configured for async invocations
- [ ] Concurrency limits to prevent DoS

## Secrets Management

- [ ] Secrets Manager or Parameter Store for API keys, DB passwords, certificates
- [ ] Rotation configured where possible (RDS, Secrets Manager secrets)
- [ ] IAM policies restrict secret access to specific roles/functions
- [ ] Secrets not in CloudFormation templates (use dynamic references)
- [ ] Cross-account access uses IAM roles, not secrets replication

## Monitoring & Logging

- [ ] CloudTrail enabled in all regions, logs encrypted, sent to S3
- [ ] CloudTrail log file validation enabled (tamper detection)
- [ ] AWS Config enabled (resource compliance)
- [ ] GuardDuty enabled (threat detection)
- [ ] Security Hub enabled (centralized security posture)
- [ ] S3 access logs, CloudFront logs, VPC flow logs forwarded to SIEM
- [ ] Alerts configured for: root login, IAM changes, unusual API calls, S3 public access

## Kubernetes (EKS)

- [ ] Cluster endpoint not public (`endpointPrivateAccess=true`)
- [ ] IAM OIDC provider enabled for IAM roles for service accounts
- [ ] Pod security policies / OPA Gatekeeper enforcing least privilege
- [ ] Secrets as Kubernetes secrets (not environment variables)
- [ ] Network policies restricting pod-to-pod communication
- [ ] KubeAudit or similar in CI/CD
- [ ] Regular image scanning (Trivy, Clair)

## General

- [ ] Multi-factor authentication for all users with console access
- [ ] Regular access reviews (quarterly) – remove unused accounts
- [ ] Tagging strategy enforced (owner, environment, compliance)
- [ ] Backup strategy tested (restore drills quarterly)
- [ ] Incident response plan documented and tested
- [ ] PCI-DSS/HIPAA/SOC2 controls as applicable documented
