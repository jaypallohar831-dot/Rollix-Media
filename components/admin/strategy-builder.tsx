'use client';

import { Lightbulb, Plus, Trash2 } from 'lucide-react';

export type ProjectStrategy = {
  objective: string;
  approach: string[];
  tools: string[];
  results: string[];
};

interface StrategyBuilderProps {
  strategy: ProjectStrategy;
  onChange: (strategy: ProjectStrategy) => void;
}

export function StrategyBuilder({ strategy, onChange }: StrategyBuilderProps) {
  const updateField = (field: keyof ProjectStrategy, value: any) => {
    onChange({ ...strategy, [field]: value });
  };

  const handleArrayChange = (field: 'approach' | 'tools' | 'results', index: number, value: string) => {
    const newArr = [...strategy[field]];
    newArr[index] = value;
    updateField(field, newArr);
  };

  const addArrayItem = (field: 'approach' | 'tools' | 'results') => {
    updateField(field, [...strategy[field], '']);
  };

  const removeArrayItem = (field: 'approach' | 'tools' | 'results', index: number) => {
    updateField(field, strategy[field].filter((_, i) => i !== index));
  };

  const renderArrayField = (title: string, field: 'approach' | 'tools' | 'results', placeholder: string) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-bold uppercase tracking-widest text-stone-600 ml-1">{title}</label>
        <button
          type="button"
          onClick={() => addArrayItem(field)}
          className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-cinematic-orange hover:text-stone-900 transition-colors"
        >
          <Plus className="h-3 w-3" /> Add {title}
        </button>
      </div>
      <div className="space-y-2">
        {strategy[field].length === 0 ? (
          <div className="text-center py-4 text-xs text-stone-500 italic border border-dashed border-stone-200 rounded-xl bg-stone-50">
            No {title.toLowerCase()} added yet.
          </div>
        ) : (
          strategy[field].map((item, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayChange(field, idx, e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 focus:border-cinematic-orange focus:outline-none transition-all shadow-xs"
              />
              <button
                type="button"
                onClick={() => removeArrayItem(field, idx)}
                className="shrink-0 p-2.5 rounded-lg text-stone-400 hover:bg-red-50 hover:text-red-600 transition-all"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <section className="rounded-3xl border border-stone-200 bg-white p-8 space-y-6 shadow-xs">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg text-stone-900 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-cinematic-orange" />
          Behind the Strategy
        </h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-stone-600 ml-1">Objective / Problem Statement</label>
          <textarea
            rows={3}
            value={strategy.objective}
            onChange={(e) => updateField('objective', e.target.value)}
            className="w-full rounded-xl border border-stone-300 bg-white px-5 py-4 text-sm text-stone-900 focus:border-cinematic-orange focus:outline-none transition-all leading-relaxed shadow-xs"
            placeholder="What was the main goal or challenge of this project?"
          />
        </div>

        {renderArrayField('Approach & Execution', 'approach', 'e.g. Designed wireframes and user flow...')}
        {renderArrayField('Tools & Technologies', 'tools', 'e.g. Next.js, Figma, Premiere Pro')}
        {renderArrayField('Impact & Results', 'results', 'e.g. Increased conversion rate by 25%')}
      </div>
    </section>
  );
}
