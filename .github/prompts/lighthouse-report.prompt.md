---
description: 'Parse Lighthouse accessibility audit JSON/output and format into readable report with WCAG mappings, prioritized issues, and actionable recommendations.'
agent: 'agent'
argument-hint: 'Paste Lighthouse JSON or provide file path'
---

**Prompt: Parse Lighthouse Accessibility Report**

Your task is to parse a Lighthouse accessibility audit report (JSON format or text output) and transform it into a clear, actionable report that developers can use to fix accessibility issues.

---

## Input Formats Accepted

1. **Lighthouse JSON Export**
   - Full JSON report from Chrome DevTools
   - CLI output: `lighthouse <url> --output=json`
   
2. **Lighthouse HTML Report**
   - Extract accessibility section data
   
3. **DevTools Accessibility Panel**
   - Screenshot or text paste of issues

---

## Report Structure

Generate a formatted report with the following sections:

### 1. Accessibility Score Summary

```markdown
## Accessibility Audit Summary

**Overall Score:** [0-100] / 100
**Performance Date:** [timestamp]
**Audited URL:** [url]
**Lighthouse Version:** [version]

**Score Breakdown:**
- ✅ Passed: [count] audits
- ⚠️ Needs Manual Review: [count] items
- ❌ Failed: [count] audits
- ℹ️ Not Applicable: [count] audits
```

### 2. Critical Issues (Failed Audits)

For each failed audit, extract and format:

**[Audit Title]**
- **WCAG Mapping:** [e.g., 1.1.1 Non-text Content (Level A)]
- **Severity:** Critical | Major | Minor
- **Score:** 0 (fail)
- **Description:** [What Lighthouse found]
- **Affected Elements:** [Count and selector examples]
- **User Impact:** [How this affects users with disabilities]
- **How to Fix:**
  1. [Step 1]
  2. [Step 2]
  3. [Code example if applicable]
- **Learn More:** [Link to Lighthouse docs]

### 3. Items to Review Manually

List audits that passed automated checks but need manual verification:

**[Audit Title]**
- **What to Check:** [Specific manual test needed]
- **How to Test:** [Instructions]
- **Why It Matters:** [User impact]

Common manual checks:
- Color contrast in non-static UI states
- Keyboard navigation through complex widgets
- Screen reader announcements for dynamic content
- Focus management in modals/dialogs
- Alt text quality and relevance

### 4. WCAG 2.2 Compliance Map

Map Lighthouse audits to WCAG success criteria:

| WCAG | Level | Criterion | Lighthouse Audit | Status |
|------|-------|-----------|------------------|--------|
| 1.1.1 | A | Non-text Content | image-alt | ❌ Fail |
| 1.3.1 | A | Info and Relationships | list, listitem | ✅ Pass |
| 1.4.3 | AA | Contrast (Minimum) | color-contrast | ⚠️ Manual |
| 2.1.1 | A | Keyboard | interactive-element-affordance | ✅ Pass |
| 2.4.1 | A | Bypass Blocks | bypass | ❌ Fail |
| 2.4.4 | A | Link Purpose | link-name | ❌ Fail |
| 2.4.7 | AA | Focus Visible | focus-visible | ⚠️ Manual |
| 3.1.1 | A | Language of Page | html-has-lang | ✅ Pass |
| 4.1.2 | A | Name, Role, Value | button-name, label | ❌ Fail |

### 5. Prioritized Action Items

Organize by priority based on user impact and WCAG level:

**P0: Critical (WCAG Level A Violations)**
1. [Issue] - Affects [user group] - [WCAG criterion]
   - Fix: [specific action]
   - Files: [affected components]

**P1: High (WCAG Level AA Violations)**
1. [Issue] - Affects [user group] - [WCAG criterion]
   - Fix: [specific action]

**P2: Medium (Manual Review Items)**
1. [Item to verify]
   - Test: [how to verify]

**P3: Low (Best Practices)**
1. [Improvement opportunity]

### 6. Affected Elements Detail

For each failed audit with specific elements:

**[Audit Name]**

Affected elements ([count] total):

```html
<!-- Example 1 -->
<img src="/hero.jpg" />
<!-- Fix: Add descriptive alt attribute -->
<img src="/hero.jpg" alt="Team collaborating on React project" />

<!-- Example 2 -->
<div class="card"></div>
<!-- Fix: Add heading for section -->
<div class="card">
  <h2>Card Title</h2>
</div>
```

Selectors:
- `img.hero-image` (line 45 in Home.tsx)
- `div.card:nth-child(3)` (line 120 in Dashboard.tsx)
- `button.icon-only` (line 78 in Navigation.tsx)

### 7. Quick Wins

Identify issues that are easy to fix but have high impact:

**Fix < 1 hour, High Impact:**
1. Add missing `<html lang="en">` attribute - affects all screen reader users
2. Add alt text to 8 images - WCAG 1.1.1 Level A
3. Add aria-label to 5 icon buttons - WCAG 4.1.2 Level A

**Fix < 4 hours, Medium Impact:**
1. Implement skip link - WCAG 2.4.1 Level A
2. Fix form label associations - WCAG 3.3.2 Level A
3. Add heading structure to dashboard - WCAG 2.4.6 Level AA

### 8. Recommendations

**Immediate Actions:**
- Fix all Level A violations (P0 priority)
- Review and test color contrast manually
- Verify keyboard navigation works throughout app

**Process Improvements:**
- Run Lighthouse in CI/CD pipeline (fail build on score < 90)
- Add accessibility checks to PR checklist
- Use axe DevTools for more detailed analysis

**Tools to Integrate:**
- `@axe-core/react` for runtime checks in development
- `eslint-plugin-jsx-a11y` for linting JSX
- `pa11y` for automated accessibility testing

---

## Parsing Instructions

When processing Lighthouse JSON:

### Extract Key Data

```javascript
// From Lighthouse JSON structure
const report = JSON.parse(lighthouseJson)

const score = report.categories.accessibility.score * 100
const audits = report.audits

// Failed audits (score === 0)
const failures = Object.entries(audits)
  .filter(([key, audit]) => audit.score === 0)
  .map(([key, audit]) => ({
    id: key,
    title: audit.title,
    description: audit.description,
    score: audit.score,
    details: audit.details,
    wcagMapping: audit.tags?.filter(tag => tag.startsWith('wcag'))
  }))

// Manual review items (score === null or scoreDisplayMode === 'manual')
const manualReviews = Object.entries(audits)
  .filter(([key, audit]) => 
    audit.score === null || 
    audit.scoreDisplayMode === 'manual'
  )

// Passed audits
const passes = Object.entries(audits)
  .filter(([key, audit]) => audit.score === 1)
```

### Map Lighthouse Audits to WCAG

Common mappings:

| Lighthouse Audit ID | WCAG Criterion |
|---------------------|----------------|
| `image-alt` | 1.1.1 Non-text Content (A) |
| `button-name` | 4.1.2 Name, Role, Value (A) |
| `link-name` | 4.1.2 Name, Role, Value (A) |
| `color-contrast` | 1.4.3 Contrast Minimum (AA) |
| `html-has-lang` | 3.1.1 Language of Page (A) |
| `bypass` | 2.4.1 Bypass Blocks (A) |
| `document-title` | 2.4.2 Page Titled (A) |
| `heading-order` | 2.4.6 Headings and Labels (AA) |
| `label` | 3.3.2 Labels or Instructions (A) |
| `list` | 1.3.1 Info and Relationships (A) |
| `listitem` | 1.3.1 Info and Relationships (A) |
| `meta-viewport` | 1.4.4 Resize Text (AA) |
| `aria-valid-attr` | 4.1.2 Name, Role, Value (A) |
| `aria-allowed-attr` | 4.1.2 Name, Role, Value (A) |

### Calculate Priority

```javascript
function calculatePriority(audit) {
  const wcagLevel = audit.tags?.find(tag => 
    tag.includes('level-a') || tag.includes('level-aa')
  )
  
  if (audit.score === 0 && wcagLevel?.includes('level-a')) {
    return 'P0: Critical'
  }
  if (audit.score === 0 && wcagLevel?.includes('level-aa')) {
    return 'P1: High'
  }
  if (audit.score === null || audit.scoreDisplayMode === 'manual') {
    return 'P2: Medium'
  }
  return 'P3: Low'
}
```

---

## Example Output Format

```markdown
# Lighthouse Accessibility Report

**Audited:** March 24, 2026  
**URL:** https://example.com/dashboard  
**Score:** 68/100 ⚠️

## Summary

- ✅ **Passed:** 32 audits
- ❌ **Failed:** 8 audits (fix these!)
- ⚠️ **Manual Review:** 12 items
- ℹ️ **Not Applicable:** 5 audits

**Key Issues:**
- 12 images missing alt text (WCAG 1.1.1)
- 5 buttons without accessible names (WCAG 4.1.2)
- No skip link for main content (WCAG 2.4.1)

---

## Critical Issues to Fix

### 1. [image-alt] Images Missing Alt Text

**WCAG:** 1.1.1 Non-text Content (Level A)  
**Severity:** Critical  
**Impact:** Screen reader users cannot understand image content

**12 images found without alt attribute:**

```html
<!-- ❌ WRONG -->
<img src="/assets/hero.jpg" />

<!-- ✅ CORRECT -->
<img src="/assets/hero.jpg" alt="Team collaborating on React dashboard project" />
```

**Affected Files:**
- `src/pages/Home.tsx` - Line 45 (`.hero-image`)
- `src/components/Gallery.tsx` - Lines 78, 92, 105
- `src/components/TeamSection.tsx` - Lines 23, 45, 67, 89

**Fix Steps:**
1. Add descriptive `alt` attribute to each image
2. For decorative images, use `alt=""` (empty string)
3. Test with screen reader (NVDA/VoiceOver)

**Learn More:** https://web.dev/image-alt/

---

### 2. [button-name] Buttons Without Accessible Names

**WCAG:** 4.1.2 Name, Role, Value (Level A)  
**Severity:** Critical  
**Impact:** Screen reader users cannot identify button purpose

**5 buttons found without accessible names:**

```tsx
// ❌ WRONG - Icon-only button without label
<button onClick={handleClose}>
  <XIcon />
</button>

// ✅ CORRECT - Add aria-label
<button onClick={handleClose} aria-label="Close dialog">
  <XIcon aria-hidden="true" />
</button>
```

**Affected Components:**
- `Navigation.tsx` - Close button (line 78)
- `Modal.tsx` - Close buttons (lines 23, 45)
- `SearchBar.tsx` - Search button (line 56)

---

## Manual Review Required

### Color Contrast

**Status:** Automated checks passed, but verify these manually:

- [ ] Button hover states remain above 4.5:1 contrast
- [ ] Disabled form inputs meet 3:1 contrast
- [ ] Error messages use sufficient contrast
- [ ] Focus indicators visible on all backgrounds

**How to Test:** Use contrast checker on all UI states
**Tool:** Browser DevTools or WebAIM Contrast Checker

---

## Quick Wins (< 4 hours total)

1. **Add `<html lang="en">`** (5 min)
   - File: `index.html`
   - Impact: Helps screen readers choose correct voice

2. **Add alt text to images** (1 hour)
   - 12 images across 4 files
   - High impact for screen reader users

3. **Add aria-label to icon buttons** (30 min)
   - 5 buttons in 3 components
   - Critical for button identification

4. **Implement skip link** (1 hour)
   - Add to main layout component
   - Required by WCAG 2.4.1

**Total quick wins:** ~2.5 hours, fixes 4 WCAG Level A violations

---

## Next Steps

1. **Immediate:** Fix all P0 Critical issues (estimated 4 hours)
2. **This Sprint:** Fix P1 High priority issues (estimated 6 hours)
3. **Process:** Add Lighthouse to CI/CD pipeline
4. **Follow-up:** Run axe DevTools for more detailed analysis
5. **Testing:** Manual keyboard and screen reader testing

**Target Score:** 95+ (excellent accessibility)  
**Estimated Effort:** 12-16 hours total

---

## Resources

- [Lighthouse Accessibility Docs](https://web.dev/lighthouse-accessibility/)
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [axe DevTools Browser Extension](https://www.deque.com/axe/devtools/)
```

---

## Quality Checklist

Before finalizing the report:

- [ ] All failed audits listed with clear fixes
- [ ] WCAG criteria mapped for each issue
- [ ] Code examples show before/after
- [ ] File paths and line numbers included
- [ ] Priority assigned based on WCAG level
- [ ] Effort estimates provided
- [ ] Manual review items clearly marked
- [ ] Quick wins identified and time-boxed
- [ ] Links to documentation included
- [ ] Actionable next steps provided

---

## Usage Examples

**After running Lighthouse in Chrome DevTools:**
1. Click "View Trace" → Export report as JSON
2. Paste JSON into chat
3. Use `/lighthouse-report` prompt

**From CLI:**
```bash
# Generate JSON report
lighthouse https://your-site.com --output=json --output-path=report.json

# Generate both JSON and HTML
lighthouse https://your-site.com --output=json --output=html
```

**In CI/CD:**
```yaml
# GitHub Actions example
- name: Run Lighthouse
  uses: treosh/lighthouse-ci-action@v9
  with:
    urls: |
      https://your-site.com
    uploadArtifacts: true
```

---

**Remember:** Lighthouse automated tests catch ~40-60% of accessibility issues. Always follow up with:
- Manual keyboard testing
- Screen reader testing
- Real user testing with people who use assistive technologies
- axe DevTools for deeper analysis
