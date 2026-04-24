import { createFileRoute } from "@tanstack/react-router"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Skeleton } from "@/components/ui/skeleton"
import {
  SectionHeader,
  PillBadge,
  KbdKey,
  MetricPair,
  EmptyState,
  FilterBar,
} from "@/components/shared"

export const Route = createFileRoute("/dev/kitchen-sink")({
  component: KitchenSinkPage,
})

function KitchenSinkPage() {
  if (!import.meta.env.DEV) return null

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="font-display mb-2 text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[0.88] tracking-[-0.045em]">
          Kitchen Sink
        </h1>
        <p className="mb-16 text-[15px] font-light text-muted-foreground">
          Every component, token, and pattern in one place.
        </p>

        {/* 1. Palette */}
        <Section title="Palette">
          <div className="flex flex-wrap gap-4">
            {[
              "background",
              "foreground",
              "card",
              "muted",
              "muted-foreground",
              "primary",
              "primary-foreground",
              "secondary",
              "secondary-foreground",
              "accent",
              "destructive",
              "success",
              "warning",
              "border",
              "ring",
            ].map((token) => (
              <div key={token} className="flex flex-col items-center gap-2">
                <div
                  className="size-16 rounded-[14px] border border-foreground/9"
                  style={{ backgroundColor: `var(--${token})` }}
                  aria-label={`--${token}`}
                />
                <span className="text-[10px] text-muted-foreground">
                  {token}
                </span>
              </div>
            ))}
          </div>
        </Section>

        <Separator className="my-10" />

        {/* 2. Typography */}
        <Section title="Typography">
          <div className="flex flex-col gap-6">
            <div>
              <span className="mb-1 block text-[10px] text-muted-foreground">
                Display / Syne 800 / clamp 72px / ls -0.045em / lh 0.88
              </span>
              <span className="font-display text-[clamp(2rem,5vw,4.5rem)] font-extrabold leading-[0.88] tracking-[-0.045em]">
                Find your shortcut
              </span>
            </div>
            <div>
              <span className="mb-1 block text-[10px] text-muted-foreground">
                Heading / Inter 800 / 30px
              </span>
              <span className="text-[30px] font-extrabold leading-none">
                +22% conversion
              </span>
            </div>
            <div>
              <span className="mb-1 block text-[10px] text-muted-foreground">
                Body / Inter 300 / 15px / lh 1.65
              </span>
              <span className="text-[15px] font-light leading-[1.65]">
                Browse, search, and organize shortcuts across tools and
                applications.
              </span>
            </div>
            <div>
              <span className="mb-1 block text-[10px] text-muted-foreground">
                UI / Inter 600 / 11px / ls 0.08em / uppercase
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em]">
                Add shortcut
              </span>
            </div>
            <div>
              <span className="mb-1 block text-[10px] text-muted-foreground">
                Micro / ui-monospace / 10px / kbd context
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                ⌘K · Ctrl+Shift+P
              </span>
            </div>
          </div>
        </Section>

        <Separator className="my-10" />

        {/* 3. Buttons */}
        <Section title="Buttons">
          <div className="flex flex-wrap gap-3">
            <Button variant="default">Default</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Delete shortcut</Button>
            <Button variant="default" size="sm">
              Small
            </Button>
            <Button variant="default" size="lg">
              Large
            </Button>
            <Button variant="default" disabled>
              Disabled
            </Button>
          </div>
        </Section>

        <Separator className="my-10" />

        {/* 4. Badges / Pills */}
        <Section title="Badges / Pills">
          <div className="flex flex-wrap gap-3">
            <Badge variant="default">Default badge</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <PillBadge variant="available">Available for work</PillBadge>
            <PillBadge variant="wip">Work in progress</PillBadge>
            <PillBadge variant="default">Guest</PillBadge>
          </div>
        </Section>

        <Separator className="my-10" />

        {/* 5. Inputs */}
        <Section title="Inputs">
          <div className="flex flex-col gap-4 max-w-sm">
            <div className="flex flex-col gap-2">
              <Label htmlFor="input-default">Default</Label>
              <Input id="input-default" placeholder="Search shortcuts..." />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="input-disabled">Disabled</Label>
              <Input id="input-disabled" placeholder="Disabled" disabled />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="input-invalid">Invalid</Label>
              <Input
                id="input-invalid"
                placeholder="Invalid value"
                aria-invalid="true"
              />
            </div>
          </div>
        </Section>

        <Separator className="my-10" />

        {/* 6. KbdKey */}
        <Section title="KbdKey">
          <div className="flex flex-wrap gap-2">
            {["⌘", "K", "Shift", "⌃", "⌥", "⌫", "↵"].map((key) => (
              <KbdKey key={key}>{key}</KbdKey>
            ))}
          </div>
        </Section>

        <Separator className="my-10" />

        {/* 7. MetricPair */}
        <Section title="MetricPair">
          <div className="flex flex-wrap gap-10">
            <MetricPair value="+22%" label="Trial-to-paid conversion" />
            <MetricPair value="2×" label="Referral volume doubled" />
            <MetricPair value="4s" label="Toast undo duration" />
          </div>
        </Section>

        <Separator className="my-10" />

        {/* 8. EmptyState */}
        <Section title="EmptyState">
          <div className="rounded-[14px] border border-foreground/9">
            <EmptyState
              heading="Add your first shortcut to get started"
              cta={{ label: "Add shortcut", onClick: () => {} }}
            />
          </div>
        </Section>

        <Separator className="my-10" />

        {/* 9. FilterBar */}
        <Section title="FilterBar">
          <FilterBar
            searchPlaceholder="Search shortcuts..."
            tags={[
              { id: "all", label: "All", active: true },
              { id: "macos", label: "macOS" },
              { id: "vscode", label: "VS Code" },
              { id: "figma", label: "Figma" },
              { id: "browser", label: "Browser" },
            ]}
          />
        </Section>

        <Separator className="my-10" />

        {/* 10. Dialog */}
        <Section title="Dialog">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Open dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add shortcut</DialogTitle>
                <DialogDescription>
                  Save a new keyboard shortcut to your vault.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-3 py-2">
                <Input placeholder="Shortcut name" />
                <Input placeholder="Keys (e.g. ⌘K)" />
              </div>
              <DialogFooter showCloseButton>
                <Button>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Section>

        <Separator className="my-10" />

        {/* 11. Accordion */}
        <Section title="Accordion">
          <Accordion type="single" collapsible className="max-w-sm">
            <AccordionItem value="item-1">
              <AccordionTrigger>What's a keyboard shortcut?</AccordionTrigger>
              <AccordionContent>
                A combination of keys that triggers a command in an application
                — faster than reaching for the mouse.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How do I add shortcuts?</AccordionTrigger>
              <AccordionContent>
                Use the "Add shortcut" button. Give it a name, keys, and an
                optional tag. It's saved to your vault instantly.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Section>

        <Separator className="my-10" />

        {/* 12. Skeleton */}
        <Section title="Skeleton">
          <div className="flex flex-col gap-3 max-w-sm">
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-full" />
              <div className="flex flex-col gap-2 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </Section>

        <Separator className="my-10" />

        {/* 13. SectionHeader */}
        <Section title="SectionHeader">
          <SectionHeader
            label="Featured shortcuts"
            title="Find your shortcut"
            action={<Button variant="outline">View all</Button>}
          />
        </Section>

        <Separator className="my-10" />

        {/* 14. Cards */}
        <Section title="Cards">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Command palette</CardTitle>
                <CardDescription>Open the command palette.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <KbdKey>⌘</KbdKey>
                  <KbdKey>K</KbdKey>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Quick save</CardTitle>
                <CardDescription>Save the current document.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <KbdKey>⌘</KbdKey>
                  <KbdKey>S</KbdKey>
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>

        <Separator className="my-10" />

        {/* 15. Motion — duration reference */}
        <Section title="Motion">
          <div className="flex flex-col gap-4">
            <p className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
              Duration values (identity.md §Motion)
            </p>
            <div className="flex flex-wrap gap-4">
              {[
                { label: "fast", value: "200ms ease", desc: "hover, focus ring" },
                {
                  label: "base",
                  value: "400ms cubic-bezier(0.25,0.46,0.45,0.94)",
                  desc: "border, bg fill",
                },
                {
                  label: "slow",
                  value: "900ms cubic-bezier(0.25,0.46,0.45,0.94)",
                  desc: "panel open/close",
                },
                {
                  label: "nav-morph",
                  value: "450ms cubic-bezier(0.4,0,0.2,1)",
                  desc: "topbar → pill",
                },
              ].map(({ label, value, desc }) => (
                <div
                  key={label}
                  className="group flex flex-col gap-1 rounded-[14px] border border-foreground/9 px-[44px] py-[40px] transition-[border-color] duration-[400ms] hover:border-foreground/38"
                  style={{
                    transitionTimingFunction: "cubic-bezier(0.25,0.46,0.45,0.94)",
                  }}
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    {label}
                  </span>
                  <span className="font-mono text-[10px] text-foreground">
                    {value}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {desc}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground">
              reduced-motion: all durations → 0ms (see @media in index.css)
            </p>
          </div>
        </Section>
      </div>
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-0" aria-labelledby={`section-${title.toLowerCase().replace(/\s+/g, "-")}`}>
      <h2
        id={`section-${title.toLowerCase().replace(/\s+/g, "-")}`}
        className="font-display mb-6 text-[24px] font-extrabold leading-[0.88] tracking-[-0.045em] text-foreground"
      >
        {title}
      </h2>
      {children}
    </section>
  )
}
