"use client";

import { useState } from "react";
import { PHASES, PROBLEM_AREAS } from "@/data/roadmap";
import { DocsLayout } from "@/components/common/docs-layout";
import {
  Target,
  CheckCircle2,
  AlertCircle,
  Users,
  Calendar,
  ChevronRight,
  Shield,
  Zap,
} from "lucide-react";

export default function RoadmapPage() {
  const [expandedPhase, setExpandedPhase] = useState<string | null>("phase-1");

  return (
    <DocsLayout>
      {/* Header Section - Blue accent bar */}
      <div className="mb-4 pb-4 border-b-2" style={{ borderColor: '#002252' }}>
        <div className="flex items-center gap-2 mb-2">
          <span
            className="rounded px-2 py-0.5 text-xs font-semibold"
            style={{ backgroundColor: '#EE701E', color: 'white' }}
          >
            90-Day Plan
          </span>
          <span className="text-sm" style={{ color: '#6c757d' }}>
            Day 1–90
          </span>
          <span className="ml-auto text-xs px-2 py-0.5 rounded" style={{ backgroundColor: '#002252', color: 'white' }}>
            6 Phases
          </span>
        </div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: '#002252' }}>
          Development Roadmap
        </h1>
        <p className="text-sm" style={{ color: '#495057' }}>
          Structure, ownership, and discipline — not more features.
        </p>
      </div>

      {/* Guardrails - Orange left border with light orange bg */}
      <div
        className="mb-4 rounded-lg border-l-4 p-3"
        style={{ borderColor: '#EE701E', backgroundColor: 'rgba(238, 112, 30, 0.08)' }}
      >
        <p className="text-sm" style={{ color: '#002252' }}>
          <strong style={{ color: '#EE701E' }}>Phase 1 is required before all other phases.</strong> No exceptions.
        </p>
      </div>

      {/* Phases Timeline */}
      <div className="space-y-3">
        {PHASES.map((phase, index) => (
          <PhaseCard
            key={phase.id}
            phase={phase}
            index={index}
            isExpanded={expandedPhase === phase.id}
            onToggle={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
          />
        ))}
      </div>

      {/* Problem Areas Summary */}
      <div className="mt-8 pt-6 border-t-2" style={{ borderColor: '#002252' }}>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: '#002252' }}>
          <Zap className="h-5 w-5" style={{ color: '#EE701E' }} />
          Problem Areas ({PROBLEM_AREAS.length})
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PROBLEM_AREAS.map((area) => (
            <div
              key={area.id}
              className="rounded-lg border p-3 overflow-hidden"
              style={{
                borderColor: area.priority === 'critical' ? '#dc3545' : '#dee2e6',
                backgroundColor: area.priority === 'critical' ? 'rgba(220, 53, 69, 0.05)' : '#f8f9fa',
                borderLeftWidth: area.priority === 'critical' ? '3px' : '1px',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="rounded px-1.5 py-0.5 text-xs font-semibold"
                  style={{
                    backgroundColor: area.priority === 'critical' ? '#dc3545' : '#EE701E',
                    color: 'white',
                  }}
                >
                  {area.priority}
                </span>
                <span className="text-xs" style={{ color: '#6c757d' }}>
                  {area.phase}
                </span>
              </div>
              <h4 className="font-semibold text-sm mb-1.5" style={{ color: '#002252' }}>
                {area.title}
              </h4>
              <p className="text-xs leading-relaxed" style={{ color: '#495057' }}>
                {area.summary}
              </p>
              <div className="mt-2 text-xs flex items-center gap-1" style={{ color: '#EE701E' }}>
                <span className="font-semibold">{area.keyActions.length}</span>
                <span style={{ color: '#6c757d' }}>key actions</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DocsLayout>
  );
}

interface PhaseCardProps {
  phase: (typeof PHASES)[number];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

function PhaseCard({ phase, index, isExpanded, onToggle }: PhaseCardProps) {
  const isCurrent = phase.status === "current";

  return (
    <div
      className="rounded-lg border overflow-hidden"
      style={{
        borderColor: isCurrent ? '#EE701E' : '#dee2e6',
        backgroundColor: 'white',
        borderLeftWidth: isCurrent ? '4px' : '1px',
      }}
    >
      {/* Phase Header - Always Visible */}
      <button
        onClick={onToggle}
        className="w-full p-3 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
      >
        {/* Phase Number */}
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-bold text-sm"
          style={{
            backgroundColor: isCurrent ? '#EE701E' : '#002252',
            color: 'white',
          }}
        >
          {index + 1}
        </div>

        {/* Phase Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-sm" style={{ color: '#002252' }}>
              {phase.label}: {phase.focus}
            </h3>
            {isCurrent && (
              <span
                className="rounded px-1.5 py-0.5 text-xs font-medium"
                style={{ backgroundColor: '#EE701E', color: 'white' }}
              >
                In Progress
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs mt-0.5" style={{ color: '#6c757d' }}>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {phase.days}
            </span>
            <span>•</span>
            <span>{phase.ownerTeam}</span>
          </div>
        </div>

        {/* Expand Icon */}
        <ChevronRight
          className={`h-5 w-5 shrink-0 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
          style={{ color: '#6c757d' }}
        />
      </button>

      {/* Expanded Content - Full Info (Business + Engineering) */}
      {isExpanded && (
        <div className="border-t" style={{ borderColor: '#dee2e6', backgroundColor: 'rgba(0, 34, 82, 0.03)' }}>
          {/* Top Row: Business Objective & Why */}
          <div className="grid gap-3 lg:grid-cols-2 p-3 border-b" style={{ borderColor: 'rgba(0, 34, 82, 0.1)' }}>
            {/* Business Objective - Orange tinted */}
            <div className="rounded-lg p-2" style={{ backgroundColor: 'rgba(238, 112, 30, 0.06)' }}>
              <h4 className="text-xs font-semibold mb-1.5 flex items-center gap-1.5 pb-1 border-b" style={{ color: '#EE701E', borderColor: 'rgba(238, 112, 30, 0.2)' }}>
                <Target className="h-3.5 w-3.5" />
                Business Objective
              </h4>
              <p className="text-xs leading-relaxed" style={{ color: '#495057' }}>
                {phase.businessObjective}
              </p>
            </div>
            {/* Why It Exists - Blue tinted */}
            <div className="rounded-lg p-2" style={{ backgroundColor: 'rgba(0, 34, 82, 0.06)' }}>
              <h4 className="text-xs font-semibold mb-1.5 flex items-center gap-1.5 pb-1 border-b" style={{ color: '#002252', borderColor: 'rgba(0, 34, 82, 0.2)' }}>
                <span className="h-3.5 w-3.5 flex items-center justify-center text-xs">?</span>
                Why This Phase Exists
              </h4>
              <p className="text-xs leading-relaxed" style={{ color: '#495057' }}>
                {phase.whyItExists}
              </p>
            </div>
          </div>

          {/* Middle Row: Deliverables & Outcomes */}
          <div className="grid gap-3 lg:grid-cols-2 p-3 border-b" style={{ borderColor: 'rgba(0, 34, 82, 0.1)' }}>
            {/* Deliverables - Orange accents */}
            <div>
              <h4 className="text-xs font-semibold mb-2 flex items-center gap-1.5" style={{ color: '#EE701E' }}>
                <CheckCircle2 className="h-3.5 w-3.5" />
                Deliverables ({phase.deliverables.length})
              </h4>
              <ul className="space-y-1">
                {phase.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs" style={{ color: '#495057' }}>
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-sm" style={{ backgroundColor: '#EE701E' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Key Outcomes - Green/Blue accents */}
            <div>
              <h4 className="text-xs font-semibold mb-2 flex items-center gap-1.5" style={{ color: '#002252' }}>
                <CheckCircle2 className="h-3.5 w-3.5" style={{ color: '#28a745' }} />
                Key Outcomes
              </h4>
              <ul className="space-y-1">
                {phase.keyOutcomes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs" style={{ color: '#495057' }}>
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0" style={{ color: '#28a745' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Row: Engineering Details */}
          <div className="grid gap-3 lg:grid-cols-3 p-3" style={{ backgroundColor: 'rgba(220, 53, 69, 0.03)' }}>
            {/* Risks - Red tinted */}
            <div className="rounded p-2" style={{ backgroundColor: 'rgba(220, 53, 69, 0.06)' }}>
              <h4 className="text-xs font-semibold mb-1.5 flex items-center gap-1.5" style={{ color: '#dc3545' }}>
                <Shield className="h-3.5 w-3.5" />
                Risks
              </h4>
              <ul className="space-y-1">
                {phase.risks.map((risk, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs" style={{ color: '#495057' }}>
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: '#dc3545' }} />
                    {risk}
                  </li>
                ))}
              </ul>
            </div>
            {/* Dependencies - Blue tinted */}
            <div className="rounded p-2" style={{ backgroundColor: 'rgba(0, 34, 82, 0.06)' }}>
              <h4 className="text-xs font-semibold mb-1.5 flex items-center gap-1.5" style={{ color: '#002252' }}>
                <span className="h-3.5 w-3.5 flex items-center justify-center">🔗</span>
                Dependencies
              </h4>
              <p className="text-xs leading-relaxed" style={{ color: '#495057' }}>
                {phase.dependencies.join(', ')}
              </p>
            </div>
            {/* Success Metrics - Green tinted */}
            <div className="rounded p-2" style={{ backgroundColor: 'rgba(40, 167, 69, 0.06)' }}>
              <h4 className="text-xs font-semibold mb-1.5 flex items-center gap-1.5" style={{ color: '#28a745' }}>
                <Target className="h-3.5 w-3.5" />
                Success Metrics
              </h4>
              <ul className="space-y-1">
                {phase.successMetrics.map((metric, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs" style={{ color: '#495057' }}>
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: '#28a745' }} />
                    {metric}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
