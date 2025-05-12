export interface UserScreeningPayload {
  userId: string;
  age: number;
  height: number;
  weight: number;
  symptomSelected: string[];
}

export interface UserScreeningApiResponse {
  BMI: string;
  treatmentId: number;
  heightInMeter: number;
  currentWeight: number;
  heightCmsToMeterSquare: number;
  desirableWeight: number;
  minimumAcceptableWeight: number;
  desirableWeightGain: number;
  minimumWeightGainRequired: number;
  desirableDailyCaloricIntake: number;
  desirableDailyProteinIntake: number;
  userBmi: number;
  isTb: boolean;
  detectedTb: string;
  nutritionTitle: string;
  tbId: number;
}
