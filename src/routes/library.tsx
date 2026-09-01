import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { PageHeader } from "@/components/dashboard/PageHeader";
import {
  CheckboxCell,
  DateRangeButton,
  TablePagination,
  TableSearch,
} from "@/components/dashboard/TableChrome";
import { RowActions } from "@/components/dashboard/RowActions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Library Books - Spik School Management" },
      {
        name: "description",
        content:
          "Browse and manage every book in the Spik school library: writers, subjects, classes and publish dates in one table.",
      },
      { property: "og:title", content: "Library Books - Spik School Management" },
      {
        property: "og:description",
        content: "Search, add and manage library books across subjects and classes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LibraryPage,
});

type Book = {
  id: number;
  name: string;
  writer: string;
  code: string;
  subject: string;
  klass: string;
  date: string;
  tint: string;
};

const books: Book[] = [
  { id: 1, name: "Literature", writer: "Wade Warren", code: "#0011", subject: "English", klass: "02", date: "22 Octo, 2022", tint: "bg-stat-green" },
  { id: 2, name: "Mathematics", writer: "David Morgan", code: "#0021", subject: "Mathematics", klass: "01", date: "12 Sep, 2023", tint: "bg-stat-purple" },
  { id: 3, name: "English", writer: "Kristin Watson", code: "#0031", subject: "Physics", klass: "03", date: "23 Nov, 2020", tint: "bg-stat-orange" },
  { id: 4, name: "Mathematics", writer: "Savannah Nguyen", code: "#0013", subject: "Mathematics", klass: "04", date: "12 Octo, 2022", tint: "bg-stat-blue" },
  { id: 5, name: "English", writer: "Jacob Jones", code: "#0018", subject: "Physics", klass: "01", date: "22 Octo, 2022", tint: "bg-stat-purple" },
  { id: 6, name: "Mathematics", writer: "Arlene McCoy", code: "#0019", subject: "Literature", klass: "02", date: "23 Sep, 2023", tint: "bg-stat-blue" },
  { id: 7, name: "Mathematics", writer: "Arlene McCoy", code: "#0019", subject: "Literature", klass: "02", date: "23 Sep, 2023", tint: "bg-stat-blue" },
  { id: 8, name: "Mathematics", writer: "Arlene McCoy", code: "#0019", subject: "Literature", klass: "02", date: "23 Sep, 2023", tint: "bg-stat-blue" },
  { id: 9, name: "English", writer: "Jacob Jones", code: "#0018", subject: "Physics", klass: "01", date: "22 Octo, 2022", tint: "bg-stat-orange" },
];

function LibraryPage() {
  const [selected, setSelected] = useState<number[]>([2]);
  const [page, setPage] = useState(3);

  const toggle = (id: number) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const allChecked = selected.length === books.length;

  return (
    <DashboardShell>
      <PageHeader
        title="Library"
        crumbs={[{ label: "Home", to: "/" }, { label: "Library Books" }]}
        action={
          <button className="flex h-12 items-center gap-2 rounded-xl border border-primary bg-card px-5 text-[15px] font-semibold text-primary transition-colors hover:bg-primary-soft">
            <Plus className="size-[18px]" strokeWidth={2.4} />
            Add Library
          </button>
        }
      />

      <section className="rounded-2xl bg-card p-4 shadow-card sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-foreground">All Books</h2>
          <div className="flex flex-wrap items-center gap-3">
            <TableSearch />
            <DateRangeButton />
          </div>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="bg-primary-soft/60 text-[15px] text-secondary-foreground">
                <th className="w-14 rounded-l-xl py-4 pl-5">
                  <CheckboxCell
                    checked={allChecked}
                    onChange={() => setSelected(allChecked ? [] : books.map((b) => b.id))}
                    label="Select all books"
                  />
                </th>
                <th className="py-4 font-medium">Book Name</th>
                <th className="py-4 font-medium">Writer</th>
                <th className="py-4 font-medium">Id</th>
                <th className="py-4 font-medium">Subject</th>
                <th className="py-4 font-medium">Class</th>
                <th className="py-4 font-medium">Publish Date</th>
                <th className="rounded-r-xl py-4 pr-5 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => {
                const isSelected = selected.includes(book.id);
                return (
                  <tr
                    key={book.id}
                    className={cn(
                      "border-b border-border/70 text-[15px] transition-colors last:border-0",
                      isSelected ? "bg-card shadow-card" : "hover:bg-muted/60",
                    )}
                  >
                    <td className="py-4 pl-5">
                      <CheckboxCell
                        checked={isSelected}
                        onChange={() => toggle(book.id)}
                        label={`Select ${book.name}`}
                      />
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "grid size-10 shrink-0 place-items-center rounded-full text-[11px] font-bold text-foreground/70",
                            book.tint,
                          )}
                        >
                          {book.name.slice(0, 2).toUpperCase()}
                        </span>
                        <span className="font-medium text-foreground">{book.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-secondary-foreground">{book.writer}</td>
                    <td className="py-3 text-secondary-foreground">{book.code}</td>
                    <td className="py-3 text-secondary-foreground">{book.subject}</td>
                    <td className="py-3 text-secondary-foreground">{book.klass}</td>
                    <td className="py-3 text-secondary-foreground">{book.date}</td>
                    <td className="py-3 pr-5">
                      <RowActions name={book.name} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <TablePagination page={page} onPageChange={setPage} />
    </DashboardShell>
  );
}
