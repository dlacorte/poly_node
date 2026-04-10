# PolyNode Layout Redesign — Design Spec

**Date:** 2026-04-10  
**Status:** Approved

---

## Overview

Redesign the PolyNode app layout to fix two issues: content stuck to the left edge, and the step grid competing visually with lane controls. Solution: center everything with a max-width container (Option A) and move lane controls below the step grid in a horizontal row (Option B).

---

## Changes

### 1. Centered Max-Width Container (`App.tsx`)

Wrap the TopBar and lane list in a `max-w-[960px] mx-auto` container. The outer `min-h-screen bg-[#0d0d0d] p-6` stays as-is. This is a one-line structural change.

```tsx
<div className="min-h-screen bg-[#0d0d0d] text-white p-6">
  <div className="max-w-[960px] mx-auto">
    <TopBar />
    <div className="mt-6 flex flex-col gap-3">
      {lanes.map(lane => <LaneRow key={lane.id} lane={lane} />)}
    </div>
  </div>
  <PresetModal />
</div>
```

### 2. LaneRow — Two-Row Layout (`LaneRow.tsx`)

Replace the current `grid grid-cols-[52px_1fr_160px]` with a flex column layout:

- **Row 1:** `flex items-center gap-2` — lane label area (48px fixed) + StepGrid (`flex-1`)
- **Row 2:** `flex items-center gap-5` with `padding-left` matching the label width — LaneControls in horizontal mode

The lane label area (name, S/M buttons, step count) stays on the left of row 1, unchanged in content.

### 3. LaneControls — Horizontal Layout (`LaneControls.tsx`)

Replace the current `grid grid-cols-2 gap-x-2 gap-y-1` with `flex items-center gap-5`. All 5 controls (Steps, Div, Offset, Vol, Pitch) appear in a single horizontal row:

- **Steps, Offset, Vol, Pitch** — `flex flex-col gap-0.5` with label + range slider, `flex-1` so they share available space equally
- **Div** — `flex flex-col gap-0.5` with label + select, fixed width (no flex-1, the select has natural width)

A thin separator line (`border-top border-neutral-800 pt-2 mt-1`) visually separates row 2 from the grid above it.

---

## Files Changed

| File | Change |
|------|--------|
| `src/App.tsx` | Add `max-w-[960px] mx-auto` wrapper div |
| `src/components/LaneRow.tsx` | Switch from 3-col grid to 2-row flex layout |
| `src/components/LaneControls.tsx` | Switch from 2-col grid to single horizontal flex row |

No store changes, no type changes, no new files.

---

## Success Criteria

- App content is horizontally centered on wide screens
- Step grid fills the full available width in each lane row
- All 5 lane controls are visible below the grid in a single row
- No layout shifts on screens narrower than 960px (content fills width naturally)
- Existing tests still pass (layout is CSS-only, no logic changes)
