"use client";

import { useMemo, useRef, useState, type ChangeEvent, type DragEvent, type FormEvent, type KeyboardEvent } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, ImagePlus, NotebookPen, Pencil, Plus, Search, Trash2, Users } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { Avatar, Btn, Card, PageHeader, Pill, X } from "@/shared/ui";
import { POD_PEOPLE, PODS, type Pod, type PodImage } from "../data";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const toISO = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const formatDate = (iso: string) => {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-").map(Number);
  return `${String(d).padStart(2, "0")} ${MONTHS[m - 1]} ${y}`;
};

const readAsDataURL = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

const fieldClassName =
  "w-full rounded-[10px] border border-border bg-paper px-3 text-[13px] text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15";

const labelClassName = "mb-1.5 block text-[10px] font-bold uppercase tracking-[1px] text-ink-3";

type Draft = Omit<Pod, "id">;

const emptyDraft = (): Draft => ({ title: "", date: toISO(new Date()), attendees: [], notes: "", images: [] });

export const MinutesOfMeeting = () => {
  const [pods, setPods] = useState(PODS);
  const [selectedId, setSelectedId] = useState<number | null>(PODS[0]?.id ?? null);
  const [query, setQuery] = useState("");
  /** "new" while composing a pod, a pod id while editing one, null while reading. */
  const [editing, setEditing] = useState<"new" | number | null>(null);
  const [lightbox, setLightbox] = useState<{ images: PodImage[]; index: number } | null>(null);

  const sorted = useMemo(() => [...pods].sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id), [pods]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sorted;
    return sorted.filter(pod =>
      [pod.title, pod.notes, formatDate(pod.date), ...pod.attendees].some(v => v.toLowerCase().includes(q)),
    );
  }, [sorted, query]);

  const selected = pods.find(pod => pod.id === selectedId) ?? null;
  const thisMonth = toISO(new Date()).slice(0, 7);
  const monthCount = pods.filter(pod => pod.date.startsWith(thisMonth)).length;

  const save = (draft: Draft) => {
    if (editing === "new") {
      const id = Math.max(0, ...pods.map(pod => pod.id)) + 1;
      setPods(current => [{ id, ...draft }, ...current]);
      setSelectedId(id);
    } else if (editing !== null) {
      setPods(current => current.map(pod => (pod.id === editing ? { ...pod, ...draft } : pod)));
    }
    setEditing(null);
  };

  const remove = (id: number) => {
    if (!window.confirm("Delete this pod? This can't be undone.")) return;
    const next = sorted.filter(pod => pod.id !== id);
    setPods(current => current.filter(pod => pod.id !== id));
    setSelectedId(next[0]?.id ?? null);
  };

  return (
    <div>
      <PageHeader
        title="Minutes of Meeting"
        sub={`${pods.length} pods · ${monthCount} this month`}
        action={<Btn variant="primary" icon={Plus} onClick={() => setEditing("new")}>New Pod</Btn>}
      />

      <div className="grid items-start gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
        {/* Pod list */}
        <Card padding={0} className="overflow-hidden lg:sticky lg:top-0">
          <div className="border-b border-border p-3">
            <span className="relative block">
              <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-3"/>
              <input
                type="search"
                aria-label="Search pods"
                className={cn(fieldClassName, "h-10 pl-9 text-[12px]")}
                placeholder="Search titles, notes, attendees..."
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </span>
          </div>
          <div className="max-h-[calc(100vh-260px)] overflow-y-auto">
            {filtered.map(pod => {
              const on = pod.id === selectedId && editing !== "new";
              return (
                <button
                  key={pod.id}
                  type="button"
                  onClick={() => { setSelectedId(pod.id); setEditing(null); }}
                  className={cn(
                    "block w-full border-0 border-b border-border px-4 py-3.5 text-left transition-colors last:border-b-0",
                    on ? "bg-accent-mist" : "bg-transparent hover:bg-accent-mist/50",
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className={cn("text-[13px] font-bold leading-snug", on ? "text-accent-deep" : "text-ink")}>{pod.title}</span>
                    <span className="shrink-0 pt-0.5 text-[10.5px] font-semibold text-ink-3">{formatDate(pod.date)}</span>
                  </div>
                  <p className="m-0 mt-1 line-clamp-2 text-[11.5px] leading-[1.45] text-ink-3">{pod.notes || "No notes yet."}</p>
                  <div className="mt-2 flex items-center gap-3 text-[10.5px] font-semibold text-ink-3">
                    <span className="inline-flex items-center gap-1"><Users size={12}/>{pod.attendees.length}</span>
                    {pod.images.length > 0 && <span className="inline-flex items-center gap-1"><ImagePlus size={12}/>{pod.images.length}</span>}
                  </div>
                </button>
              );
            })}
            {filtered.length === 0 && (
              <div className="px-4 py-10 text-center text-[12px] text-ink-3">
                {pods.length ? "No pods match your search." : "No pods yet — start one with New Pod."}
              </div>
            )}
          </div>
        </Card>

        {/* Reader / editor */}
        {editing !== null ? (
          <PodEditor
            key={editing}
            initial={editing === "new" ? emptyDraft() : pods.find(pod => pod.id === editing) ?? emptyDraft()}
            isNew={editing === "new"}
            onCancel={() => setEditing(null)}
            onSave={save}
          />
        ) : selected ? (
          <PodReader
            pod={selected}
            onEdit={() => setEditing(selected.id)}
            onDelete={() => remove(selected.id)}
            onOpenImage={index => setLightbox({ images: selected.images, index })}
          />
        ) : (
          <Card className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-accent-soft text-accent-deep"><NotebookPen size={22}/></div>
            <div className="text-[15px] font-bold text-ink">No pod selected</div>
            <div className="mt-1 text-[12.5px] text-ink-3">Pick one from the list or start a new pod.</div>
          </Card>
        )}
      </div>

      {lightbox && <Lightbox {...lightbox} onClose={() => setLightbox(null)} onIndex={index => setLightbox({ ...lightbox, index })}/>}
    </div>
  );
};

const PodReader = ({ pod, onEdit, onDelete, onOpenImage }: {
  pod: Pod;
  onEdit: () => void;
  onDelete: () => void;
  onOpenImage: (index: number) => void;
}) => (
  <Card padding={0}>
    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border px-6 py-5">
      <div className="min-w-0">
        <Pill tone="primary" className="mb-2"><CalendarDays size={11}/>{formatDate(pod.date)}</Pill>
        <h2 className="m-0 text-[21px] font-extrabold leading-tight tracking-[-0.6px] text-ink">{pod.title}</h2>
      </div>
      <div className="flex gap-2">
        <Btn variant="ghost" size="sm" icon={Pencil} onClick={onEdit}>Edit</Btn>
        <Btn variant="ghost" size="sm" icon={Trash2} onClick={onDelete} className="text-err">Delete</Btn>
      </div>
    </div>

    <div className="grid gap-6 px-6 py-5">
      <section>
        <div className={labelClassName}>Attendees · {pod.attendees.length}</div>
        {pod.attendees.length ? (
          <div className="flex flex-wrap gap-2">
            {pod.attendees.map(name => (
              <span key={name} className="inline-flex items-center gap-2 rounded-full border border-border bg-canvas py-1 pl-1 pr-3 text-[12px] font-semibold text-ink-2">
                <Avatar name={name} size={22}/>{name}
              </span>
            ))}
          </div>
        ) : <div className="text-[12.5px] text-ink-3">No attendees recorded.</div>}
      </section>

      <section>
        <div className={labelClassName}>Notes</div>
        {pod.notes
          ? <div className="whitespace-pre-line text-[13.5px] leading-[1.7] text-ink-2">{pod.notes}</div>
          : <div className="text-[12.5px] text-ink-3">No notes yet.</div>}
      </section>

      {pod.images.length > 0 && (
        <section>
          <div className={labelClassName}>Pictures · {pod.images.length}</div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
            {pod.images.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={() => onOpenImage(index)}
                className="group aspect-[4/3] overflow-hidden rounded-xl border border-border bg-canvas p-0"
                aria-label={`Open ${image.name}`}
              >
                <img src={image.src} alt={image.name} className="size-full object-cover transition-transform duration-200 group-hover:scale-105"/>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  </Card>
);

const PodEditor = ({ initial, isNew, onCancel, onSave }: {
  initial: Draft;
  isNew: boolean;
  onCancel: () => void;
  onSave: (draft: Draft) => void;
}) => {
  const [draft, setDraft] = useState<Draft>(initial);
  const [attendeeInput, setAttendeeInput] = useState("");
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => setDraft(current => ({ ...current, [key]: value }));

  const addAttendee = (raw: string) => {
    const name = raw.trim();
    if (name && !draft.attendees.some(a => a.toLowerCase() === name.toLowerCase())) set("attendees", [...draft.attendees, name]);
    setAttendeeInput("");
  };

  const onAttendeeKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addAttendee(attendeeInput);
    } else if (e.key === "Backspace" && !attendeeInput && draft.attendees.length) {
      set("attendees", draft.attendees.slice(0, -1));
    }
  };

  const addFiles = async (files: FileList | File[]) => {
    const pictures = Array.from(files).filter(file => file.type.startsWith("image/"));
    if (!pictures.length) return;
    const images = await Promise.all(pictures.map(async file => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: file.name,
      src: await readAsDataURL(file),
    })));
    setDraft(current => ({ ...current, images: [...current.images, ...images] }));
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files);
    e.target.value = "";
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.title.trim()) return setError("Give this pod a title.");
    if (!draft.date) return setError("Pick the meeting date.");
    const pending = attendeeInput.trim();
    const attendees = pending && !draft.attendees.includes(pending) ? [...draft.attendees, pending] : draft.attendees;
    onSave({ ...draft, title: draft.title.trim(), notes: draft.notes.trim(), attendees });
  };

  const suggestions = POD_PEOPLE.filter(name =>
    !draft.attendees.includes(name) && name.toLowerCase().includes(attendeeInput.trim().toLowerCase()),
  );

  return (
    <Card padding={0}>
      <form onSubmit={submit}>
        <div className="flex items-center justify-between gap-3 border-b border-border px-6 py-4">
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-[1.4px] text-accent">{isNew ? "New pod" : "Editing pod"}</div>
            <div className="text-[15px] font-bold text-ink">{isNew ? "Capture the minutes" : initial.title}</div>
          </div>
          <div className="flex gap-2">
            <Btn variant="ghost" size="sm" onClick={onCancel}>Cancel</Btn>
            <Btn variant="primary" size="sm" type="submit">{isNew ? "Save Pod" : "Save Changes"}</Btn>
          </div>
        </div>

        <div className="grid gap-5 px-6 py-5">
          <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_180px]">
            <label>
              <span className={labelClassName}>Title</span>
              <input
                autoFocus
                value={draft.title}
                onChange={e => set("title", e.target.value)}
                placeholder="e.g. Banas Dairy · Site visit debrief"
                className={cn(fieldClassName, "h-10")}
              />
            </label>
            <label>
              <span className={labelClassName}>Date</span>
              <input type="date" value={draft.date} onChange={e => set("date", e.target.value)} className={cn(fieldClassName, "h-10")}/>
            </label>
          </div>

          <div>
            <span className={labelClassName}>Attendees</span>
            <div className="flex min-h-10 flex-wrap items-center gap-1.5 rounded-[10px] border border-border bg-paper px-2 py-1.5 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/15">
              {draft.attendees.map(name => (
                <span key={name} className="inline-flex items-center gap-1 rounded-full bg-accent-soft py-0.75 pl-2.5 pr-1.5 text-[11.5px] font-bold text-accent-deep">
                  {name}
                  <button
                    type="button"
                    aria-label={`Remove ${name}`}
                    onClick={() => set("attendees", draft.attendees.filter(a => a !== name))}
                    className="flex size-4 items-center justify-center rounded-full border-0 bg-transparent p-0 text-accent-deep hover:bg-white/60"
                  >
                    <X size={11}/>
                  </button>
                </span>
              ))}
              <input
                value={attendeeInput}
                onChange={e => setAttendeeInput(e.target.value)}
                onKeyDown={onAttendeeKey}
                onBlur={() => addAttendee(attendeeInput)}
                placeholder={draft.attendees.length ? "Add another…" : "Type a name and press Enter"}
                className="min-w-35 flex-1 border-0 bg-transparent px-1 py-1 text-[13px] text-ink outline-none"
              />
            </div>
            {suggestions.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {suggestions.map(name => (
                  <button
                    key={name}
                    type="button"
                    onMouseDown={e => e.preventDefault()}
                    onClick={() => addAttendee(name)}
                    className="inline-flex items-center gap-1 rounded-full border border-dashed border-border bg-paper px-2.5 py-0.75 text-[11px] font-semibold text-ink-3 hover:border-accent hover:text-accent-deep"
                  >
                    <Plus size={11}/>{name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <label>
            <span className={labelClassName}>Notes</span>
            <textarea
              value={draft.notes}
              onChange={e => set("notes", e.target.value)}
              rows={12}
              placeholder={"What was discussed, decisions taken, action items…"}
              className={cn(fieldClassName, "resize-y py-2.5 leading-[1.7]")}
            />
          </label>

          <div>
            <span className={labelClassName}>Pictures</span>
            <div
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              className={cn(
                "grid grid-cols-2 gap-3 rounded-xl border-2 border-dashed p-3 transition-colors sm:grid-cols-3 xl:grid-cols-4",
                dragging ? "border-accent bg-accent-mist" : "border-border",
              )}
            >
              {draft.images.map(image => (
                <div key={image.id} className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-canvas">
                  <img src={image.src} alt={image.name} className="size-full object-cover"/>
                  <button
                    type="button"
                    aria-label={`Remove ${image.name}`}
                    onClick={() => set("images", draft.images.filter(i => i.id !== image.id))}
                    className="absolute right-1.5 top-1.5 flex size-7 items-center justify-center rounded-lg border-0 bg-[rgba(15,23,42,0.6)] text-white opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
                  >
                    <Trash2 size={13}/>
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => fileInput.current?.click()}
                className="flex aspect-[4/3] flex-col items-center justify-center gap-1.5 rounded-lg border border-border bg-canvas text-ink-3 hover:border-accent hover:text-accent-deep"
              >
                <ImagePlus size={20}/>
                <span className="text-[11.5px] font-bold">Add pictures</span>
                <span className="text-[10px]">or drop them here</span>
              </button>
            </div>
            <input ref={fileInput} type="file" accept="image/*" multiple hidden onChange={onFileChange}/>
          </div>

          {error && <div className="text-[12px] font-semibold text-err">{error}</div>}
        </div>
      </form>
    </Card>
  );
};

const Lightbox = ({ images, index, onClose, onIndex }: {
  images: PodImage[];
  index: number;
  onClose: () => void;
  onIndex: (index: number) => void;
}) => {
  const image = images[index];
  const step = (delta: number) => onIndex((index + delta + images.length) % images.length);
  const navBtn = "absolute top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border-0 bg-white/15 text-white hover:bg-white/25";
  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-[rgba(15,23,42,0.85)] p-10"
      onClick={onClose}
      onKeyDown={e => { if (e.key === "Escape") onClose(); if (e.key === "ArrowLeft") step(-1); if (e.key === "ArrowRight") step(1); }}
      tabIndex={-1}
      ref={el => el?.focus()}
    >
      <button type="button" aria-label="Close" onClick={onClose} className="absolute right-5 top-5 flex size-9 items-center justify-center rounded-lg border-0 bg-white/15 text-white">
        <X size={18}/>
      </button>
      {images.length > 1 && (
        <>
          <button type="button" aria-label="Previous picture" onClick={e => { e.stopPropagation(); step(-1); }} className={cn(navBtn, "left-5")}><ChevronLeft size={20}/></button>
          <button type="button" aria-label="Next picture" onClick={e => { e.stopPropagation(); step(1); }} className={cn(navBtn, "right-5")}><ChevronRight size={20}/></button>
        </>
      )}
      <figure className="m-0 flex max-h-full flex-col items-center" onClick={e => e.stopPropagation()}>
        <img src={image.src} alt={image.name} className="max-h-[80vh] max-w-full rounded-xl object-contain shadow-[0_20px_60px_rgba(0,0,0,0.4)]"/>
        <figcaption className="mt-3 text-[12px] font-semibold text-white/80">{image.name} · {index + 1} / {images.length}</figcaption>
      </figure>
    </div>
  );
};
