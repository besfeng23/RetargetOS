# Security Guidelines for RetargetOS

## 🔐 Credentials & Secrets Management

### Never Commit Secrets
- **NEVER** commit `.env.local` or any files containing credentials
- **NEVER** commit API keys, database passwords, or authentication tokens
- Verify `.gitignore` includes all sensitive files before committing

### Environment Variables

#### Public Keys (Frontend-Safe)
These can be exposed to the browser and are prefixed with `NEXT_PUBLIC_`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SB_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_RETARGETOS_FUNCTION_BASE_URL`
- `NEXT_PUBLIC_RETARGETOS_DEFAULT_REPO`

#### Secret Keys (Backend-Only)
**NEVER** prefix these with `NEXT_PUBLIC_`. They're for server-side use only:
- `SUPABASE_SERVICE_ROLE_KEY` - Full database access, bypasses RLS
- `SB_SECRET_KEY` - Admin-level operations

### Local Development Setup

1. Copy the template:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in values with your development credentials

3. **NEVER commit `.env.local`** - it's already in `.gitignore`

4. Verify before committing:
   ```bash
   git status
   # Should NOT show .env.local
   ```

### GitHub Secrets Configuration

Store all secrets as GitHub repository secrets:

**Settings → Secrets and variables → Actions**

| Secret Name | Type | Value |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Supabase anon key |
| `NEXT_PUBLIC_SB_PUBLISHABLE_KEY` | Public | Supabase publishable key |
| `NEXT_PUBLIC_RETARGETOS_FUNCTION_BASE_URL` | Public | Functions base URL |
| `NEXT_PUBLIC_RETARGETOS_DEFAULT_REPO` | Public | Default repository URL |
| `SUPABASE_SERVICE_ROLE_KEY` | **Secret** | Service role key (no NEXT_PUBLIC_) |
| `VERCEL_TOKEN` | **Secret** | Vercel deployment token |

## 🚨 If You Accidentally Commit Secrets

1. **Immediately revoke** the leaked keys in your provider (Supabase, Vercel, etc.)
2. **Regenerate new keys**
3. Update GitHub Secrets with new values
4. Rewrite Git history if needed:
   ```bash
   git filter-repo --invert-regex --path-glob-file <(echo "*.env*")
   git push --force-with-lease
   ```

## 🛡️ Security Best Practices

- ✅ Use GitHub's branch protection rules
- ✅ Require code reviews before merge
- ✅ Enable secret scanning in repository settings
- ✅ Enable push protection to block credential commits
- ✅ Rotate secrets regularly (quarterly recommended)
- ✅ Use different credentials for dev/staging/production
- ✅ Monitor audit logs for suspicious activity
- ✅ Keep dependencies up-to-date (Dependabot enabled)

## 🔍 Detecting Leaks

Before pushing, check for credentials:

```bash
# Search for common patterns
git diff --cached | grep -i "secret\|password\|key\|token" || echo "✅ No obvious secrets found"

# Use pre-commit hooks (optional but recommended)
npm install --save-dev pre-commit detect-secrets
```

## 📋 Credential Rotation Schedule

- **Quarterly**: Rotate Supabase service role keys
- **Monthly**: Review GitHub Secrets audit log
- **On-demand**: Immediately revoke if suspected compromise

## 🔗 Resources

- [Supabase Security Guide](https://supabase.com/docs/guides/security)
- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)
- [OWASP Secrets Management](https://owasp.org/www-community/Sensitive_Data_Exposure)

---

**Questions?** Contact the maintainers or open a security issue (privately).
