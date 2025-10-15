'use strict';

// ---------- State ----------
const canvasEl = document.getElementById('canvas');
const sizeEl = document.getElementById('size');
const speedEl = document.getElementById('speed');
const sizeLabelEl = document.getElementById('sizeLabel');
const speedLabelEl = document.getElementById('speedLabel');
const algorithmEl = document.getElementById('algorithm');
const generateBtn = document.getElementById('generate');
const shuffleBtn = document.getElementById('shuffle');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const comparisonCountEl = document.getElementById('comparisonCount');
const swapCountEl = document.getElementById('swapCount');
const timeElapsedEl = document.getElementById('timeElapsed');
const themeToggleEl = document.getElementById('themeToggle');
const themeIconEl = document.getElementById('themeIcon');
const currentAlgorithmEl = document.getElementById('currentAlgorithm');
const timeBestEl = document.getElementById('timeBest');
const timeAvgEl = document.getElementById('timeAvg');
const timeWorstEl = document.getElementById('timeWorst');
const spaceBestEl = document.getElementById('spaceBest');
const spaceAvgEl = document.getElementById('spaceAvg');
const spaceWorstEl = document.getElementById('spaceWorst');

let values = [];
let running = false;
let abortController = null;
let comparisonCount = 0;
let swapCount = 0;
let startTime = 0;
let currentTheme = 'dark';

// ---------- Utilities ----------
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(ms, signal) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    if (signal) {
      signal.addEventListener('abort', () => {
        clearTimeout(timer);
        reject(new DOMException('Aborted', 'AbortError'));
      }, { once: true });
    }
  });
}

function updateGridTemplate(size) {
  canvasEl.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
}

function renderBars(arr, highlights) {
  // highlights: { compare: Set(idx), active: Set(idx), sorted: Set(idx) }
  canvasEl.innerHTML = '';
  const max = Math.max(...arr, 1);
  for (let i = 0; i < arr.length; i++) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    const heightPct = (arr[i] / max) * 100;
    bar.style.height = `${heightPct}%`;
    if (highlights) {
      if (highlights.compare && highlights.compare.has(i)) bar.classList.add('compare');
      if (highlights.active && highlights.active.has(i)) bar.classList.add('active');
      if (highlights.sorted && highlights.sorted.has(i)) bar.classList.add('sorted');
    }
    canvasEl.appendChild(bar);
  }
}

function setLabels() {
  sizeLabelEl.textContent = sizeEl.value;
  const v = Number(speedEl.value);
  // Map 1..100 to delay ms 4..120 (inverse)
  const delay = Math.round(4 + (100 - v) * 1.16);
  speedLabelEl.textContent = `${v}%`;
  return delay;
}

function generateArray(size) {
  const arr = new Array(size);
  for (let i = 0; i < size; i++) arr[i] = randomInt(2, 1000);
  return arr;
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function disableControls(disabled) {
  algorithmEl.disabled = disabled;
  sizeEl.disabled = disabled;
  speedEl.disabled = disabled;
  generateBtn.disabled = disabled;
  shuffleBtn.disabled = disabled;
  startBtn.disabled = disabled;
  stopBtn.disabled = !disabled;
}

function resetCounters() {
  comparisonCount = 0;
  swapCount = 0;
  comparisonCountEl.textContent = '0';
  swapCountEl.textContent = '0';
  timeElapsedEl.textContent = '0ms';
}

function updateCounters() {
  comparisonCountEl.textContent = comparisonCount.toLocaleString();
  swapCountEl.textContent = swapCount.toLocaleString();
  
  if (startTime > 0) {
    const elapsed = Date.now() - startTime;
    timeElapsedEl.textContent = `${elapsed}ms`;
  }
}

function incrementComparisons() {
  comparisonCount++;
  updateCounters();
}

function incrementSwaps() {
  swapCount++;
  updateCounters();
}

// ---------- Theme Management ----------

function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  localStorage.setItem('theme', currentTheme);
  
  // Update icon
  if (currentTheme === 'light') {
    themeIconEl.innerHTML = `
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    `;
  } else {
    themeIconEl.innerHTML = `
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    `;
  }
}

function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    currentTheme = savedTheme;
    document.documentElement.setAttribute('data-theme', currentTheme);
  }
  
  // Set initial icon
  if (currentTheme === 'light') {
    themeIconEl.innerHTML = `
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    `;
  }
}

// ---------- Complexity Data ----------

const complexityData = {
  bubble: {
    name: 'Bubble Sort',
    time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    space: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' }
  },
  insertion: {
    name: 'Insertion Sort',
    time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    space: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' }
  },
  selection: {
    name: 'Selection Sort',
    time: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
    space: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' }
  },
  merge: {
    name: 'Merge Sort',
    time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    space: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' }
  },
  quick: {
    name: 'Quick Sort',
    time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
    space: { best: 'O(log n)', average: 'O(log n)', worst: 'O(n)' }
  }
};

function updateComplexityDisplay(algorithm) {
  const data = complexityData[algorithm];
  if (!data) return;
  
  currentAlgorithmEl.textContent = data.name;
  timeBestEl.textContent = data.time.best;
  timeAvgEl.textContent = data.time.average;
  timeWorstEl.textContent = data.time.worst;
  spaceBestEl.textContent = data.space.best;
  spaceAvgEl.textContent = data.space.average;
  spaceWorstEl.textContent = data.space.worst;
}

// ---------- Event-driven visualization contract ----------
// Each algorithm receives: array (copy), emit(step), delay(), signal
// emit({ type, indices: [i,j,...], arraySnapshot?, sortedIndices? })

function makeEmitter(arrayRef) {
  return function emit(evt) {
    const highlights = { compare: new Set(), active: new Set(), sorted: new Set() };
    
    // Update counters based on event type
    if (evt.type === 'compare') {
      incrementComparisons();
      for (const idx of evt.indices) highlights.compare.add(idx);
    } else if (evt.type === 'swap') {
      incrementSwaps();
      for (const idx of evt.indices) highlights.active.add(idx);
    } else if (evt.type === 'overwrite' || evt.type === 'pivot') {
      for (const idx of evt.indices) highlights.active.add(idx);
    } else if (evt.type === 'sorted') {
      for (const idx of evt.indices) highlights.sorted.add(idx);
    }
    
    const snapshot = evt.arraySnapshot || arrayRef;
    renderBars(snapshot, highlights);
  };
}

function delayFnFromSpeed() {
  const baseDelay = setLabels();
  return (signal) => sleep(baseDelay, signal);
}

// ---------- Algorithms (handwritten) ----------

async function bubbleSort(arr, emit, delay, signal) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      emit({ type: 'compare', indices: [j, j + 1] });
      await delay(signal);
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
        emit({ type: 'swap', indices: [j, j + 1], arraySnapshot: arr.slice() });
        await delay(signal);
      }
    }
    emit({ type: 'sorted', indices: [n - i - 1], arraySnapshot: arr.slice() });
    await delay(signal);
    if (!swapped) break;
  }
  // Mark all sorted at end
  emit({ type: 'sorted', indices: Array.from({ length: n }, (_, i) => i), arraySnapshot: arr.slice() });
}

async function insertionSort(arr, emit, delay, signal) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      emit({ type: 'compare', indices: [j, j + 1] });
      await delay(signal);
      arr[j + 1] = arr[j];
      emit({ type: 'overwrite', indices: [j + 1], arraySnapshot: arr.slice() });
      await delay(signal);
      j--;
    }
    arr[j + 1] = key;
    emit({ type: 'overwrite', indices: [j + 1], arraySnapshot: arr.slice() });
    await delay(signal);
  }
  emit({ type: 'sorted', indices: Array.from({ length: arr.length }, (_, i) => i), arraySnapshot: arr.slice() });
}

async function selectionSort(arr, emit, delay, signal) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      emit({ type: 'compare', indices: [minIdx, j] });
      await delay(signal);
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      emit({ type: 'swap', indices: [i, minIdx], arraySnapshot: arr.slice() });
      await delay(signal);
    }
    emit({ type: 'sorted', indices: [i], arraySnapshot: arr.slice() });
    await delay(signal);
  }
  emit({ type: 'sorted', indices: [n - 1], arraySnapshot: arr.slice() });
  await delay(signal);
  emit({ type: 'sorted', indices: Array.from({ length: n }, (_, i) => i), arraySnapshot: arr.slice() });
}

async function mergeSort(arr, emit, delay, signal) {
  async function merge(lo, mid, hi) {
    const left = arr.slice(lo, mid + 1);
    const right = arr.slice(mid + 1, hi + 1);
    let i = 0, j = 0, k = lo;
    while (i < left.length && j < right.length) {
      emit({ type: 'compare', indices: [lo + i, mid + 1 + j] });
      await delay(signal);
      if (left[i] <= right[j]) {
        arr[k] = left[i++];
      } else {
        arr[k] = right[j++];
      }
      emit({ type: 'overwrite', indices: [k], arraySnapshot: arr.slice() });
      await delay(signal);
      k++;
    }
    while (i < left.length) {
      arr[k] = left[i++];
      emit({ type: 'overwrite', indices: [k], arraySnapshot: arr.slice() });
      await delay(signal);
      k++;
    }
    while (j < right.length) {
      arr[k] = right[j++];
      emit({ type: 'overwrite', indices: [k], arraySnapshot: arr.slice() });
      await delay(signal);
      k++;
    }
  }
  async function sort(lo, hi) {
    if (lo >= hi) return;
    const mid = Math.floor((lo + hi) / 2);
    await sort(lo, mid);
    await sort(mid + 1, hi);
    await merge(lo, mid, hi);
  }
  await sort(0, arr.length - 1);
  emit({ type: 'sorted', indices: Array.from({ length: arr.length }, (_, i) => i), arraySnapshot: arr.slice() });
}

async function quickSort(arr, emit, delay, signal) {
  async function partition(lo, hi) {
    const pivot = arr[hi];
    let i = lo;
    emit({ type: 'pivot', indices: [hi], arraySnapshot: arr.slice() });
    await delay(signal);
    for (let j = lo; j < hi; j++) {
      emit({ type: 'compare', indices: [j, hi] });
      await delay(signal);
      if (arr[j] <= pivot) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        emit({ type: 'swap', indices: [i, j], arraySnapshot: arr.slice() });
        await delay(signal);
        i++;
      }
    }
    [arr[i], arr[hi]] = [arr[hi], arr[i]];
    emit({ type: 'swap', indices: [i, hi], arraySnapshot: arr.slice() });
    await delay(signal);
    return i;
  }
  async function sort(lo, hi) {
    if (lo >= hi) return;
    const p = await partition(lo, hi);
    await sort(lo, p - 1);
    await sort(p + 1, hi);
  }
  await sort(0, arr.length - 1);
  emit({ type: 'sorted', indices: Array.from({ length: arr.length }, (_, i) => i), arraySnapshot: arr.slice() });
}

// ---------- Wiring ----------

function resetArray() {
  const size = Number(sizeEl.value);
  values = generateArray(size);
  updateGridTemplate(size);
  renderBars(values, null);
  resetCounters();
}

function reshuffle() {
  shuffleArray(values);
  renderBars(values, null);
  resetCounters();
}

async function run() {
  if (running) return;
  running = true;
  disableControls(true);
  abortController = new AbortController();
  const signal = abortController.signal;
  const arr = values.slice();
  const emit = makeEmitter(arr);
  const delay = delayFnFromSpeed();
  
  // Reset counters and start timing
  resetCounters();
  startTime = Date.now();
  
  // Update time display during execution
  const timeInterval = setInterval(() => {
    if (startTime > 0) {
      const elapsed = Date.now() - startTime;
      timeElapsedEl.textContent = `${elapsed}ms`;
    }
  }, 50);

  const algo = algorithmEl.value;
  try {
    if (algo === 'bubble') await bubbleSort(arr, emit, delay, signal);
    else if (algo === 'insertion') await insertionSort(arr, emit, delay, signal);
    else if (algo === 'selection') await selectionSort(arr, emit, delay, signal);
    else if (algo === 'merge') await mergeSort(arr, emit, delay, signal);
    else if (algo === 'quick') await quickSort(arr, emit, delay, signal);
  } catch (e) {
    // Swallow abort errors, rethrow others
    if (!(e instanceof DOMException && e.name === 'AbortError')) {
      console.error(e);
    }
  } finally {
    clearInterval(timeInterval);
    running = false;
    disableControls(false);
    startTime = 0;
  }
}

function stop() {
  if (abortController) abortController.abort();
}

// Events
sizeEl.addEventListener('input', () => {
  setLabels();
  resetArray();
});
speedEl.addEventListener('input', () => {
  setLabels();
});
algorithmEl.addEventListener('change', (e) => {
  updateComplexityDisplay(e.target.value);
});
generateBtn.addEventListener('click', resetArray);
shuffleBtn.addEventListener('click', reshuffle);
startBtn.addEventListener('click', run);
stopBtn.addEventListener('click', stop);
themeToggleEl.addEventListener('click', toggleTheme);

// Init
loadTheme();
setLabels();
resetArray();
updateComplexityDisplay(algorithmEl.value);


