---
description: 'Generate WCAG 2.2 compliance reports in standardized format for accessibility audits, documenting violations, severity, remediation steps, and compliance percentage.'
agent: 'agent'
---

**Prompt: Generate WCAG 2.2 Compliance Report**

Your task is to generate a comprehensive WCAG 2.2 Level AA compliance report based on an accessibility audit. The report should follow standard accessibility reporting formats and be useful for developers, QA teams, and compliance officers.

---

## Report Objectives

- Provide clear documentation of WCAG 2.2 Level AA compliance status
- Map each violation to specific success criteria
- Prioritize issues by severity and impact on users
- Provide actionable remediation steps for developers
- Track progress toward compliance goals
- Serve as evidence for legal/regulatory requirements

---

## Report Structure

Your report must include the following sections in order:

### 1. Executive Summary

**Compliance Overview**
- Overall compliance percentage (e.g., "78% compliant with WCAG 2.2 Level AA")
- Total issues found by severity (Critical, Major, Minor)
- Date of audit
- Scope of audit (pages/components reviewed)
- Auditor/team name
- Methodology (automated tools + manual testing)

**Key Findings**
- Top 3-5 most impactful issues
- Pages/components with most violations
- Estimated effort to reach compliance
- Recommended priority areas

### 2. Testing Methodology

Document how the audit was performed:

**Tools Used**
- Automated: axe DevTools, WAVE, Lighthouse
- Manual: Keyboard testing, screen reader testing (NVDA/JAWS/VoiceOver)
- Browser: Chrome, Firefox, Safari
- Assistive Technologies: Specific versions of screen readers

**Scope**
- URL/pages audited
- Components tested
- User flows evaluated
- Test date range

**Standards**
- WCAG 2.2 Level AA
- Additional standards if applicable (Section 508, EN 301 549)

### 3. Compliance Summary by Principle

Organize by WCAG's four principles (POUR):

#### Perceivable
- Success criteria evaluated
- Pass/Fail counts
- Key violations

#### Operable
- Success criteria evaluated
- Pass/Fail counts
- Key violations

#### Understandable
- Success criteria evaluated
- Pass/Fail counts
- Key violations

#### Robust
- Success criteria evaluated
- Pass/Fail counts
- Key violations

### 4. Detailed Findings

For each violation, provide:

**Issue ID:** VULN-001
**Success Criterion:** 1.1.1 Non-text Content (Level A)
**Severity:** Critical | Major | Minor
**Impact:** [How this affects users with disabilities]
**Location:** [Specific page/component/file and line number]
**Current State:** [Screenshot or code snippet showing the issue]
**Failure Description:** [What is wrong]
**User Impact:** [Which users are affected and how]
**Remediation Steps:**
1. [Specific action 1]
2. [Specific action 2]
3. [Code example if applicable]

**Expected Result:** [What it should look like after fixing]
**Priority:** P0 (Blocker) | P1 (High) | P2 (Medium) | P3 (Low)
**Estimated Effort:** [Hours or story points]
**Related Issues:** [Links to similar issues]

### 5. Compliance Checklist

Matrix of all WCAG 2.2 Level A and AA success criteria:

| ID | Success Criterion | Level | Status | Notes |
|----|-------------------|-------|--------|-------|
| 1.1.1 | Non-text Content | A | ❌ Fail | 12 images missing alt text |
| 1.3.1 | Info and Relationships | A | ✅ Pass | Semantic HTML used correctly |
| 1.4.3 | Contrast (Minimum) | AA | ⚠️ Partial | 3 components below 4.5:1 |
| ... | ... | ... | ... | ... |

Status Legend:
- ✅ Pass - Fully compliant
- ❌ Fail - Not compliant
- ⚠️ Partial - Some instances comply, others don't
- ⏭️ N/A - Not applicable to this project

### 6. Priority Action Items

Organized by priority:

**P0: Critical (Must Fix Before Launch)**
1. [Issue VULN-001]: Missing keyboard access on navigation - SC 2.1.1
2. [Issue VULN-005]: Form labels not associated - SC 3.3.2

**P1: High (Fix in Next Sprint)**
1. [Issue VULN-003]: Poor color contrast on CTAs - SC 1.4.3
2. [Issue VULN-007]: Missing ARIA labels on icon buttons - SC 4.1.2

**P2: Medium (Fix Soon)**
1. [Issue VULN-010]: Heading hierarchy skips levels - SC 2.4.6

**P3: Low (Backlog)**
1. [Issue VULN-015]: Link text could be more descriptive - SC 2.4.4

### 7. Recommendations

**Quick Wins** (< 4 hours each)
- [List easy fixes that improve compliance significantly]

**Process Improvements**
- Integrate axe DevTools in CI/CD pipeline
- Add accessibility checklist to PR template
- Schedule quarterly accessibility audits
- Train team on WCAG guidelines

**Component Library**
- Create accessible modal component
- Document ARIA patterns for custom controls
- Build form validation pattern

**Documentation**
- Add accessibility section to README
- Document keyboard shortcuts
- Create screen reader testing guide

### 8. Remediation Roadmap

**Sprint 1 (Weeks 1-2):** P0 Critical Issues
- Est. effort: 40 hours
- Target: Fix all keyboard and form accessibility issues

**Sprint 2 (Weeks 3-4):** P1 High Priority
- Est. effort: 32 hours
- Target: Fix color contrast and ARIA labeling

**Sprint 3 (Weeks 5-6):** P2 Medium Priority
- Est. effort: 20 hours
- Target: Fix semantic HTML and heading structure

**Ongoing (Backlog):** P3 Low Priority
- Est. effort: 16 hours
- Target: Improve link text and minor enhancements

**Target Compliance Date:** [Specific date]
**Estimated Total Effort:** [Total hours]

### 9. Appendices

**Appendix A: WCAG 2.2 Success Criteria Reference**
- Link to official WCAG 2.2 documentation
- Quick reference table of all criteria

**Appendix B: Testing Artifacts**
- Screenshots of violations
- Screen reader recordings
- Lighthouse/axe reports (attach files)

**Appendix C: Code Samples**
- Before/after examples for common fixes
- Reusable accessible component patterns

**Appendix D: Resources**
- WCAG 2.2 Understanding docs
- ARIA Authoring Practices Guide
- Accessibility testing tools list
- Community resources and forums

---

## Formatting Guidelines

**Use Standard Severity Levels:**
- **Critical:** Prevents users from completing core tasks (blocker)
- **Major:** Significantly impacts usability for users with disabilities
- **Minor:** Inconvenience but workaround exists
- **Enhancement:** Improvement beyond minimum compliance

**Use Clear Language:**
- Avoid jargon when explaining user impact
- Provide specific, actionable remediation steps
- Include code examples where helpful
- Link to relevant WCAG documentation

**Include Visual Aids:**
- Screenshots highlighting issues
- Annotated images showing proper alternatives
- Before/after comparisons
- Accessibility tree views

**Quantify Everything:**
- Number of violations per criterion
- Percentage compliance
- Estimated effort in hours
- Priority rankings

---

## Data Collection Instructions

Before generating the report, gather:

1. **Automated Scan Results**
   - Run axe DevTools on all pages
   - Run Lighthouse accessibility audit
   - Use WAVE browser extension
   - Document all violations found

2. **Manual Testing Results**
   - Keyboard only navigation (Tab, Enter, Escape, Arrows)
   - Screen reader testing (NVDA/JAWS/VoiceOver)
   - Focus indicator visibility
   - Form error handling
   - Color contrast measurements

3. **Code Review**
   - Semantic HTML structure
   - ARIA attribute correctness
   - Focus management patterns
   - Error handling implementation

4. **Codebase Context**
   - File paths for violations
   - Component names
   - Recent changes affecting accessibility
   - Existing accessibility components

---

## Output Format

Generate the report in **Markdown format** with:
- Clear hierarchical headings (H1 → H2 → H3)
- Tables for structured data
- Code blocks for violations and fixes
- Emoji indicators (✅ ❌ ⚠️) for visual scanning
- Links to relevant WCAG documentation

The report should be:
- Printable (PDF-friendly formatting)
- Version-controllable (plain text/Markdown)
- Parseable (structured format for tracking tools)
- Professional (suitable for stakeholder presentation)

---

## Example Finding Entry

```markdown
### VULN-012: Icon Buttons Missing Accessible Names

**Success Criterion:** 4.1.2 Name, Role, Value (Level A)  
**Severity:** Major  
**Impact:** Screen reader users cannot understand button purpose  
**Location:** `src/components/Navigation.tsx:45-52`

**Current State:**
```tsx
<button onClick={handleClose}>
  <XIcon />
</button>
```

**Failure Description:**
Icon-only button has no accessible name. Screen readers announce "button" without context about what the button does.

**User Impact:**
- Screen reader users don't know button purpose
- Voice control users cannot target button by name
- Affects ~2.3% of web users (WHO disability statistics)

**Remediation Steps:**
1. Add `aria-label` attribute to button
2. Add `aria-hidden="true"` to icon
3. Ensure button purpose is clear from label

```tsx
<button 
  onClick={handleClose}
  aria-label="Close dialog"
>
  <XIcon aria-hidden="true" />
</button>
```

**Expected Result:**
Screen reader announces "Close dialog, button" when focused.

**Priority:** P1 (High)  
**Estimated Effort:** 2 hours (15 instances across codebase)  
**Related Issues:** VULN-015, VULN-023
```

---

## Quality Checklist

Before finalizing the report, verify:

- [ ] All violations mapped to specific WCAG 2.2 criteria
- [ ] Severity levels assigned consistently
- [ ] Remediation steps are specific and actionable
- [ ] File paths and line numbers included
- [ ] User impact clearly explained
- [ ] Code examples provided where helpful
- [ ] Compliance percentage calculated accurately
- [ ] Priority levels assigned based on user impact
- [ ] Estimated effort provided for planning
- [ ] Professional tone throughout
- [ ] Screenshots/evidence attached where needed
- [ ] Links to WCAG documentation included
- [ ] Roadmap matches estimated effort totals
- [ ] Executive summary accurate and concise

---

**Remember:** This report will be used by developers, designers, product managers, and potentially legal/compliance teams. Balance technical accuracy with accessibility for non-technical readers. Focus on user impact to justify the importance of fixes.
