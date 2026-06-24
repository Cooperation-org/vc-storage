# @cooperation/vc-storage ChangeLog

## 1.0.48-1.0.49 - 2026-06-24

### Changed (SkillClaimCredential data model cleanup)

- **BREAKING:** `generateUnsignedSkillClaim` and `CredentialEngine.signSkillClaimVC`
  now take a typed `SkillClaimFormDataI` instead of an effectively-`any` payload.
- Removed `narrative` from emitted skill entries (it duplicated `description`).
- LLM-extracted skills are now grouped in `credentialSubject.inferredSkill`
  (with `source`, `model`, and `frameworkMatch` provenance) instead of being
  mixed into `credentialSubject.skill` with the user-entered skills; the
  user-entered `skill` entries no longer carry `frameworkMatch`.
- Defined the `SkillClaimFormDataI` type (previously referenced in JSDoc and
  scripts but never declared), and added `SkillItem`, `InferredSkillItem`, and
  `FrameworkMatchItem` types. `signSkillClaimVC` now uses `SkillClaimFormDataI`
  instead of the mismatched `ISkillClaimCredential`.
- Fixed `SkillEndorsed.frameworkMatch[].socCode` type: `string` to `string[]`
  (the pipeline emits multiple SOC code matches per skill).
- Bumped `hr-context` to `^0.2.0`, which defines the `inferredSkill`, `model`,
  `source`, `frameworkMatch`, and `socCode` (`@container: @set`) terms, and
  consumes its `https://w3id.org/hr/v1` context directly (no local patching).
