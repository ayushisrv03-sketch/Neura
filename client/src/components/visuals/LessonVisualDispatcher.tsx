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
        case 12:
          return <SurfaceAreaVisual />;
        case 13:
          return <GeometricProblemVisual />;
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
        default:
          return <PhotosynthesisVisual />;
      }

    case "States of matter":
      switch (lessonIndex) {
        case 0:
          return <AtomMatterVisual />;
        case 1:
          return <SolidPropertiesVisual />;
        case 2:
          return <LiquidPropertiesVisual />;
        case 3:
          return <GasPropertiesVisual />;
        case 4:
          return <StatesOfMatterVisual />; // Protected existing visual
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
          return <SeedGerminationVisual />;
        case 6:
          return <FruitOvaryVisual />;
        case 7:
          return <XylemPhloemVisual />;
        case 8:
          return <PlantAdaptationsVisual />;
        case 9:
          return <ErosionSoilVisual />;
        case 10:
          return <GrowthCycleVisual />;
        default:
          return <PlantPartsVisual />;
      }

    default:
      return null;
  }
}
