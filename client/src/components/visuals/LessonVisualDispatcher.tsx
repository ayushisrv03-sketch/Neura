import React from "react";
// Existing Protected Visuals (Completely Untouched)
import FractionVisual from "./FractionVisual";
import GeometryVisual from "./GeometryVisual";
import LinearEquationVisual from "./LinearEquationVisual";
import PhotosynthesisVisual from "./PhotosynthesisVisual";
import PlantPartsVisual from "./PlantPartsVisual";
import StatesOfMatterVisual from "./StatesOfMatterVisual";

// New Dedicated Lesson Visuals
import {
  FractionNumberLineVisual,
  ComparingFractionsVisual,
  EquivalentFractionsVisual,
  SimplifyingFractionsVisual,
  AddingLikeFractionsVisual,
  SubtractingLikeFractionsVisual,
  MixedNumbersVisual,
  UnlikeFractionsVisual,
  MultiplyingFractionsVisual,
  DividingFractionsVisual,
  FractionWordProblemsVisual,
} from "./FractionLessonVisuals";

import {
  VariablesIntroVisual,
  OneStepAddSubVisual,
  OneStepMultDivVisual,
  VariablesBothSidesVisual,
  SimplifyingEquationsVisual,
  CombiningLikeTermsVisual,
  ParenthesesEquationsVisual,
  EquationWordProblemsVisual,
  MultiStepEquationsVisual,
  FractionsDecimalsEquationsVisual,
  LinearSystemsIntroVisual,
} from "./EquationLessonVisuals";

import {
  AngleBasicsVisual,
  AngleTypesVisual,
  ParallelLinesVisual,
  TriangleClassifierVisual,
  QuadrilateralsVisual,
  PerimeterVisual,
  AreaRectangleTriangleVisual,
  CircumferenceVisual,
  CircleAreaVisual,
  Net3DVisual,
  VolumePrismsVisual,
  SurfaceAreaVisual,
  GeometricProblemVisual,
} from "./GeometryLessonVisuals";

import {
  ChloroplastStructureVisual,
  SunlightEnergyVisual,
  StomataVisual,
  RootXylemVisual,
  ChlorophyllLightVisual,
  ChemicalEquationVisual,
  GlucoseStarchVisual,
  OxygenReleaseVisual,
  LimitingFactorsVisual,
  EcosystemEnergyVisual,
  RespirationCycleVisual,
} from "./PhotosynthesisLessonVisuals";

import {
  AtomMatterVisual,
  SolidPropertiesVisual,
  LiquidPropertiesVisual,
  GasPropertiesVisual,
  MeltingFreezingVisual,
  EvaporationCondensationVisual,
  SublimationVisual,
  KineticEnergyVisual,
  GasPressureVolumeVisual,
  WaterCyclePhaseVisual,
  PlasmaHeatingCurveVisual,
} from "./MatterLessonVisuals";

import {
  RootTypesVisual,
  StemTransportVisual,
  LeafStructureVisual,
  FlowerDissectionVisual,
  SeedGerminationVisual,
  FruitOvaryVisual,
  XylemPhloemVisual,
  PlantAdaptationsVisual,
  ErosionSoilVisual,
  GrowthCycleVisual,
  PollinationVisual,
} from "./PlantLessonVisuals";

interface LessonVisualDispatcherProps {
  topic: string;
  lessonIndex: number;
}

export function LessonVisualDispatcher({ topic, lessonIndex }: LessonVisualDispatcherProps) {
  switch (topic) {
    case "Fractions":
      switch (lessonIndex) {
        case 0:
          return <FractionVisual />;
        case 1:
          return <FractionNumberLineVisual />;
        case 2:
          return <ComparingFractionsVisual />;
        case 3:
          return <EquivalentFractionsVisual />;
        case 4:
          return <SimplifyingFractionsVisual />;
        case 5:
          return <AddingLikeFractionsVisual />;
        case 6:
          return <SubtractingLikeFractionsVisual />;
        case 7:
          return <MixedNumbersVisual />;
        case 8:
          return <UnlikeFractionsVisual />;
        case 9:
          return <MultiplyingFractionsVisual />;
        case 10:
          return <DividingFractionsVisual />;
        case 11:
          return <FractionWordProblemsVisual />;
        default:
          return <FractionVisual />;
      }

    case "Linear equations":
      switch (lessonIndex) {
        case 0:
          return <VariablesIntroVisual />;
        case 1:
          return <OneStepAddSubVisual />;
        case 2:
          return <OneStepMultDivVisual />;
        case 3:
          return <LinearEquationVisual />; // Protected existing visual
        case 4:
          return <VariablesBothSidesVisual />;
        case 5:
          return <SimplifyingEquationsVisual />;
        case 6:
          return <CombiningLikeTermsVisual />;
        case 7:
          return <ParenthesesEquationsVisual />;
        case 8:
          return <EquationWordProblemsVisual />;
        case 9:
          return <MultiStepEquationsVisual />;
        case 10:
          return <FractionsDecimalsEquationsVisual />;
        case 11:
          return <LinearSystemsIntroVisual />;
        default:
          return <LinearEquationVisual />;
      }

    case "Geometry":
      switch (lessonIndex) {
        case 0:
          return <AngleBasicsVisual />;
        case 1:
          return <AngleTypesVisual />;
        case 2:
          return <ParallelLinesVisual />;
        case 3:
          return <GeometryVisual />; // Protected existing visual
        case 4:
          return <TriangleClassifierVisual />;
        case 5:
          return <QuadrilateralsVisual />;
        case 6:
          return <PerimeterVisual />;
        case 7:
          return <AreaRectangleTriangleVisual />;
        case 8:
          return <CircumferenceVisual />;
        case 9:
          return <CircleAreaVisual />;
        case 10:
          return <Net3DVisual />;
        case 11:
          return <VolumePrismsVisual />;
        default:
          return <GeometryVisual />;
      }

    case "Photosynthesis":
      switch (lessonIndex) {
        case 0:
          return <PhotosynthesisVisual />; // Protected existing visual
        case 1:
          return <ChloroplastStructureVisual />;
        case 2:
          return <SunlightEnergyVisual />;
        case 3:
          return <StomataVisual />;
        case 4:
          return <RootXylemVisual />;
        case 5:
          return <ChlorophyllLightVisual />;
        case 6:
          return <ChemicalEquationVisual />;
        case 7:
          return <GlucoseStarchVisual />;
        case 8:
          return <OxygenReleaseVisual />;
        case 9:
          return <LimitingFactorsVisual />;
        case 10:
          return <EcosystemEnergyVisual />;
        case 11:
          return <RespirationCycleVisual />;
        default:
          return <PhotosynthesisVisual />;
      }

    case "States of matter":
      switch (lessonIndex) {
        case 0:
          return <AtomMatterVisual />;
        case 1:
          return <StatesOfMatterVisual />; // Protected existing visual
        case 2:
          return <SolidPropertiesVisual />;
        case 3:
          return <LiquidPropertiesVisual />;
        case 4:
          return <GasPropertiesVisual />;
        case 5:
          return <MeltingFreezingVisual />;
        case 6:
          return <EvaporationCondensationVisual />;
        case 7:
          return <SublimationVisual />;
        case 8:
          return <KineticEnergyVisual />;
        case 9:
          return <GasPressureVolumeVisual />;
        case 10:
          return <PlasmaHeatingCurveVisual />;
        case 11:
          return <WaterCyclePhaseVisual />;
        default:
          return <StatesOfMatterVisual />;
      }

    case "Parts of a plant":
      switch (lessonIndex) {
        case 0:
          return <PlantPartsVisual />; // Protected existing visual
        case 1:
          return <RootTypesVisual />;
        case 2:
          return <StemTransportVisual />;
        case 3:
          return <LeafStructureVisual />;
        case 4:
          return <FlowerDissectionVisual />;
        case 5:
          return <PollinationVisual />;
        case 6:
          return <SeedGerminationVisual />;
        case 7:
          return <FruitOvaryVisual />;
        case 8:
          return <XylemPhloemVisual />;
        case 9:
          return <PlantAdaptationsVisual />;
        case 10:
          return <ErosionSoilVisual />;
        case 11:
          return <GrowthCycleVisual />;
        default:
          return <PlantPartsVisual />;
      }

    default:
      return <CustomTopicVisual topic={topic} lessonIndex={lessonIndex} />;
  }
}

function CustomTopicVisual({ topic, lessonIndex }: { topic: string; lessonIndex: number }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = [
    { title: "Core Principle", desc: `Explore foundational rules and concepts governing ${topic}.` },
    { title: "Mechanism & Process", desc: `Understand cause-and-effect mechanisms operating within ${topic}.` },
    { title: "Real-world Application", desc: `Connect theoretical knowledge of ${topic} to practical real-world scenarios.` },
  ];

  return (
    <div className="rounded-2xl border border-[#dff0f4] bg-[#f8fdff] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e5f1f4] pb-3">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#159ac1]">
            AI Tutor Dynamic Model
          </span>
          <h4 className="text-sm font-bold text-[#173c4b]">
            Interactive Conceptual Exploration for {topic}
          </h4>
        </div>
        <span className="rounded-full bg-[#e8f8fc] px-2.5 py-1 text-[11px] font-bold text-[#159ac1]">
          Lesson {lessonIndex + 1}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {steps.map((step, idx) => (
          <button
            key={step.title}
            onClick={() => setActiveStep(idx)}
            className={`rounded-xl border p-3 text-left transition ${
              activeStep === idx
                ? "border-[#159ac1] bg-white shadow-sm ring-2 ring-[#dff5fa]"
                : "border-[#e3eff2] bg-white/70 hover:border-[#bde3eb] hover:bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-bold uppercase tracking-wider ${activeStep === idx ? "text-[#159ac1]" : "text-[#8aa7b1]"}`}>
                Phase {idx + 1}
              </span>
              {activeStep === idx && (
                <span className="h-2 w-2 rounded-full bg-[#159ac1]" />
              )}
            </div>
            <p className="mt-1 text-xs font-bold text-[#214554]">{step.title}</p>
            <p className="mt-1 text-[11px] text-[#6e8c97] leading-relaxed">{step.desc}</p>
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-xl bg-white p-4 border border-[#e5f1f4] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold text-[#173c4b]">
            Active Phase: {steps[activeStep].title}
          </p>
          <p className="mt-0.5 text-xs text-[#6e8c97]">
            {steps[activeStep].desc} Use your AI Tutor to ask questions about this specific phase.
          </p>
        </div>
        <button
          onClick={() => {
            const container = document.getElementById("ai-tutor-container");
            container?.scrollIntoView({ behavior: "smooth" });
          }}
          className="shrink-0 rounded-xl bg-[#159ac1] px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#1088aa] transition"
        >
          Ask AI Tutor →
        </button>
      </div>
    </div>
  );
}

