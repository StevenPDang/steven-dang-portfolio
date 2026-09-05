import { useState } from 'react'

type Field = { name: string; type: string; pk?: boolean; fk?: boolean }
type TableDef = { id: string; title: string; x: number; y: number; fields: Field[] }
type EnumDef = { id: string; title: string; x: number; y: number; values: string[] }
type EdgeDef = { from: string; to: string }

const ROW_H = 20
const HEADER_H = 30
const TABLE_W = 210
const ENUM_ROW_H = 16
const ENUM_HEADER_H = 26
const ENUM_W = 210

// Mirrors this site's own schema (see the DBML in project notes) — steven <- education /
// experience / project, experience <-> skill via experience_skill, skill -> skill_category.
const tables: TableDef[] = [
  {
    id: 'steven',
    title: 'steven',
    x: 40,
    y: 340,
    fields: [
      { name: 'id', type: 'int', pk: true },
      { name: 'name', type: 'varchar' },
      { name: 'email', type: 'varchar' },
      { name: 'phone', type: 'varchar' },
      { name: 'linkedin_url', type: 'varchar' },
      { name: 'github_url', type: 'varchar' },
    ],
  },
  {
    id: 'education',
    title: 'education',
    x: 340,
    y: 40,
    fields: [
      { name: 'id', type: 'int', pk: true },
      { name: 'steven_id', type: 'int', fk: true },
      { name: 'institution', type: 'varchar' },
      { name: 'degree', type: 'varchar' },
      { name: 'field_of_study', type: 'varchar' },
      { name: 'gpa', type: 'decimal' },
      { name: 'location', type: 'varchar' },
      { name: 'graduation_date', type: 'date' },
    ],
  },
  {
    id: 'experience',
    title: 'experience',
    x: 340,
    y: 340,
    fields: [
      { name: 'id', type: 'int', pk: true },
      { name: 'steven_id', type: 'int', fk: true },
      { name: 'organization', type: 'varchar' },
      { name: 'title', type: 'varchar' },
      { name: 'location', type: 'varchar' },
      { name: 'start_date', type: 'date' },
      { name: 'end_date', type: 'date' },
      { name: 'description', type: 'text' },
    ],
  },
  {
    id: 'project',
    title: 'project',
    x: 340,
    y: 680,
    fields: [
      { name: 'id', type: 'int', pk: true },
      { name: 'steven_id', type: 'int', fk: true },
      { name: 'name', type: 'varchar' },
      { name: 'description', type: 'text' },
    ],
  },
  {
    id: 'experience_skill',
    title: 'experience_skill',
    x: 650,
    y: 390,
    fields: [
      { name: 'experience_id', type: 'int', pk: true, fk: true },
      { name: 'skill_id', type: 'int', pk: true, fk: true },
    ],
  },
  {
    id: 'skill',
    title: 'skill',
    x: 650,
    y: 540,
    fields: [
      { name: 'id', type: 'int', pk: true },
      { name: 'name', type: 'varchar' },
      { name: 'category', type: 'skill_category' },
    ],
  },
]

const skillEnum: EnumDef = {
  id: 'skill_category',
  title: 'skill_category',
  x: 650,
  y: 670,
  values: ['language', 'framework', 'library', 'database', 'system', 'tool'],
}

const edges: EdgeDef[] = [
  { from: 'education', to: 'steven' },
  { from: 'experience', to: 'steven' },
  { from: 'project', to: 'steven' },
  { from: 'experience_skill', to: 'experience' },
  { from: 'experience_skill', to: 'skill' },
  { from: 'skill', to: 'skill_category' },
]

function tableHeight(t: TableDef) {
  return HEADER_H + t.fields.length * ROW_H
}

function enumHeight(e: EnumDef) {
  return ENUM_HEADER_H + e.values.length * ENUM_ROW_H
}

// Hand-picked per edge (fixed layout, six edges — not worth a generic anchor-routing algorithm).
function edgeAnchors(from: string, to: string): { x1: number; y1: number; x2: number; y2: number } {
  const steven = tables.find((t) => t.id === 'steven')!
  const education = tables.find((t) => t.id === 'education')!
  const experience = tables.find((t) => t.id === 'experience')!
  const project = tables.find((t) => t.id === 'project')!
  const expSkill = tables.find((t) => t.id === 'experience_skill')!
  const skill = tables.find((t) => t.id === 'skill')!

  const stevenRight = { x: steven.x + TABLE_W, y: steven.y + tableHeight(steven) / 2 }

  if (from === 'education' && to === 'steven') {
    return { x1: education.x, y1: education.y + tableHeight(education) / 2, x2: stevenRight.x, y2: stevenRight.y }
  }
  if (from === 'experience' && to === 'steven') {
    return { x1: experience.x, y1: experience.y + tableHeight(experience) / 2, x2: stevenRight.x, y2: stevenRight.y }
  }
  if (from === 'project' && to === 'steven') {
    return { x1: project.x, y1: project.y + tableHeight(project) / 2, x2: stevenRight.x, y2: stevenRight.y }
  }
  if (from === 'experience_skill' && to === 'experience') {
    const y = expSkill.y + tableHeight(expSkill) / 2
    return { x1: expSkill.x, y1: y, x2: experience.x + TABLE_W, y2: experience.y + tableHeight(experience) / 2 }
  }
  if (from === 'experience_skill' && to === 'skill') {
    const x = expSkill.x + TABLE_W / 2
    return { x1: x, y1: expSkill.y + tableHeight(expSkill), x2: x, y2: skill.y }
  }
  if (from === 'skill' && to === 'skill_category') {
    const x = skill.x + TABLE_W / 2
    return { x1: x, y1: skill.y + tableHeight(skill), x2: x, y2: skillEnum.y }
  }
  return { x1: 0, y1: 0, x2: 0, y2: 0 }
}

// Orthogonal elbow connector (horizontal / vertical / horizontal) instead of a curved arc —
// degenerates cleanly to a plain straight line when the anchors already share an x or y.
function edgePath(x1: number, y1: number, x2: number, y2: number) {
  const midX = (x1 + x2) / 2
  return `M ${x1} ${y1} H ${midX} V ${y2} H ${x2}`
}

const VIEW_W = 920
const VIEW_H = 850

/** Interactive ER diagram of this site's own schema — hover a table to spotlight its relationships. */
export default function RelationalDiagram() {
  const [hovered, setHovered] = useState<string | null>(null)

  const connected = new Set<string>()
  if (hovered) {
    connected.add(hovered)
    for (const edge of edges) {
      if (edge.from === hovered) connected.add(edge.to)
      if (edge.to === hovered) connected.add(edge.from)
    }
  }

  const tableOpacity = (id: string) => {
    if (!hovered) return 0.55
    if (id === hovered) return 1
    return connected.has(id) ? 0.75 : 0.22
  }

  const edgeOpacity = (edge: EdgeDef) => {
    if (!hovered) return 0.35
    return edge.from === hovered || edge.to === hovered ? 0.9 : 0.1
  }

  return (
    <div className="absolute inset-y-0 right-0 hidden w-[48%] max-w-[880px] sm:block">
      <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} preserveAspectRatio="xMidYMid meet" className="h-full w-full">
        <defs>
          <radialGradient id="diagram-fade" cx="45%" cy="48%" r="72%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="65%" stopColor="white" stopOpacity="0.6" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="diagram-mask">
            <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="url(#diagram-fade)" />
          </mask>
        </defs>

        <g mask="url(#diagram-mask)">
          {edges.map((edge) => {
            const { x1, y1, x2, y2 } = edgeAnchors(edge.from, edge.to)
            return (
              <path
                key={`${edge.from}-${edge.to}`}
                d={edgePath(x1, y1, x2, y2)}
                fill="none"
                stroke="var(--color-forest)"
                strokeWidth={1.4}
                style={{ opacity: edgeOpacity(edge), transition: 'opacity 300ms ease-out' }}
              />
            )
          })}

          {tables.map((table) => {
            const height = tableHeight(table)
            const isHub = table.id === 'steven'
            return (
              <g
                key={table.id}
                onMouseEnter={() => setHovered(table.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ opacity: tableOpacity(table.id), transition: 'opacity 300ms ease-out', cursor: 'default' }}
              >
                <rect
                  x={table.x}
                  y={table.y}
                  width={TABLE_W}
                  height={height}
                  rx={8}
                  fill="var(--color-cream)"
                  stroke="var(--color-forest)"
                  strokeWidth={1.3}
                />
                <rect
                  x={table.x}
                  y={table.y}
                  width={TABLE_W}
                  height={HEADER_H}
                  rx={8}
                  fill={isHub ? 'var(--color-forest)' : 'var(--color-sand-dim)'}
                />
                <rect x={table.x} y={table.y + HEADER_H - 8} width={TABLE_W} height={8} fill={isHub ? 'var(--color-forest)' : 'var(--color-sand-dim)'} />
                <text
                  x={table.x + 14}
                  y={table.y + HEADER_H / 2 + 4}
                  fontSize={13}
                  fontWeight={600}
                  fill={isHub ? 'var(--color-cream)' : 'var(--color-forest)'}
                >
                  {table.title}
                </text>
                {table.fields.map((field, i) => {
                  const rowY = table.y + HEADER_H + i * ROW_H
                  return (
                    <g key={field.name}>
                      <circle
                        cx={table.x + 12}
                        cy={rowY + ROW_H / 2}
                        r={2.6}
                        fill={field.pk ? 'var(--color-forest)' : 'none'}
                        stroke={field.fk ? 'var(--color-muted)' : 'none'}
                        strokeWidth={field.fk ? 1.2 : 0}
                      />
                      <text x={table.x + 22} y={rowY + ROW_H / 2 + 4} fontSize={11} fill="var(--color-ink)">
                        {field.name}
                      </text>
                      <text
                        x={table.x + TABLE_W - 12}
                        y={rowY + ROW_H / 2 + 4}
                        fontSize={10.5}
                        textAnchor="end"
                        fill="var(--color-muted)"
                      >
                        {field.type}
                      </text>
                    </g>
                  )
                })}
              </g>
            )
          })}

          <g
            onMouseEnter={() => setHovered(skillEnum.id)}
            onMouseLeave={() => setHovered(null)}
            style={{ opacity: tableOpacity(skillEnum.id), transition: 'opacity 300ms ease-out' }}
          >
            <rect
              x={skillEnum.x}
              y={skillEnum.y}
              width={ENUM_W}
              height={enumHeight(skillEnum)}
              rx={8}
              fill="var(--color-cream)"
              stroke="var(--color-muted)"
              strokeWidth={1.2}
              strokeDasharray="3 3"
            />
            <text
              x={skillEnum.x + 14}
              y={skillEnum.y + ENUM_HEADER_H / 2 + 4}
              fontSize={12}
              fontWeight={600}
              fontStyle="italic"
              fill="var(--color-muted)"
            >
              enum: {skillEnum.title}
            </text>
            {skillEnum.values.map((value, i) => (
              <text
                key={value}
                x={skillEnum.x + 20}
                y={skillEnum.y + ENUM_HEADER_H + i * ENUM_ROW_H + ENUM_ROW_H / 2 + 3}
                fontSize={10}
                fill="var(--color-ink)"
              >
                {value}
              </text>
            ))}
          </g>
        </g>
      </svg>
    </div>
  )
}
