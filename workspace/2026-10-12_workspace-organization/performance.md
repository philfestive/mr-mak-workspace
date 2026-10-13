# Pixel reference headroom and broader support

This is a proposed measurement vocabulary, not an executed phone test or a
fixed performance budget. The [owner-answer source](../../projects/workspace-organization/design-direction.md)
records 30 FPS, mid-range Android first then iPhone, and Pixel 9 Pro XL as the
available reference device. The owner wants it to run very smoothly/easily on
that phone while supporting more devices. Exact support floor and workload remain open.

## Suggested goal wording

> Sustain 30 FPS with consistent frame pacing in a declared workload and quality
> profile on Pixel 9 Pro XL, with measured CPU/GPU processing margin. Validate
> the selected older/mid-range device profile separately before claiming support.

At 30 FPS, the nominal display interval is about 33.3 ms. A capped average of
30 FPS alone does not tell us how much processing capacity remains. Android's
profiling guidance distinguishes active CPU work from time waiting for a GPU or
presentation, and measures GPU processing separately.
[Android frame processing times](https://developer.android.com/android-performance-analyzer/analyze/frame-times).

## Measures to define

| Measure | What it helps answer |
| --- | --- |
| Presented frame intervals and missed deadlines | Does play feel consistently smooth? |
| CPU active/critical-path and GPU work, with p95/p99 tails | How expensive is the declared workload, apart from waiting/capping? |
| Sustained thermal/performance state | Does behavior remain stable after the phone warms? |
| Memory, allocations and load spikes | Does changing scenes/content cause pressure or hitches? |
| Resolution, quality and workload identity | Are repeated results comparable? |

CPU/GPU/physics timing can overlap or include waits. Record each metric's actual
definition; do not add incompatible timings or turn a wall-frame interval into
GPU cost. Thermal and CPU behavior can change during sustained play.
[Android thermal/CPU guidance](https://developer.android.com/games/optimize/adpf).

## The headroom choice is still open

The owner chose to define the representative workload first, then choose the
margin. Earlier numeric suggestions were not selected. We need the workload,
resolution, measurement definition and sustained device result before setting
processing thresholds. A measured Pixel margin remains a proxy and does not
promise that a phone with a particular nominal capability will work.

Use “reference-device processing headroom” for the Pixel proxy. Keep “older-device
support verified” as a separate claim with its own named model/run. That wording
preserves the intent without replacing the mid-range goal with the handy device.
The [Human/cartoon profile](../../projects/workspace-organization/styles/human-cartoon.md)
will define visual priorities; the workload and scalability choices follow.

No phone connection, SDK install, build/export, runtime launch or benchmark has
been performed in this research phase. Measurement and tier thresholds remain
questions for the owner and the eventual runtime owner.
