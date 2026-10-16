"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent, RefObject } from "react";

/* Find-in-page: highlights every match of `query` inside a root element and scrolls the
   current one into view. Highlights use the CSS Custom Highlight API, so React's DOM is
   never touched (styles: ::highlight(find-match) / ::highlight(find-current) in brand.css). */

const SKIP = new Set(["INPUT", "TEXTAREA", "SELECT", "OPTION", "SCRIPT", "STYLE", "NOSCRIPT"]);

const findRanges = (root: HTMLElement, query: string): Range[] => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const el = node.parentElement;
      if (!el || SKIP.has(el.tagName) || el.closest("[data-find-ignore]")) return NodeFilter.FILTER_REJECT;
      if (!el.getClientRects().length) return NodeFilter.FILTER_REJECT; // hidden
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const ranges: Range[] = [];
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const text = (node.nodeValue ?? "").toLowerCase();
    for (let i = text.indexOf(q); i !== -1; i = text.indexOf(q, i + q.length)) {
      const r = document.createRange();
      r.setStart(node, i);
      r.setEnd(node, i + q.length);
      ranges.push(r);
    }
  }
  return ranges;
};

/* Several finders can be live at once (top bar + page search), so highlights are merged. */
const registry = new Map<string, { all: Range[]; current?: Range }>();

const paint = () => {
  if (typeof CSS === "undefined" || !("highlights" in CSS)) return;
  const all: Range[] = [];
  const current: Range[] = [];
  registry.forEach(v => { all.push(...v.all); if (v.current) current.push(v.current); });
  CSS.highlights.set("find-match", new Highlight(...all));
  CSS.highlights.set("find-current", new Highlight(...current));
};

/** Centres the range in every scrollable ancestor (scrollIntoView would also move overflow-hidden layouts). */
const scrollToRange = (range: Range) => {
  for (let p = range.startContainer.parentElement?.parentElement; p; p = p.parentElement) {
    const { overflowY } = getComputedStyle(p);
    if (!/(auto|scroll)/.test(overflowY) || p.scrollHeight <= p.clientHeight) continue;
    const rect = range.getBoundingClientRect();
    const box = p.getBoundingClientRect();
    p.scrollBy({ top: rect.top - box.top - p.clientHeight / 2, behavior: "smooth" });
  }
};

type Root = RefObject<HTMLElement | null> | (() => HTMLElement | null);

/**
 * Highlights matches of `query` inside `root` and scrolls to the first one.
 * Pass `deps` that change the rendered content (e.g. a filtered list) so matches are refreshed.
 */
export const useFindInPage = (root: Root, query: string, deps: unknown[] = []) => {
  const id = useId();
  const rootRef = useRef(root);
  rootRef.current = root;
  const [count, setCount] = useState(0);
  const [index, setIndex] = useState(0);

  const run = (i: number) => {
    const r = rootRef.current;
    const el = typeof r === "function" ? r() : r.current;
    const ranges = el ? findRanges(el, query) : [];
    setCount(ranges.length);
    if (!ranges.length) {
      setIndex(0);
      registry.delete(id);
      paint();
      return;
    }
    const k = ((i % ranges.length) + ranges.length) % ranges.length;
    setIndex(k);
    registry.set(id, { all: ranges, current: ranges[k] });
    paint();
    scrollToRange(ranges[k]);
  };

  useEffect(() => { run(0); }, [query, ...deps]);
  useEffect(() => () => { registry.delete(id); paint(); }, [id]);

  const next = () => run(index + 1);
  const prev = () => run(index - 1);

  return {
    count,
    /** 1-based position of the current match (0 when none). */
    current: count ? index + 1 : 0,
    next,
    prev,
    /** Enter → next match, Shift+Enter → previous. */
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== "Enter") return;
      e.preventDefault();
      if (e.shiftKey) prev(); else next();
    },
  };
};
