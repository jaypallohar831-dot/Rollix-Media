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
    <section className="rounded-3xl border border-stone-200 bg-white p-8 space-y-6 shadow-xs">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg text-stone-900 flex items-center gap-2">
          <Users className="h-4 w-4 text-cinematic-orange" />
          Team & Crew
        </h2>
        <button
          type="button"
          onClick={addMember}
          className="flex items-center gap-1.5 rounded-lg bg-stone-100 hover:bg-cinematic-orange hover:text-white border border-stone-300 hover:border-cinematic-orange px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-stone-700 transition-all"
        >
          <Plus className="h-3 w-3" />
          Add Member
        </button>
      </div>

      <div className="space-y-4">
        {crew.length === 0 ? (
          <div className="text-center py-6 text-sm text-stone-500 italic border border-dashed border-stone-200 rounded-xl bg-stone-50">
            No team members added yet.
          </div>
        ) : (
          crew.map((member, idx) => (
            <div key={idx} className="flex items-center gap-4 bg-stone-50 border border-stone-200 p-4 rounded-xl">
              <div className="flex-1 space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-600 ml-1">Role (e.g. Director)</label>
                <input
                  type="text"
                  value={member.role}
                  onChange={(e) => updateMember(idx, 'role', e.target.value)}
                  placeholder="e.g. UI Designer"
                  className="w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 focus:border-cinematic-orange focus:outline-none transition-all shadow-xs"
                />
              </div>
              <div className="flex-1 space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-600 ml-1">Name</label>
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => updateMember(idx, 'name', e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 focus:border-cinematic-orange focus:outline-none transition-all shadow-xs"
                />
              </div>
              <button
                type="button"
                onClick={() => removeMember(idx)}
                className="mt-5 p-2.5 rounded-lg text-stone-400 hover:bg-red-50 hover:text-red-600 transition-all"
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
