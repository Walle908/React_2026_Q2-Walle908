# Performance Optimization Report

## Baseline Measurements

## A single "Commit Duration" metric is not natively supported by the React DevTools Profiler. The total duration must be calculated as the sum of the render, layout, and passive effect phases.

### Interaction A: Sort countries

- **Render duration**: 806.3 ms
- **Layouts effects**: <0.1 ms
- **Passive effects**: <0.1 ms
- **Screenshot**:
  - Flamegraph chart ![flamegraph](/src/performance-starter/screenshots/baseline/sort-countries-flame-baseline.PNG)
  - Ranked chart ![ranked](/src/performance-starter/screenshots/baseline/sort-countries-ranked-baseline.PNG)

### Interaction B: Search countries

- **Render duration**: 286 ms
- **Layouts effects**: <0.1 ms
- **Passive effects**: <0.1 ms
- **Screenshot**:
  - Flamegraph chart ![flamegraph](/src/performance-starter/screenshots/baseline/search-countries-flame-baseline.PNG)
  - Ranked chart ![ranked](/src/performance-starter/screenshots/baseline/search-countries-ranked-baseline.PNG)

### Interaction C: Change year

- **Render duration**: 860.2 ms
- **Layouts effects**: <0.1 ms
- **Passive effects**: <0.1 ms
- **Screenshot**:
  - Flamegraph chart ![flamegraph](/src/performance-starter/screenshots/baseline/change-year-flame-baseline.PNG)
  - Ranked chart ![ranked](/src/performance-starter/screenshots/baseline/change-year-ranked-baseline.PNG)

### Interaction D: Toggle column

- **Render duration**: 854.7 ms
- **Layouts effects**: <0.1 ms
- **Passive effects**: <0.1 ms
- **Screenshot**:
  - Flamegraph chart ![flamegraph](/src/performance-starter/screenshots/baseline/toggle-column-flame-baseline.PNG)
  - Ranked chart ![ranked](/src/performance-starter/screenshots/baseline/toggle-column-ranked-baseline.PNG)
