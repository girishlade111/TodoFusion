# Content Discrepancies Ledger

| ID | Route | Observed Issue in Reference | Implementation Decision |
| --- | --- | --- | --- |
| disc-001 | `/pricing` | Monthly plan ($4.9/monthly) lists "No recurring fees" | Preserved in `src/content/pricing.ts` with `referenceNotes` warning; never presented as live billing |
| disc-002 | `/blog` | Hero subtitle says "Taskify" instead of "TodoFusion" | Corrected to "TodoFusion" in production component `BlogIndexView` |
| disc-003 | `/contact` | Community card says "flexify community" | Corrected to "TodoFusion community" in `ContactIndexView` |
| disc-004 | `/about` | Statistics card says "Endd users"; David Johnson team role says "Ceo, Fouder" | Preserved raw strings in `src/content/team.ts` (`referenceBottomLabel`, `referenceRole`) while displaying corrected labels |
| disc-005 | `/` | Schedule tasks panel displays two "Cancel" buttons | Corrected cyan action button to "Save" to reflect interactive draft saving |
| disc-006 | `/helpcenter` | Collapsed accordion answers were not embedded in SSR HTML | Implemented all 12 verified questions and 4 category filters with clearly flagged `VERIFIED_QUESTION_ESTIMATED_ANSWER` entries |
| disc-007 | `/blog/the-art-of-user-centric-design` | 8th blog article linked from Related Blogs beyond initial 43-route seed | Implemented as full static route (total 44 routes) |
