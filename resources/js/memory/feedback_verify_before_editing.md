---
name: Verify relationships before editing
description: Don't assume model relationships exist — check the model first. JSON casts are not relationships.
type: feedback
---

Do not add eager-load relationships (e.g. `with('item.prices')`) without first confirming the relationship exists on the model. `prices` on Item is a JSON cast, not a HasMany. Blindly adding dotted eager loads breaks silently or causes confusion.

**Why:** User was frustrated when `with('item.prices')` was added without checking the Item model first.

**How to apply:** Always read the model file before writing `with()` calls. If `prices` or similar is in `$casts`, it's a column — not a relationship.