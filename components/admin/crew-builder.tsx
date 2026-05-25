'use client';

import { Plus, Trash2, Users } from 'lucide-react';

export type CrewMember = { role: string; name: string };

interface CrewBuilderProps {
  crew: CrewMember[];
  onChange: (crew: CrewMember[]) => void;
}

export function CrewBuilder({ crew, onChange }: CrewBuilderProps) {
  const addMember = () => {
    onChange([...crew, { role: '', name: '' }]);
  };

  const removeMember = (index: number) => {
    onChange(crew.filter((_, i) => i !== index));
  };

  const updateMember = (index: number, field: keyof CrewMember, value: string) => {
    const newCrew = [...crew];
    newCrew[index][field] = value;
    onChange(newCrew);
  };

  return (
    <section className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg text-white flex items-center gap-2">
          <Users className="h-4 w-4 text-cinematic-orange" />
          Team & Crew
        </h2>
        <button
          type="button"
          onClick={addMember}
          className="flex items-center gap-1.5 rounded-lg bg-white/[0.05] hover:bg-cinematic-orange/20 hover:text-cinematic-orange border border-white/[0.1] hover:border-cinematic-orange/30 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground transition-all"
        >
          <Plus className="h-3 w-3" />
          Add Member
        </button>
      </div>

      <div className="space-y-4">
        {crew.length === 0 ? (
          <div className="text-center py-6 text-sm text-muted-foreground/50 italic border border-dashed border-white/[0.05] rounded-xl">
            No team members added yet.
          </div>
        ) : (
          crew.map((member, idx) => (
            <div key={idx} className="flex items-center gap-4 bg-white/[0.01] border border-white/[0.04] p-3 rounded-xl">
              <div className="flex-1 space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">Role (e.g. Director)</label>
                <input
                  type="text"
                  value={member.role}
                  onChange={(e) => updateMember(idx, 'role', e.target.value)}
                  placeholder="e.g. UI Designer"
                  className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white focus:border-cinematic-orange/40 focus:outline-none transition-all"
                />
              </div>
              <div className="flex-1 space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">Name</label>
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => updateMember(idx, 'name', e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white focus:border-cinematic-orange/40 focus:outline-none transition-all"
                />
              </div>
              <button
                type="button"
                onClick={() => removeMember(idx)}
                className="mt-5 p-2.5 rounded-lg text-muted-foreground/50 hover:bg-red-500/10 hover:text-red-400 transition-all"
                title="Remove Member"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
