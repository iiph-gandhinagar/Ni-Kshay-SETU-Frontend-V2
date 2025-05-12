export type AlgorithmData = {
  urls: {
    masterNode:
      | 'ALGORITHM_DIAGNOSIS_MASTER_NODE'
      | 'ALGORITHM_TREATMENT_MASTER_NODE'
      | 'ALGORITHM_LATENT_TB_INFECTION_MASTER_NODE'
      | 'ALGORITHM_DIFFERENTIAL_CARE_MASTER_NODE'
      | 'ALGORITHM_GUIDANCE_DRUG_REACTION_MASTER_NODE';
    dependentNode: string;
  };
  topName: string;
};

export type AlgorithmNames =
  | 'Diagnosis Algorithm'
  | 'Treatment Algorithm'
  | 'TB Preventive Treatment'
  | 'Differentiated Care'
  | 'Guidance on ADR';

export type GetAlgorithmDataByName = {
  [key in AlgorithmNames]: AlgorithmData;
};
